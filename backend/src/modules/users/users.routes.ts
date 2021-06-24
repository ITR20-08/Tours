import {Router} from 'express'
const router = Router();
import * as userCtrl from './users.controller'

router.post('/users/login', userCtrl.getUser);
router.get('/users', userCtrl.getUsers);
router.post('/users/register', userCtrl.register);

export default router;