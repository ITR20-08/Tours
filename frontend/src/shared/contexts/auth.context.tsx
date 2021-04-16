import { createContext } from 'react';

import { ICredentials} from '../../modules/auth/shared/model';

export interface ITourCart{
  id:string,
  name:string,
  price:number,
  cant:number
}
export interface IAuthContext {
  shoppingCart:ITourCart[],
  addToCart:(tour:ITourCart)=>void,
  pay:()=>void;
  login: (credentials: ICredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export default createContext<IAuthContext>({
  shoppingCart:[],
  addToCart:()=>{},
  pay:()=>{},
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});
