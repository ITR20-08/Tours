import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from './auth.context';

import { ICredentials, IUserForm } from '../../modules/auth/shared/model';
import { getUser } from '../services/auth.service';

import cookies from '../cookies'
const AuthProvider: FC = ({ children }) => {

  const history = useHistory();


  const login = async ( credentials : ICredentials) => {
      const res = await getUser(credentials);
      const user=res.data;
      if(user){
      cookies.set("email", user.email, {path: "/"});
      cookies.set("type", user.type, {path: "/"});
      cookies.set("country", user.country, {path: "/"});
      
      user.type==="admin"? window.location.href="/tours/add":window.location.href="./";

    } else {
       alert("Correo o contraseña invalida");
    }
  };

  const logout = async () => {
    try {
      cookies.remove("email", {path: "/"});
      cookies.remove("type", {path: "/"});
      cookies.remove("country", {path: "/"});
    } catch (error) {}
  };


  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
