import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { getDates, successRes } from '~/helpers';
import { Models, Sequelize } from '~/models';

export const browse = async (req, res) => {
  let condition = {
    where: {},
    attributes: {
      exclude: ['password', 'app_token'],
    },
  };

  if (req.query.role_id) condition.where.role_id = req.query.role_id;

  let data = await Models.User.findAll(condition);

  successRes(res, data);
};

export const addCapacity = async (req, res) => {
  req.body.batch = uuidv4();

  let allDate = getDates(req.body.start_date, req.body.end_date);

  let data = [];
  for (let date of allDate) {
    let formData = {
      ...req.body,
      date,
    };

    if (req.body.include_weekend) {
      data.push(formData);
      continue;
    }

    let dayOfDate = dayjs(date).day();
    if (dayOfDate === 6 || dayOfDate === 0) continue;

    data.push(formData);
  }

  await Models.UserLoad.bulkCreate(data, { returning: true });

  successRes(res, null, 'Successfully add user load');
};

export const getCapacity = async (req, res) => {
  let condition = {
    where: {},
    include: [
      {
        model: Models.User,
        as: 'user',
        attributes: ['name', 'role_id', 'email'],
      },
      {
        model: Models.Project,
        as: 'project',
        attributes: ['name', 'pic'],
      },
    ],
  };

  if (req.query.role_id) {
    condition.include[0].where = {
      role_id: req.query.role_id,
    };
  }

  if (req.query.start_date && req.query.end_date) {
    condition.where.date = {
      [Sequelize.Op.between]: [req.query.start_date, req.query.end_date],
    };
  }

  let data = await Models.UserLoad.findAll(condition);

  successRes(res, data);
};

export const deleteCapacity = async (req, res) => {
  await Models.UserLoad.destroy({
    where: {
      id: req.params.id,
    },
  });
  successRes(res, null, 'Successfully delete user load');
};
