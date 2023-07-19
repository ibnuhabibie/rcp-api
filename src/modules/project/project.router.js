import { Router } from 'express';

import * as controller from './project.controller';

const router = new Router();

// Browse
router.get('/', controller.browse);

export default router;
