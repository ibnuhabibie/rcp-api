import { APIError, successRes } from '~/helpers';
import { Models, Sequelize } from '~/models';

export const browse = async (req, res) => {
  let data = await Models.Role.findAll();
  successRes(res, data, null, req);
};

export const manage = async (req, res) => {
  let data = null;
  if (req.params.id) {
    var activity = 'edit';
    data = await Models.Role.findByPk(req.params.id);
    if (!data) throw new APIError('Data not found.', 404);
    data.update(req.body, {
      where: { id: req.params.id },
    });
  } else {
    var activity = 'add';
    data = await Models.Role.create(req.body);
  }

  await Models.RolePermission.destroy({
    where: {
      role_id: data.id,
    },
  });
  let ids = Array.isArray(req.body.permission_id)
    ? req.body.permission_id
    : [req.body.permission_id];

  let permissions = ids.map((id) => {
    return {
      role_id: data.id,
      permission_id: id,
    };
  });

  await Models.RolePermission.bulkCreate(permissions);

  successRes(res, data, `Successfully ${activity} role.`);
};

export const _delete = async (req, res) => {
  const FROZEN_ROLE = [1];
  let id = parseInt(req.params.id);
  if (FROZEN_ROLE.includes(id)) {
    throw new APIError('Access Forbidden. Role can not be deleted.', 403);
  }
  let users = await Models.Admin.findAll({
    where: {
      role_id: req.params.id,
    },
    attributes: ['id'],
    raw: true,
  });

  if (users.length)
    throw new APIError('Access Forbidden. Role has master.', 403);

  let data = await Models.Role.findByPk(req.params.id);

  if (!data) throw new APIError('Data not found.', 404);

  data.destroy();
  successRes(res, null, 'Successfully delete data.');
};

export const getPermissions = async (req, res) => {
  let data = await Models.Permission.findAll();
  successRes(res, data);
};

export const getRolePermission = async (req, res) => {
  let data = await Models.Role.findByPk(req.params.id, {
    include: {
      model: Models.Permission,
      as: 'permissions',
      attributes: ['id', 'name'],
      through: {
        attributes: [],
      },
    },
  });

  if (!data) throw new APIError('Data not found.', 404);

  successRes(res, data);
};
