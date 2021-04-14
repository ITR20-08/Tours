import axios from 'axios'

const API = 'http://localhost:5000';

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





