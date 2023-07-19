import { Router } from 'express';

import { validate } from '~/helpers';
import * as controller from './user.controller';
import * as rules from './user.rules';

const router = new Router();

// Public
router.get('/', controller.browse);
router.post('/capacity', validate(rules.addCapacity), controller.addCapacity);
router.get('/capacity', controller.getCapacity);
router.delete('/capacity/:id', controller.deleteCapacity);

export default router;
