import React, { useEffect, useState } from "react";
import { Tour } from "../shared/model/tour.model";
import { Navbar, Form, InputGroup, Button, FormControl} from 'react-bootstrap';
import * as tourService from "../TourService";
import TourItem from "./TourItem";

const TourList = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  const loadTours = async () => {
    const res = await tourService.getTours();
    setTours(res.data);
  };

  useEffect(() => {
    loadTours();
  }, []);

  return (
    <div>
      <Navbar className="bg-light justify-content-between">
        <Form inline>
        <InputGroup>
          <h4>Destino</h4>
          <input className="form-control mr-4 ml-4" type="text" placeholder="Roma, Paris..." name="location" required/>  
          <h4>Ida</h4>
          <input className="form-control mr-4 ml-4" type="date" placeholder="Ida" required/>
          <h4>Vuelta</h4>
          <input className="form-control mr-4 ml-4" type="date" placeholder="Vuelta" required/>
          </InputGroup>
        </Form>
      <Form inline>
        <Button type="submit">Buscar</Button>
      </Form>
    </Navbar>
      {tours.map((tour) => {
        return <TourItem tour={tour} />;
      })} 
    </div>
  );
};

export default TourList;
