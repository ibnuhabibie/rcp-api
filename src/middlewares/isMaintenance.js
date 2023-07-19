import { Models } from '~/models';
import { APIError } from '~/helpers';

export default async function (req, res, next) {
  let isMaintenance = await Models.Setting.findOne({
    where: {
      name: 'is_maintenance',
    },
  });

  if (isMaintenance.value) throw new APIError('Under Maintenance.', 503);

  next();
}
