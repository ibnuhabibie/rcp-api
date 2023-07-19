import { Router } from 'express';

import project from '~/modules/project/project.router.js';
import role from '~/modules/role/role.router.js';
import user from '~/modules/user/user.router.js';

import { successRes } from '~/helpers';

const router = new Router();

// Public Routes
router.get('/', (req, res) => successRes(res, null, 'ok'));

router.use('/user', user);
router.use('/role', role);
router.use('/project', project);

export default router;
