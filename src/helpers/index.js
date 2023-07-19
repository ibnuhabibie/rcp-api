import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Models } from '~/models';
import { generateDateToken } from './utils';

export const successRes = (res, data, message, req) => {
  let meta = {
    status: 200,
  };

  meta.message = message;
  let output = { meta };

  if (data) output.data = data;

  if (data && 'count' in data) {
    let limit = parseInt(req.query.limit) || 1;
    let offset = parseInt(req.query.offset) || 0;
    output.meta = {
      offset: offset,
      limit: limit,
      rowCount: data.count,
      pageCount: limit > data.count ? 1 : Math.ceil(data.count / limit),
    };
    output.data = data.rows;
  }

  return res.json(output);
};

class ExtendableError extends Error {
  constructor(message, status, extra) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    if (extra) {
      Object.keys(extra).forEach((key) => {
        this[key] = extra[key];
      });
    }

    Error.captureStackTrace(this, this.constructor.name);
  }
}

export class APIError extends ExtendableError {
  constructor(message, status = 500, extra = null) {
    super(message, status, extra);
  }
}

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    throw new APIError('Validation errors', 422, { issues: errors.array() });
  };
};

export const generateToken = (data, expiresIn = '90d') => {
  const options = {
    expiresIn,
  };
  return jwt.sign(data, process.env.JWT_SECRET_KEY, options);
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    throw new APIError('Token failed to verify', 401);
  }
};

export const capitalizeFirstChar = (str) =>
  str.charAt(0).toUpperCase() + str.substring(1);

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  req.user = null;

  if (!authorization) throw new APIError('Unauthorized', 401);

  const isBearerToken = authorization.startsWith('Bearer ');
  if (!isBearerToken) throw new APIError('Unauthorized', 401);

  const token = authorization.slice(7, authorization.length);
  let dateToken = generateDateToken();
  console.log(dateToken, token);
  if (token == dateToken) {
    req.user_type = 'guest';
    return next();
  }

  const tokenData = await verifyToken(token);

  if (tokenData.type == 'customer') {
    var user = await Models.Customer.findByPk(tokenData.id);
  } else {
    var user = await Models.Admin.scope([
      {
        method: ['withRolePermission', Models],
      },
      {
        method: ['withOutlet', Models],
      },
    ]).findByPk(tokenData.id);
  }

  req.user_type = tokenData.type;

  if (!user) throw new APIError('Invalid Token.', 403);

  if (!user.role && user.type == 'admin')
    throw new APIError('Unauthorized. Unassigned Role.', 403);

  if (user.status == 2) throw new APIError('Account has been deactivate.', 403);

  // TODO: select safe attributes
  if (!user.app_token) throw new APIError('Unauthorized', 401);
  if (!user) throw new APIError('Account not found', 404);

  req.user = user;

  return next();
};

export const capitalizeFirstLetterOfEachWord = (sentence) => {
  return sentence
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const can = (name) => {
  return async (req, res, next) => {
    console.log(req.user_type);
    // TODO: only allow customer permission
    if (req.user_type == 'customer' || req.user_type == 'guest') return next();
    else {
      let permissions = JSON.parse(JSON.stringify(req.user.role.permissions));
      permissions = permissions.map((row) => row.name);

      if (!permissions.includes(name))
        throw new APIError('Access Forbidden.', 403);
      next();
    }
  };
};

export const getDates = (startDate, endDate) => {
  const dates = [];
  let currentDate = dayjs(startDate);
  let lastDate = dayjs(endDate);

  while (currentDate.isSameOrBefore(lastDate)) {
    dates.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }
  return dates;
};
