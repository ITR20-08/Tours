import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav,Button} from 'react-bootstrap';
import {LOGIN, REGISTER} from '../../shared/routes'
import {Link} from "react-router-dom";
import cookies from '../../shared/cookies'
import {AuthContext} from '../../shared/contexts'
import React, { useContext } from 'react';
export default function Header(){
    const { logout } = useContext(AuthContext);

    return (


        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Tours</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link>Features</Nav.Link>
            <Nav.Link>Pricing</Nav.Link>
        </Nav>
        <Nav>
         {cookies.get('email')===undefined?(<Navbar.Brand><Link to={LOGIN}  style={{ textDecoration: 'none' , color:'white'}}>Login</Link></Navbar.Brand>):""}
         {cookies.get('email')===undefined?(<Navbar.Brand><Link to={REGISTER}  style={{ textDecoration: 'none' , color:'white'}} >Register</Link></Navbar.Brand>):""}
         {cookies.get('email')?(<Navbar.Brand><Nav.Link style={{color:'white'}} onClick={()=>{
               logout();
               window.location.href="./";
         }}>
          Logout</Nav.Link></Navbar.Brand>):""}
        </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
}