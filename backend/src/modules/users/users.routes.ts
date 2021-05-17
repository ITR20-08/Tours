import {Router} from 'express'
const router = Router();
import * as userCtrl from './users.controller'

router.get('/users', userCtrl.getUsers);
router.post('/users', userCtrl.createUser);
router.post('/user', userCtrl.getUser);

export default router;