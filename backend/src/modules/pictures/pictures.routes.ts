import { Router } from 'express'
import * as picsCtrl from './pictures.controller'

const router = Router();

router.get('/picture/:tour', picsCtrl.getPictureTour);
router.get('/pictures/:tour', picsCtrl.getPicturesTour);
router.post('/pictures', picsCtrl.createPicture);

export default router;
