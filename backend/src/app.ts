import express from 'express'
import config from './config'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'

import categoriesRoutes from "../src/modules/categories/categories.routes";
import locationsRoutes from "./modules/locations/locations.routes";
import toursRoutes from "./modules/tours/tours.routes";
import userRoutes from "./modules/users/users.routes";
import benefitsRoutes from "./modules/benefits/benefits.routes";
import reservationsRoutes from "./modules/reservations/reservations.routes";
import reviewsRoutes from "./modules/reviews/reviews.routes";
import picturesRoutes from "./modules/pictures/pictures.routes"
import favoritesRoutes from "./modules/favorites/favorites.routes"



const app= express();



app.set('port',config.PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'../dbimages')));

app.use(categoriesRoutes);
app.use(locationsRoutes);
app.use(toursRoutes);
app.use(userRoutes);
app.use(benefitsRoutes);
app.use(reservationsRoutes);
app.use(reviewsRoutes);
app.use(picturesRoutes);
app.use(favoritesRoutes);

export default app;