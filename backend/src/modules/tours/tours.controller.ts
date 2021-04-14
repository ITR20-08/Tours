import { RequestHandler } from 'express'
import prisma from '../../database'

export const getTours:RequestHandler = async (req,res) => {  
    try {
        const tours = await prisma.tour.findMany({
            include: {
                benefits: { 

                }
            }
        });
        return res.json(tours);
    } catch (error) {
        res.json(error);
    }
};

export const getTour:RequestHandler = async(req,res) => {   
    const tour = await prisma.tour.findFirst({
        where:{id: req.params.id}
    
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
//type of tour object example for postman test
// benefits value corresponds of an array with the id of each of the benefits chosen for the admin for the tour

// {
//     "id": "CR-SJ02",
//     "name": "San Jose Gastronomy Tour",
//     "description": "Get to know San Jose most iconic restaurants!",
//     "duration": 5,
//     "start_date": "2021-04-10",
//     "price_for_person": "200",
//     "max_capacity": 20,
//     "calification": 5,
//     "category": {
//         "id": 2
//     },
//     "location": {
//         "id": 2
//     } ,
//     "benefits": [2,3]  
// }












