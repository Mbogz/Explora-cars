import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"


export default function CarDetails = () => {
  const{id} = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    axios
      .get(`https://exploracars.herokuapp.com/api/cars/${id}`)
      .then((response) => {
        setCar(response.data);
        setLoading(false);
      });
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
    }, [id]
    );

    const handleBooking = () => {
      axios
        .post(`https://exploracars.herokuapp.com/api/bookings`, {
          car_id: car._id,
          user_id: "some_user_id", 
          start_date: "some_start_date",
          end_date: "some_end_date", 
        });
        .then((response) => {
          alert("Your booking request has been sent successfully!");
        });
        .catch((error) => {
          alert("Something went wrong. Please try again later.");
        });
      };
}