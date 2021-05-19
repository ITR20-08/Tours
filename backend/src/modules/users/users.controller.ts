import { RequestHandler } from "express";

import prisma from "../../database";

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (error) {
    res.json(error);
  }
};

export const register: RequestHandler = async (req, res) => {
  const userData = req.body;
  const date=userData.birth_date;
  let dateParts = date.split("/");
  let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

  const user = await prisma.user.findFirst({
    where: { email: userData.email },
  });
  if (!user) {
    await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        last_name: userData.last_name,
        country: userData.country,
        birth_date: dateObject,
        password: userData.password,
        type: userData.type,
      },
    });
    return res.status(204).json();
  } else {
    return res.json({email:user.email,password:user.password});  
  }
};

export const getUser: RequestHandler = async (req, res) => {
  const userData = req.body;
  const user = await prisma.user.findFirst({
    where: { email: userData.email, password: userData.password },
  });
  if (!user) return res.status(204).json();
  return res.json(user);
};


//{
//	"email":"isaac.toumarodriguez@gmail.com",
//	"password":"Pasword1234$",
//	"name":"Isaac",
//	"last_name":"Touma",
//	"country":"Costa Rica",
//	"birth_date": "2000-04-10"
//   "type": "user"
//}
