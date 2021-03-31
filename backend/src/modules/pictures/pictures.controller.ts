import {RequestHandler} from 'express'

import prisma from '../../database'


export const getPictures:RequestHandler = async (req,res) => {  
    const pictures = await prisma.picture.findMany({where: {Tour: parseInt(req.params.tour)}});
    if(!pictures) return res.status(204).json();
    return res.json(pictures);
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
    res.json('Location saved');
};