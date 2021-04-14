import { RequestHandler } from "express";

import prisma from "../../database";


export const createReview: RequestHandler = async (req, res) => {
  const review = req.body;
  console.log(review);
  await prisma.review.create({
    data: {
      description: review.description,
      tour: {
        connect: { id: review.tour.id },
      },
      calification: review.calification,
      user: {
        connect: { email: review.User.email },
      },
    },
  });
  res.json("Review Saved");
};

export const getReviews: RequestHandler = async (req, res) => {
  const reviews = await prisma.review.findMany({
    where: {
      Tour: req.params.id,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          country: true,
          last_name: true,
        },
      },
    },
  });
  if (!reviews) return res.status(204).json();
  return res.json(reviews);
};
