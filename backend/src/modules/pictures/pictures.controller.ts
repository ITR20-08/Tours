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
    const picture = req.body;
    await prisma.picture.create({
        data:{
            tour: { 
                connect: { id: picture.tour.id},
            },
            picture: picture.picture
        }
    });
    res.json('Picture saved');
};