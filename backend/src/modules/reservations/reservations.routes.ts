import {Router} from 'express'
const router = Router();
import * as resCtrl from './reservations.controller'

router.get('/reservations', resCtrl.getReservations);
router.post('/reservations', resCtrl.createReservation);
router.get('/reservations/:id', resCtrl.getReservation);

export default router;