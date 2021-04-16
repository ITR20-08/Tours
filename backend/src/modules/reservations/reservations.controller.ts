import {RequestHandler} from 'express'

import prisma from '../../database'

export const getReservations:RequestHandler = async (req,res) => {  
    try {
        const reservations = await prisma.reservation.findMany();
        return res.json(reservations);
    } catch (error) {
        res.json(error);
    }
};

export const createReservation:RequestHandler = async(req,res) => {  
    const reservation=req.body;
    console.log(reservation);
    await prisma.reservation.create({
        data:{
            tour: {
                connect: { id: reservation.Tour },
            },
            quantity:parseInt(reservation.quantity),
            user: {
                connect: { email: reservation.User},
            },
        }
    });
    res.json('Reservation Saved');
};

export const getReservation:RequestHandler = async(req,res) => {   
    const reservation= await prisma.reservation.findFirst({where:{id:parseInt(req.params.id)}})
    if(!reservation) return res.status(204).json();
    return res.json(reservation);
};