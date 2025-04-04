import { Router } from 'express';

import { list, show, create, edit, destroy } from 'controllers/purchases';
import { checkJwt } from 'middleware/checkJwt';

const router = Router();

router.get('/', [checkJwt], list);

router.get('/:id([0-9]+)', [checkJwt], show);

router.post('/', [checkJwt], create);

router.patch('/:id([0-9]+)', [checkJwt], edit);

router.delete('/:id([0-9]+)', [checkJwt], destroy);

export default router;
