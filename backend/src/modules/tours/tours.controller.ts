import { RequestHandler } from 'express'


import prisma from '../../database'


export const getTours:RequestHandler = async (req,res) => {  
    try {
        const tours = await prisma.tour.findMany();
        return res.json(tours);
    } catch (error) {
        res.json(error);
    }
};

export const getTour:RequestHandler = async(req,res) => {   
    const tour = await prisma.tour.findFirst({
        where:{id:parseInt(req.params.id)}
    
    });
    if(!tour) return res.status(204).json();
    return res.json(tour);
};

export const createTour:RequestHandler = async(req,res) => {  
    const tour = req.body;
    const createTour = await prisma.tour.create({
        data:{
            name: tour.name,
            description: tour.description,
            duration: tour.duration,
            start_date: new Date(tour.start_date),
            price_for_person: tour.price_for_person,
            max_capacity: tour.max_capacity,
            calification: tour.calification,
            category: {
                connect: { id: tour.category.id },
            },
            location: {
                connect: { id: tour.location.id },
            }
        }
    });
    res.json('Tour Saved');
};













//type of tour object example for postman test

// {
//     "name": "Tour San Jose",
//     "description": "Get to know the most popular places in San Jose",
//     "duration": 2,
//     "start_date": "2021-04-10",
//     "price_for_person": 40,
//     "max_capacity": 20,
//     "calification": 5,
//     "category": {
//         "id": 1
//     },
//     "location": {
//         "id": 1
//     },
//      "benefits":[]
//          
//
// }