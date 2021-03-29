import { Router } from 'express'
import * as tourCtrl from './tours.controller'

const router = Router();

router.get('/tours', tourCtrl.getTours);
router.get('/tours/:id', tourCtrl.getTour);
router.post('/tours', tourCtrl.createTour);

export default router;