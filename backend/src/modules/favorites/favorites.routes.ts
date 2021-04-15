import { Router } from 'express'
import * as favCtrl from './favorites.controller'

const router = Router();

router.get('/favorites/:tour/:user', favCtrl.getFavorites);
router.delete('/favorites/:tour/:user', favCtrl.deleteFavorite);
router.post('/favorites/:tour/:user', favCtrl.createFavorite);


export default router;