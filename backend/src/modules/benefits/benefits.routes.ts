import {Router} from 'express'
const router = Router();
import * as benCtrl from './benefits.controller'

router.get('/benefits', benCtrl.getBenefits);
router.post('/benefits', benCtrl.createBenefit);

export default router;