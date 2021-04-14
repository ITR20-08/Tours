import { Router } from 'express'
import * as picsCtrl from './pictures.controller'
import multer from 'multer'
import path from 'path'

const router = Router();

const storage = multer.diskStorage({
    destination: path.join(__dirname,'./images'),
    
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
});

const upload = multer({storage: storage}).single('image');

router.post('/pictures',upload, picsCtrl.createPicture);

router.get('/pictures/:tour', picsCtrl.getPictures);


export default router;
