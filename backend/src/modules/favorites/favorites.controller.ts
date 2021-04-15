import { RequestHandler } from 'express'

import prisma from '../../database'

export const getFavorites:RequestHandler = async (req,res) => {  
    try {
        const favorites = await prisma.favorite.findMany({where:{tour_id:req.params.tour,user_email:req.params.user}});
        return res.json(favorites);
    } catch (error) {
        res.json(error);
    }
};

export const createFavorite:RequestHandler = async (req,res) => {  
    try {
        const favorites = await prisma.favorite.create({
            data:{
                user_email: req.params.user,
                tour_id: req.params.tour,
            },
        })
        return res.status(200).json();
    } catch (error) {
        res.json(error);
    }
};

export const deleteFavorite:RequestHandler = async(req,res) => {   
    try{
        await prisma.favorite.deleteMany({where:{tour_id:req.params.tour,user_email:req.params.user}});
        return res.status(200).json();
    } catch(error){
        return res.json(error);
    }
};