import {RequestHandler} from 'express'

import prisma from '../../database'

export const getUsers:RequestHandler = async (req,res) => {  
    try {
        const users = await prisma.user.findMany();
        return res.json(users);
    } catch (error) {
        res.json(error);
    }
};

export const createUser:RequestHandler = async(req,res) => {  
    const user=req.body;
    console.log(user);
    await prisma.user.create({
        data:{
            email:user.email,
            name:user.name,
            last_name:user.last_name,
            country:user.country,
            birth_date:new Date(user.birth_date),
            password:user.password,
            type:user.type
        }
    });
    res.json('User Saved');
};

export const getUser:RequestHandler = async(req,res) => {   
    const user= await prisma.user.findFirst({where:{email:req.params.email}})
    if(!user) return res.status(204).json();
    return res.json(user);
};

//{
//	"email":"isaac.toumarodriguez@gmail.com",
//	"password":"1234",
//	"name":"Isaac",
//	"last_name":"Touma",
//	"country":"Costa Rica",
//	"birth_date": "2000-04-10"
//}