import {Router} from 'express'
const router = Router();
import * as revCtrl from './reviews.controller'

router.get('/reviews', revCtrl.getReviews);
router.post('/reviews', revCtrl.createReview);
router.get('/reviews/:id', revCtrl.getReview);

export default router;