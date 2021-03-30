import {RequestHandler} from 'express'
import prisma from '../../database'

export const getBenefits:RequestHandler = async (req,res) => {  
    try {
        const benefits = await prisma.benefit.findMany();
        return res.json(benefits);
    } catch (error) {
        res.json(error);
    }
};

export const createBenefit:RequestHandler = async(req,res) => {  
    const benefit=req.body;
    console.log(benefit);
    await prisma.benefit.create({
        data:{
            description:benefit.description
        }
    });
    res.json('Benefit Saved');
};