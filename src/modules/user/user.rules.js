import { body } from 'express-validator';

export const addCapacity = [
  body('user_id').notEmpty(),
  body('project_id').notEmpty(),
  body('assigned_hour').notEmpty(),
  body('start_date').notEmpty(),
  body('end_date').notEmpty(),
];
