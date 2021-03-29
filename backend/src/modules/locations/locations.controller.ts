import { location , PrismaClient } from '@prisma/client'
import { RequestHandler } from 'express'
import { ILocation } from './locations.model'

const prisma = new PrismaClient()

export const getLocations:RequestHandler = async (req,res) => {  
    try {
        const locations = await prisma.location.findMany();
        return res.json(locations);
    } catch (error) {
        res.json(error);
    }
};

export const getLocation:RequestHandler = async(req,res) => {   
    const location = await prisma.location.findFirst({where:{id:parseInt(req.params.id)}})
    if(!location) return res.status(204).json();
    return res.json(location);
};

export const createLocation:RequestHandler = async(req,res) => {  
    const location:ILocation = req.body;
    const insertLocation = await prisma.location.create({
        data:{
            country: location.country,
            city: location.city
        }
    });
    res.json('Location saved');
};
