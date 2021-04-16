import axios from 'axios'

const API='http://localhost:5000';

export const createReservation= async(reservation:any)=>{
    return await axios.post(`${API}/reservations`, reservation);
}