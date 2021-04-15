import React, { useEffect, useState } from "react";
import { Tour } from "../shared/model/tour.model";
import { Location } from "../shared/model/location.model";
import { Navbar, Form, InputGroup, Button, FormControl} from 'react-bootstrap';
import * as tourService from "../TourService";
import TourItem from "./TourItem";


const TourList = () => {

  const TourInit = {
    id: "",
    start_date: "",
    location: {
      country: "", 
      city: ""
    } 
  };

  const [tours, setTours] = useState<Tour[]>([TourInit]);
  const [ida,setIda] = useState("");
  const [vuelta,setVuelta] = useState("");
  const [location,setLocation] = useState("");


  const loadTours = async () => {
    const res = await tourService.getTours();
    setTours(res.data);
  };

  const handleClick = (e) => {
    const res = tours.filter((tour)  => {
      const loc = tour.location.city.concat(tour.location.country)
      return loc.includes(location)
    })
    setTours(res);
  };

  const handleChangeLocation = (e) => {
    setLocation(e.target.value)
  };

  const handleChangeIda = (e) => {
    setIda(e.target.value)
  };

  const handleChangeVuelta = (e) => {
    setVuelta(e.target.value)
  };

  useEffect(() => {
    loadTours();
  }, []);

  return (
    <div>
      <Navbar className="bg-light justify-content-between">
          <h4>Destino</h4>
          <input className="form-control mr-4 ml-4" type="text" placeholder="Roma, Paris..." onChange={(e) => handleChangeLocation(e)}/>  
          <h4>Ida</h4>
          <input className="form-control mr-4 ml-4" type="date" placeholder="Ida" onChange={(e) => handleChangeIda(e)}/>
          <h4>Vuelta</h4>
          <input className="form-control mr-4 ml-4" type="date" placeholder="Vuelta" onChange={(e) => handleChangeVuelta(e)}/>
          <Button type="button" onClick={(e) => handleClick(e)}>Buscar</Button>
    </Navbar>
      {tours.map((tour) => {
        return <TourItem tour={tour} />;
      })} 
    </div>
  );
};

export default TourList;
