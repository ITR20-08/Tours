import { Router } from 'express'
import * as locCtrl from './locations.controller'

const router = Router();

router.get('/locations', locCtrl.getLocations);
router.get('/locations/:id', locCtrl.getLocation);
router.post('/locations', locCtrl.createLocation);

export default router;