import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';

import {BrowserRouter as Router,Switch,Route,} 
from "react-router-dom";

import { AuthProvider } from './shared/contexts';

import Register from './modules/auth/register/register.component'
import Login from './modules/auth/login/login.component'
import TourForm from './modules/tours/tours-form/tour-form.component'

import { ROOT, LOGIN , REGISTER,TOUR_ADD, TOUR_DETAIL} from './shared/routes';
import Navigation from './modules/navigation/navigation.component'

import reportWebVitals from './reportWebVitals';
import TourList from './modules/tours/tour-list/tour-list.component';
import TourDetail from './modules/tours/tour-detail/tour-detail.component';

ReactDOM.render(
  <AuthProvider>
     <Router>
    <Navigation/>
   <Switch>
     <Route path={LOGIN} component={Login} />
     <Route path={REGISTER} component={Register} />
     <Route path={TOUR_ADD} component={TourForm}/>
     <Route exact path={ROOT} component={TourList}></Route>
     <Route path={TOUR_DETAIL} component={TourDetail}></Route>
   </Switch>
  </Router>
  </AuthProvider>
 
  ,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
