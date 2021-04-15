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
export const getTours = async () => {
    return await axios.get(`${API}/tours`)
}
export const getTour = async (id:string) => {
    return await axios.get(`${API}/tours/${id}`)
}
export const getReviews = async (id:string) => {
    return await axios.get(`${API}/reviews/${id}`)
}
export const getTourThumbnailPicture = async (id:string) => {
    return await axios.get(`${API}/picture/${id}`)
}
export const getTourPictures = async (id:string) => {
    return await axios.get(`${API}/pictures/${id}`)
}
export const getFavorite = async (tour:string,email:string) => {
    return await axios.get(`${API}/favorites/${tour}/${email}`)
}
export const deleteFavorite = async (tour:string,email:string) => {
    return await axios.delete(`${API}/favorites/${tour}/${email}`)
}
export const createFavorite = async (tour:string,email:string) => {
    return await axios.post(`${API}/favorites/${tour}/${email}`)
}