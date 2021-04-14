import {RequestHandler} from 'express'

import prisma from '../../database'

import path from 'path'
import fs from 'fs'

export const getPictures:RequestHandler = async (req,res) => {  
    const pictures = await prisma.picture.findMany({where: {Tour: req.params.tour}});
    if(!pictures) return res.status(204).json();
    return res.json(pictures);
};

export const createPicture:RequestHandler = async(req,res) => {  
    console.log(req.file);
    const Tour=req.body.Tour;
    const type=req.file.mimetype;
    const data = fs.readFileSync(path.join(__dirname,'./images/' + req.file.originalname));
    const name=req.file.originalname;
    console.log({Tour,name,type,data});
       
    res.send('image saved');
    await prisma.picture.create({
        data:{
            tour: { 
                connect: { id: Tour},
            },
            picture: data
        }
    });
    res.json('Location saved');
};