import {RequestHandler} from 'express'

import prisma from '../../database'

import path from 'path'
import fs from 'fs'


export const getPictureTour:RequestHandler = async (req,res) => {  
    const picture = await prisma.picture.findFirst({where: {Tour: req.params.tour}});
    if(!picture) { 
        return res.status(204).json();
    }
    else{
        fs.writeFileSync(path.join(__dirname,'../../../dbimages/' + req.params.tour + '-' + picture.id + '.jpg'),picture.picture)
    }
    return res.json(path.join(req.params.tour + '-' + picture.id + '.jpg'));
};

export const getPicturesTour:RequestHandler = async (req,res) => {  
    const pictures = await prisma.picture.findMany({where: {Tour: req.params.tour}});
    if(!pictures) { 
        return res.status(204).json();
    }
    else {
        pictures.map((img) => {
            fs.writeFileSync(path.join(__dirname,'../../../dbimages/' + req.params.tour + '-' + img.id + '.jpg'),img.picture)
        })
    }
    const pics = fs.readdirSync(path.join(__dirname,'../../../dbimages/'));
    const result: string[] = [];
    pics.map((pic) => {
        if(pic.includes(req.params.tour)){
            result.push(pic)
        }
    })
    return res.json(result);
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