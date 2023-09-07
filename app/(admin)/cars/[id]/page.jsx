import React from "react";
import { getCar } from "@/lib";
import Image from "next/image";
import Link from "next/link";

export default async function CarDetailsPage({ params: { id } }) {
  const carData = getCar(id);
  const car = await carData;
  console.log(car);

  return (
    <div className="p-4 space-y-4">
      <Image src={car.image_url} alt={car.make} width={500} height={300} />
      <h1 className="text-2xl font-semibold">{car.make}</h1>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-white">Year: {car.year}</p>
          <p className="text-white">Price per Day: ${car.price_per_day}</p>
          <p className="text-white">Transmission: {car.transmission}</p>
          <p className="text-white">Body Type: {car.body_type}</p>
        </div>
        <div>
          <p className="text-white">Category: {car.category}</p>
          <p className="text-white">
            Fuel Consumption: {car.fuel_consumption} mpg
          </p>
          <p className="text-white">Number of Seats: {car.no_of_seats}</p>
          <p className="text-white">Fuel Type: {car.fuel_type}</p>
        </div>
      </div>

      <div className="mt-4">
        <Link
          href="/booking"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}