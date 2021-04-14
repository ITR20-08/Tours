import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-country-select/dist/react-bootstrap-country-select.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./shared/contexts";

import Register from "./modules/auth/register/register.component";
import Login from "./modules/auth/login/login.component";
import { ROOT, LOGIN, REGISTER } from "./shared/routes";
import Navigation from "./modules/navigation/navigation.component";

import reportWebVitals from "./reportWebVitals";

import TourList from "./modules/tours/tours-list/TourList";
import TourDetail from "./modules/tours/tours-details/TourDetail";

import "bootswatch/dist/yeti/bootstrap.min.css";
import "./index.css";

ReactDOM.render(
  <AuthProvider>
    <Router>
      <Navigation />
      <div className="container p-4">
      <Switch>
        <Route path={LOGIN} component={Login} />
        <Route path={REGISTER} component={Register} />
        <Route exact path="/" component={TourList}></Route>
        <Route path="/details/:id" component={TourDetail}></Route>
      </Switch>
      </div>
    </Router>
  </AuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
