import { RequestHandler } from 'express'
import prisma from '../../database'

export const getTours:RequestHandler = async (req,res) => {  
    try {
        const tours = await prisma.tour.findMany({
            include: {
                benefits: { 
                    include:{
                        benefit: true
                    }
                },
                category: true,
                location: true
            }
        });
        return res.json(tours);
    } catch (error) {
        res.json(error);
    }
};

export const getTour:RequestHandler = async(req,res) => {   
    const tour = await prisma.tour.findFirst({
        where:{
            id: req.params.id
        },
        include: {
            benefits: { 
                include:{
                    benefit: true
                }
            },
            category: true,
            location: true
        }
    });
    if(!tour) return res.status(204).json();
    return res.json(tour);
};
export const createTour:RequestHandler = async(req,res) => {  
    const tour = req.body;
    console.log(tour);
    await prisma.tour.create({
        data:{
            id: tour.id,
            name: tour.name,
            description: tour.description,
            duration: parseInt(tour.duration),
            start_date: new Date(tour.start_date),
            price_for_person: tour.price_for_person,
            max_capacity: parseInt(tour.max_capacity),
            calification: tour.calification,
            category: {
                connect: { id: parseInt(tour.category) },
            },
            location: {
                connect: { id: parseInt(tour.location) },
            },
        }
    });
    for (let entry of tour.benefits){
        await prisma.tour_benefit.create({
            data: {
                tour: { 
                    connect: {id: tour.id}
                },
                benefit: {
                    connect: {id: entry}
                }
            }
        })
    }
    res.json('Tour Saved');
};