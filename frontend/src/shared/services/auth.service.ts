import axios from 'axios'
import {IUserForm,ICredentials} from '../../modules/auth/shared/model'

const API='http://localhost:5000';

export const getUsers=async()=>{
    return await axios.get<IUserForm[]>(`${API}/users`);
}
export const createUser= async(user:IUserForm)=>{
    return await axios.post(`${API}/users`, user);
} 
export const getUser=async(user:ICredentials)=>{
    return await axios.get<IUserForm>(`${API}/users/${user.email}/${user.password}`);
}

