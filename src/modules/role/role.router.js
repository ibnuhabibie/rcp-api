import { Router } from 'express';

import { authenticate, upload, validate } from '~/helpers';
import * as controller from './role.controller';
import * as rules from './role.rules';

const router = new Router();

// Browse
router.get('/', controller.browse);

export default router;
