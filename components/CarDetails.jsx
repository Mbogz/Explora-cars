import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
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
}