import axios from 'axios'
import {ILocation, ICategory, IBenefit, ITourForm} from '../../../tours/shared/model'

const API='http://localhost:5000';

export const getLocations=async()=>{
    return await axios.get<ILocation[]>(`${API}/locations`);
}

export const getCategories=async()=>{
    return await axios.get<ICategory[]>(`${API}/categories`);
}

export const getBenefits=async()=>{
    return await axios.get<IBenefit[]>(`${API}/benefits`);
}

export const createTour= async(tour:ITourForm)=>{
    return await axios.post(`${API}/tours`, tour);
} 

export const createPicture= async(picture:any)=>{
    return await axios.post(`${API}/pictures`, picture);
}
