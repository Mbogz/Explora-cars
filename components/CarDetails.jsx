import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import { Card, Badge, Button, Spinner } from "react-bootstrap";


export default function CarDetails()  {
  const{id} = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3000/CarDetails${id}`)
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
        .post(`http://127.0.0.1:3000/bookings`, {
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

      if (loading) {
        return <Spinner animation="border" />;
      }
      else if (error){
        return <p>{error}</p>;
      };
      else if (car) {
        return (
          <Card>
            <Card.Img variant="top" src={car.image_url} />
            <Card.Body>
              <Card.Title>{car.make}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {car.year} | {car.transmission} | {car.body_type} | {car.category}
              </Card.Subtitle>
              <Card.Text>
                Price per day: ${car.price_per_day}
                <br />
                Fuel consumption: {car.fuel_consumption} L/100km
                <br />
                Number of seats: {car.number_of_seats}
                <br />
                Fuel type: {car.fuel_type}
              </Card.Text>
              <Badge variant={car.is_rented ? "danger" : "success"}>
                {car.is_rented ? "Unavailable" : "Available"}
              </Badge>
              <Button variant="primary" onClick={handleBooking} disabled={car.is_rented}>
                Request Booking
              </Button>
            </Card.Body>
          </Card>
        );
      }
      else {
        return <p>No car found</p>;
      }
    }

