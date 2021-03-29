import {Router} from 'express'
const router = Router();
import * as catCtrl from './categories.controller'

router.get('/categories', catCtrl.getCategories);
router.post('/categories', catCtrl.createCategory);
router.get('/categories/:id', catCtrl.getCategory);

export default router;