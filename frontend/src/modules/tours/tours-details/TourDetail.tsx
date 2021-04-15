import React, { useState, useEffect } from "react";
import { Tour } from "../shared/model/tour.model";
import { Review } from "../shared/model/review.model";
import { useParams, useHistory } from "react-router-dom";
import { Carousel, CarouselItem } from "react-bootstrap";
import { Rating } from '@material-ui/lab';
import './TourDetail.css'
import * as tourService from "../TourService";
import cookies from "../../../shared/cookies";
import {
  ClockHistory,
  LightningChargeFill,
  Check,
} from "react-bootstrap-icons";

interface Params {
  id?: string;
}

const TourDetail = () => {
  const params = useParams<Params>();
  const history = useHistory();
  const initialState = {
    id: "",
    location: {
      country:"", 
      city:""
    },
    start_date: ""
  };

  const [tour, setTour] = useState<Tour>(initialState);
  const [reviews, setReviews] = useState<Review[]>();
  const [pictures, setPictures] = useState<string[]>([]);

  const loadTour = async (id: string) => {
    const res = await tourService.getTour(id);
    setTour(res.data);
  };
  const loadReviews = async (id: string) => {
    const res = await tourService.getReviews(id);
    setReviews(res.data);
  };
  const loadPictures = async (id: string) => {
    const res = await tourService.getTourPictures(id);
    setPictures(res.data);
  };
  useEffect(() => {
    if (params.id) {
      loadTour(params.id);
      loadReviews(params.id);
      loadPictures(params.id);
    }
  }, [params.id]);

  return (
    <div className="container">
      <div className="row mb-3">
        <Carousel>
          {pictures.map((img) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={"http://localhost:5000/" + img}
                />
                </Carousel.Item>
              );       
          })}
        </Carousel>
      </div>
      <div className="row">
        <div className="col-8">
          <h1 className="display-4">
            {tour.name}: {tour.category?.description}
          </h1>
          <p>{tour.description}</p>
          <h3 className="font-weight-bold mt-3 mb-3">Información General</h3>
          <div>
            <ClockHistory className="align-middle mr-3" />
            <span className="align-middle">
              Duración: {tour.duration} horas
            </span>
          </div>
          <div>
            <LightningChargeFill className="align-middle mr-3" />
            <span className="align-middle">Confirmación inmediata</span>
          </div>
          <h3 className="font-weight-bold mt-3 mb-3">Beneficios del tour</h3>
          {tour.benefits?.map((benefit) => {
            return (
              <div>
                <Check className="align-middle mr-3" />
                <span className="align-middle">
                  {benefit.benefit.description}
                </span>
              </div>
            );
          })}
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                {" "}
                ¡Ven y disfruta un tour de calidad!
              </h5>
              <p className="card-text">
                Desde ${tour.price_for_person} por persona
              </p>
              {cookies.get("email") === undefined ? (
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block rounded-pill"
                  onClick={() => history.push("/login")}
                >
                  Inicia sesión para reservar
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block rounded-pill"
                >
                  Reserve ya
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {reviews?.map((review) => {
        return (
          <div className="row mt-4">
            <div className="card rounded-pill">
              <div className="card-body">
              <Rating
                name="tour-rating"
                readOnly= {true}
                value={review.calification}
              />
                <h5 className="card-title">
                  Valoración de {review.user.name} {review.user.last_name}
                </h5>
                <p className="card-text">{review.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TourDetail;
