import { Router } from 'express';

import auth from './auth';
import users from './users';
import purchases from './purchases';

const router = Router();

router.use('/auth', auth);
router.use('/purchases', purchases);
router.use('/users', users);

export default router;
