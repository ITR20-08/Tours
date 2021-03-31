import {RequestHandler} from 'express'
import prisma from '../../database'

export const getCategories:RequestHandler = async (req,res) => {  
    try {
        const categories = await prisma.category.findMany();
        return res.json(categories);
    } catch (error) {
        res.json(error);
    }
};

export const createCategory:RequestHandler = async(req,res) => {  
    const category =req.body;
    await prisma.category.create({
        data:{
            description: category.description
        }
    });
    res.json('Category Saved');
};

export const getCategory:RequestHandler = async(req,res) => {   
    const category= await prisma.category.findFirst({where:{id:parseInt(req.params.id)}})
    if(!category) return res.status(204).json();
    return res.json(category);
};