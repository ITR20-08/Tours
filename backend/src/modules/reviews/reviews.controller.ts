import {RequestHandler} from 'express'

import prisma from '../../database'

export const getReviews:RequestHandler = async (req,res) => {  
    try {
        const reviews = await prisma.review.findMany();
        return res.json(reviews);
    } catch (error) {
        res.json(error);
    }
};

export const createReview:RequestHandler = async(req,res) => {  
    const review=req.body;
    console.log(review);
    await prisma.review.create({
        data:{
            description:review.description,
            tour: {
                connect: { id: review.tour.id },
            },
            calification:review.calification,
            user: {
                connect: { email: review.User.email},
            },
        }
    });
    res.json('Review Saved');
};

export const getReview:RequestHandler = async(req,res) => {   
    const review= await prisma.review.findFirst({where:{id:parseInt(req.params.id)}})
    if(!review) return res.status(204).json();
    return res.json(review);
};