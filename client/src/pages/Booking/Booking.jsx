import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Booking = () => {
  const location = useLocation();
  const { id, name, price, location: carLocation, description, image } = location.state;
  const { url } = useContext(StoreContext);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');
  const [driverRequired, setDriverRequired] = useState(false);
  const [totalHours, setTotalHours] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculateTotalHours = useCallback(() => {
    const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
    const dropoffDateTime = new Date(`${dropoffDate}T${dropoffTime}`);
    const hours = (dropoffDateTime - pickupDateTime) / 36e5;
    return hours > 0 ? hours : 0;
  }, [pickupDate, pickupTime, dropoffDate, dropoffTime]);

  const calculateTotal = useCallback(() => {
    const hours = calculateTotalHours();
    setTotalHours(hours);
    const driverCost = driverRequired ? 50 : 0;
    const total = hours * price + driverCost;
    setTotalAmount(total.toFixed(2));
  }, [calculateTotalHours, driverRequired, price]);

  useEffect(() => {
    calculateTotal();
  }, [pickupDate, pickupTime, dropoffDate, dropoffTime, driverRequired, calculateTotal]);

  const handleBookNow = () => {
    console.log({
      id, name, price, carLocation, description, image,
      pickupDate, pickupTime, dropoffDate, dropoffTime,
      totalAmount
    });
    // Add booking logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl mx-auto p-4 bg-white shadow-none rounded-lg mt-4">
        <div className="w-full h-auto md:h-96">
          <img src={url + "/images/" + image} alt={name} className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-1/2 p-4 flex-grow">
            <h2 className="text-2xl font-bold mb-2">{name}</h2>
            <p className="text-gray-700 mb-2">{description}</p>
          </div>
          <div className="w-full md:w-1/2 p-4 flex-grow">
            <input type="date" className="w-full p-2 mb-2 border rounded" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)}/>
            <input type="time" className="w-full p-2 mb-2 border rounded" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}/>
            <input type="date" className="w-full p-2 mb-2 border rounded" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)}/>
            <input type="time" className="w-full p-2 mb-2 border rounded" value={dropoffTime} onChange={(e) => setDropoffTime(e.target.value)}/>
            <p>Total Hours: {totalHours}</p>
            <p>Rent Per Hour: Rs. {price}</p>
            <div className="flex items-center mb-4">
              <input type="checkbox" id="driverRequired" className="mr-2" checked={driverRequired} onChange={() => setDriverRequired(!driverRequired)}/>
              <label htmlFor="driverRequired">Driver required (+Rs. 50)</label>
            </div>
            <p>Total: Rs. {totalAmount}</p>
            <button onClick={handleBookNow} className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-400">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
