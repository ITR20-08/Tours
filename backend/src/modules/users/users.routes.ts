import {Router} from 'express'
const router = Router();
import * as userCtrl from './users.controller'

router.post('/user', userCtrl.getUser);
router.get('/users', userCtrl.getUsers);
router.post('/register', userCtrl.register);

export default router;