"use client"
import axiosInstance from '../axiosConfig';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

//function to fetch the current logged in user
// export async function getCurrentUser() {
//     // const navigate = useRouter();
//     try {
//         const response = await axiosInstance.get("http://127.0.0.1:3000/me")
//         const user = response.data;
//         console.log(user);
//         return user;
//     } catch (error) {
//         console.error(error);
//         // navigate.replace('/login');

//     }
// }
//function to retrive user from session storage
export function getCurrentUser() {
    let userData;
    if (typeof window !== "undefined") {
      try {
        userData = sessionStorage.getItem("user");
        userData = userData ? JSON.parse(userData) : null;
      } catch (error) {
        console.error("Error parsing stored userData:", error);
        userData = null;
      }
    }
    return userData;
  }
  
//function to logout the user and clear the cookies
  export function clearCurrentUser() {
    fetch("http://127.0.0.1:3000/logout", {
        method: "DELETE"
    }).then(response => console.log(response));
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("user");
    }
  }
// function to register users
export function registerUser(formData, navigate) {
    axiosInstance.post("http://127.0.0.1:3000/signup", formData)
      .then((response) => {
        console.log(response.data); 
          Swal.fire({
            icon: 'success',
            text: 'Registration Successful'
          });
          navigate.replace('/login');
  
      })
      .catch((error) => {
        console.error('Error during user registration:', error);
        handleRegistrationError(error?.response?.data.errors);
      });
  }
  //function to handle registration errors
  function handleRegistrationError(errors) {
   let errorMessage = errors? "": "something went wrong during registration"
    if (Array.isArray(errors)) {
      // If errors is an array, extract and join them with a line break
      errorMessage = errors.map(error => error).join('\n');
    } else if (typeof errors === 'object') {
      // If errors is an object, iterate through its properties
      for (const key in errors) {
        if (Array.isArray(errors[key])) {
          // If the property value is an array, join its contents with a line break
          errorMessage += `\n${key}: ${errors[key].join('\n')}`;
        }
      }
    }
  
    Swal.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: errorMessage
    });
  }

  export async function getCar(id) {
    const res = await fetch(
      `https://explora-cars-production.up.railway.app/cars/${id}`
    );
    if (!res.ok) throw new Error("Failed to fetch car");
  
    return res.json();
  }