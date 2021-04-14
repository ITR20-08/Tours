import React, { useEffect, useState } from "react";
import { Tour } from "../shared/model/tour.model";
import * as tourService from "../TourService";
import cookies from "../../../shared/cookies";
import { useHistory } from "react-router-dom";
import { Rating } from '@material-ui/lab';
import Heart from "react-animated-heart";

interface Props {
  tour: Tour;
}

const TourItem = ({ tour }: Props) => {
  const history = useHistory();
  const [picture, setPicture] = useState<string>();
  const [reviewsCount,setReviewsCount] = useState<number>(0);
  const [isClick, setClick] = useState(false);

  const loadThumbnailPicture = async () => {
    const res = await tourService.getTourThumbnailPicture(tour.id);
    setPicture(res.data);
  };
  const loadReviewsCount = async () => {
    const res = await tourService.getReviews(tour.id);
    setReviewsCount(res.data.length)
  };
  const loadFavorite = async () => {
    if(cookies.get("email")){
      const res = await tourService.getFavorite(tour.id,cookies.get("email"));
      if(res.data.length){
        setClick(true);
      }
    }
  };
  const handleClick = async () => {
    if(isClick){
        await tourService.deleteFavorite(tour.id,cookies.get("email"));
    }
    else{
        await tourService.createFavorite(tour.id,cookies.get("email"));
    }
  }

  useEffect(() => {
    loadThumbnailPicture();
    loadReviewsCount();
    loadFavorite();
  }, []);

  return (
    <div className="col-md-12 mt-3">
      <div
        className="card card-body shadow p-3 mb-5 bg-white rounded"
      >
        <img
          className="card-img-top"
          src={"http://localhost:5000/" + picture}
          style={{ height: "30vh" }}
          alt="Card image"
        ></img>
        <div className="d-flex justify-content-inline">
          <h2 onClick={() => history.push(`/details/${tour.id}`)} style={{cursor:'pointer',color:'#008cba',fontWeight:"bold"}}>{tour.name}</h2>
        </div>
        <p>{tour.description}</p>
        <p className="font-italic">Duración del Tour: {tour.duration} horas</p>
        <Rating
          name="tour-rating"
          readOnly= {true}
          value={tour.calification}
        />
        <span>{reviewsCount} opiniones</span>
        {cookies.get("email") ? (
            <Heart isClick={isClick} onClick={() => {
              setClick(!isClick);
              handleClick();
              }
            } /> 
        ):""}
        <div className="text-right">
          <p>
            Desde
            <br />
          </p>
          <h1 className="font-weight-bold">${tour.price_for_person}</h1>
          <p>
            por persona
            <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default TourItem;
