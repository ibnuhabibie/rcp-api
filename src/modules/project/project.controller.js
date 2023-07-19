import { APIError, successRes } from '~/helpers';
import { Models, Sequelize } from '~/models';

export const browse = async (req, res) => {
  let data = await Models.Project.findAll();
  successRes(res, data, null, req);
};
