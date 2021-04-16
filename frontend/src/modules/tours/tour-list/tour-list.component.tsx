import React, { useEffect, useState } from "react";
import { Tour } from "../shared/model/tour.model";
import { Navbar, Form, InputGroup, Button, FormControl } from "react-bootstrap";
import * as tourService from "../shared/services/tour.service";
import TourItem from "../shared/components/tour-item/tour-item.component";
import { useFormik } from "formik";


const TourList = () => {

  const formik = useFormik({
    initialValues: {
      location: "",
      date: "",
    },
    onSubmit: (values , {resetForm}) => {
      resetForm();
      const res = tours.filter((tour) => {
        const loc = tour.location.city.concat(tour.location.country);
        const dateSelection = new Date(values.date);
        const dateTour =  new Date(tour.start_date);
        console.log(dateSelection);

        if (values.location && values.date){
          return (
            loc.includes(values.location) && dateTour > dateSelection
          );
        }
        else if(values.location){
          return (
            loc.includes(values.location) 
          );
        }
        else if(values.date){
          return (
            dateTour >= dateSelection
          );
        }
        else{
          return (
            loadTours()
          );
        }
      });
      setToursFiltered(res);
    }
  });

  const TourInit: Tour = {
    id: "",
    start_date: "",
    location: {
      country: "",
      city: "",
    },
  };

  const [tours, setTours] = useState<Tour[]>([TourInit]);
  const [toursFiltered, setToursFiltered] = useState<Tour[]>([TourInit]);


  const loadTours = async () => {
    const res = await tourService.getTours();
    setTours(res.data);
    setToursFiltered(res.data);
  };

  useEffect(() => {
    loadTours();
  }, []);

  return (
    <div>
      <Navbar className="bg-light justify-content-between">
        <Form inline onSubmit={formik.handleSubmit} id="search">
          <Form.Label>Destino</Form.Label>
          <FormControl
            className="form-control mr-4 ml-4"
            id="location"
            name="location"
            type="text"
            placeholder="Roma, Paris..."
            onChange={formik.handleChange}
            value={formik.values.location}
          />
          {formik.errors.location ? <div className="mr-2 text-danger">{formik.errors.location}</div> : null}
          <Form.Label>Fecha del Tour</Form.Label>
          <FormControl
            className="form-control mr-4 ml-4"
            id="date"
            name="date"
            type="date"
            placeholder="Ida"
            onChange={formik.handleChange}
            value={formik.values.date}
          />
          {formik.errors.date ? <div className="mr-2 text-danger">{formik.errors.date }</div> : null}
          <Button type="submit">Buscar</Button>
        </Form>
      </Navbar>
      {toursFiltered.map((tour) => {
        return <TourItem tour={tour} />;
      })}
    </div>
  );
};

export default TourList;
