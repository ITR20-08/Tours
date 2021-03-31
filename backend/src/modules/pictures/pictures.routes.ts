import { Router } from 'express'
import * as picsCtrl from './pictures.controller'

const router = Router();

router.get('/pictures/:id', picsCtrl.getPictures);
router.post('/pictures', picsCtrl.createPicture);

export default router;
