import {Router} from 'express'
const router = Router();
import * as revCtrl from './reviews.controller'

router.post('/reviews', revCtrl.createReview);
router.get('/reviews/:id', revCtrl.getReviews);

export default router;