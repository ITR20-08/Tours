import React,{useContext, useState,useEffect} from 'react'
import useStyles from '../../shared/styles/form.style'
import {AuthContext} from '../../shared/contexts'
import { Container,Form,Button } from 'react-bootstrap';
import {createReservation} from './shared/services/reservation.servise'
import cookies from '../../shared/cookies'
import {useHistory} from 'react-router-dom'

const Shop= ()=> {

    let {shoppingCart}=useContext(AuthContext);
    const classes=useStyles();
    const [total,setTotal]=useState(0);
    const history=useHistory();
    useEffect(() => {
        let x=0;
        for(let i=0;i<shoppingCart.length;i++){
            console.log(shoppingCart[i].cant*shoppingCart[i].price);
            let n=shoppingCart[i].price * shoppingCart[i].cant;
            x+=n;
        }
        setTotal(x);
    }, [])
    const handleSubmit=async(e:any)=>{
        e.preventDefault();
        
        for(let i=0;i<shoppingCart.length;i++){
            const reservation={Tour:shoppingCart[i].id, quantity:shoppingCart[i].cant, User:cookies.get('email')};
            await createReservation(reservation);
        }

        shoppingCart=[];
        alert("Su compra fue exitosa");  
        history.go(0);
    };
 
    return (
        <Container className={classes.root}>
           <h1>Cart</h1>
           <Form>
                {shoppingCart.map(tour=>{
                    return <Form.Row style={{justifyContent:"center"}}> 
                        <Form.Group>
                        {tour.name}
                        </Form.Group>
                      <Form.Group>
                      ({tour.cant} Personas)  
                      </Form.Group>  
                      ....................................${tour.price*tour.cant}
                    </Form.Row>
                })}
                <Form.Row style={{justifyContent:"center"}}>
                <Form.Group> Comision.................................................................................${total*0.05}</Form.Group>
                
                </Form.Row>
                <Form.Row style={{justifyContent:"center"}}>
                <Form.Group> Total........................................................................................$ {total+total*0.05}</Form.Group>
               </Form.Row>
                <h2>Datos de Tarjeta</h2>
               
                <Form.Group >
                    <Form.Control placeholder="Nombre del Dueño"type="text"></Form.Control>
                </Form.Group>
               
               
                <Form.Group>
                    <Form.Control placeholder="Numero de Tarjeta"type="text"></Form.Control>
                </Form.Group>
            
               <Form.Row style={{justifyContent:"center"}}>
                <Form.Group>
                    <Form.Control placeholder="Fecha de Vencimiento"type="date"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control placeholder="CVC"type="text"></Form.Control>
                </Form.Group>
               </Form.Row>

                <Button onClick={handleSubmit}>Submit</Button>
                
            </Form>
        </Container>
    )
}

export default Shop;
