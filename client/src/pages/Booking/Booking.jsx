import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const Booking = () => {
  const location = useLocation();
  const { id, name, price, location: carLocation, description, image } = location.state;
  const { url } = useContext(StoreContext);

  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');
  const [directionsResponse, setDirectionsResponse] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookNow = () => {
    const totalAmount = price + (price * 0.18);
    console.log({
      id, name, price, carLocation, description, image,
      pickupLocation, dropoffLocation, pickupDate, pickupTime, dropoffDate, dropoffTime,
      totalAmount
    });
    // Add booking logic here
  };

  const handleDirectionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirectionsResponse(response);
      } else {
        console.log('response: ', response);
      }
    }
  };

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden flex">
        <div className="w-1/2 p-4">
          <img src={url + "/images/" + image} alt={name} className="w-full h-64 object-cover mb-4" />
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          <p className="text-gray-700 mb-2">{description}</p>
          <p className="text-blue-500 font-medium mb-2">Car Rental Fee: Rs. {price}</p>
          <p className="text-blue-500 font-medium mb-2">Total Amount: Rs. {(price + (price * 0.18)).toFixed(2)}</p>
          <p>Included in price: Tax 18%</p>
          <input
            type="text"
            placeholder="From Place"
            className="w-full p-2 mb-2 border rounded"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="To Place"
            className="w-full p-2 mb-2 border rounded"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
          />
          <input
            type="date"
            className="w-full p-2 mb-2 border rounded"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
          <input
            type="time"
            className="w-full p-2 mb-2 border rounded"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          />
          <input
            type="date"
            className="w-full p-2 mb-2 border rounded"
            value={dropoffDate}
            onChange={(e) => setDropoffDate(e.target.value)}
          />
          <input
            type="time"
            className="w-full p-2 mb-2 border rounded"
            value={dropoffTime}
            onChange={(e) => setDropoffTime(e.target.value)}
          />
          <button
            onClick={handleBookNow}
            className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-400"
          >
            Book Now
          </button>
        </div>
        <div className="w-1/2 h-full">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              {pickupLocation && dropoffLocation && (
                <DirectionsService
                  options={{
                    destination: dropoffLocation,
                    origin: pickupLocation,
                    travelMode: 'DRIVING'
                  }}
                  callback={handleDirectionsCallback}
                />
              )}
              {directionsResponse && (
                <DirectionsRenderer
                  options={{
                    directions: directionsResponse
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default Booking;

