import React from 'react';
import { Link } from 'react-router-dom';
import carrental from '../../assets/carrental.png';

const Apply = () => {

  const handleBookRideClick = (event) => {
    if (!localStorage.getItem('token')) {
      event.preventDefault();
      alert('Please log in to book a ride.');
    }
  };

  const handleApplyDriverClick = (event) => {
    if (!localStorage.getItem('token')) {
      event.preventDefault();
      alert('Please log in to apply as a driver.');
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-blue-50">
      <div className="relative w-full h-full max-w-3xl max-h-96 ">
        <img src={carrental} alt="Background" className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 m-4 p-4 bg-transparent rounded transform translate-x-8">
          <h2 className="text-xl font-bold">
          <Link to="/book-ride" onClick={handleBookRideClick} className="text-blue-700">
              Book a Ride
          </Link>
          </h2>
          <p className="max-w-xs">Down the street or across the country, find the perfect vehicle for your next adventure.</p>
        </div>
        <div className="absolute bottom-0 right-0 m-4 p-4 bg-transparent rounded transform translate-x-8">
          <h2 className="text-xl font-bold">
          <Link to="/apply-driver" onClick={handleApplyDriverClick} className="text-blue-700">
              Apply as a Driver
          </Link>
          </h2>
          <p className="max-w-xs">Become a driver and earn money by helping others get where they need to go.</p>
        </div>
      </div>
    </div>
  );
};

export default Apply;
