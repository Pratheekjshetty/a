import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const location = useLocation();
  const { id, name, price, location: carLocation, description, image, model, color, seats } = location.state;
  const { url,bookingList } = useContext(StoreContext);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');
  const [driverRequired, setDriverRequired] = useState(false);
  const [totalHours, setTotalHours] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [driverFee, setDriverFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState('');
  const navigate=useNavigate();

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
    let driverCost = 0;
    if (driverRequired) {
      driverCost = 600 * Math.ceil(hours / 24);
    }
    else if (deliveryOption === 'yourLocation') {
      driverCost += 600;
    }
    const subtotalAmount = hours * price;
    const total = hours * price + driverCost;
    setSubtotal(subtotalAmount.toFixed(2));
    setDriverFee(driverCost.toFixed(2));
    setTotalAmount(total.toFixed(2));
  }, [calculateTotalHours, driverRequired, price, deliveryOption]);

  useEffect(() => {
    calculateTotal();
  }, [pickupDate, pickupTime, dropoffDate, dropoffTime, driverRequired, calculateTotal]);

  const isCarBooked = useCallback(() => {
    if (!pickupDate || !dropoffDate) return false;
    return bookingList.some(booking => {
      return booking.carItemId === id && booking.status === "Car Booked" &&
        new Date(pickupDate) <= new Date(booking.dropoffDate) &&
        new Date(dropoffDate) >= new Date(booking.pickupDate);
    });
  }, [bookingList, id, pickupDate, dropoffDate]);

  const handleBookNow = (event) => {
    event.preventDefault();
    if (isCarBooked()) {
      alert("The car is already booked during the selected dates.");
    } else {
      const form = event.target;
      if (form.checkValidity()) {
        navigate('/rent', {
          state: {
            id, name, price, carLocation, description, image, model, color, seats,
            pickupDate, pickupTime, dropoffDate, dropoffTime, subtotal, driverFee, totalAmount,
            deliveryOption
          }
        });
      } else {
        form.reportValidity();
      }
    }
  };

  const handleExploreBlog = (event) => {
    navigate('/blogs', {
      state: {
        id, name, price, carLocation, description, image, model, color, seats}
      });
  }

  const handleRadioChange = (event) => {
    setDeliveryOption(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl mx-auto p-4 bg-white shadow-none rounded-lg my-4 ">
        <div className="w-full h-auto md:h-96">
          <img src={url + "/images/" + image} alt={name} className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-1/2 p-4 flex-grow">
            <h2 className="text-2xl font-bold mb-2">{name}</h2>
            <p className="text-gray-700 mb-2">{description}</p>
            <span>Model:</span><span className='font-semibold'> {model}</span><br/>
            <span>Color:</span><span className='font-semibold'> {color}</span><br/>
            <span>No of seat:</span><span className='font-semibold'> {seats}</span><br/>
            <span>Location:</span><span className='font-semibold'> {carLocation}</span><br/>
            <button onClick={handleExploreBlog} className='text-sm bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-400 mt-5'>Explore Blogs</button>
          </div>
          <div className="w-full md:w-1/2 p-4 flex-grow">
          <form onSubmit={handleBookNow}>
            <input type="date" className="w-full p-2 mb-2 border rounded outline-blue-500" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required/>
            <input type="time" className="w-full p-2 mb-2 border rounded outline-blue-500" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required/>
            <input type="date" className="w-full p-2 mb-2 border rounded outline-blue-500" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} required/>
            <input type="time" className="w-full p-2 mb-2 border rounded outline-blue-500" value={dropoffTime} onChange={(e) => setDropoffTime(e.target.value)} required/>
            <span>Total Hours:</span><span className='font-semibold'> {totalHours}</span><br/>
            <span>Rent Per Hour: </span><span className='font-semibold'> ₹ {price}</span><br/>
            <p>SubTotal:<span className='font-semibold'>₹ {subtotal}</span></p>
            <hr className="border-0 bg-gray-400 my-5" style={{ height:'0.5px'}}/>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="driverRequired" className="mr-2" checked={driverRequired} onChange={() => setDriverRequired(!driverRequired)}/>
              <label htmlFor="driverRequired">Driver required</label>
            </div>
            {!driverRequired && (
            <div>
                <span>Choose car delivery option:</span><br/>
                <input type="radio" id="branchLocation" name="deliveryOption" value="branch" onChange={handleRadioChange} required />
                <label htmlFor="branchLocation">Branch location</label><br/>
                <input type="radio" id="yourLocation" name="deliveryOption" value="yourLocation" onChange={handleRadioChange} required />
                <label htmlFor="yourLocation">Your location</label><br/>
              </div>
            )}
            <p>Driver Fee: <span className='font-semibold'>₹ {driverFee}</span></p>
            <hr className="border-0 bg-gray-400 my-5" style={{ height:'0.5px'}}/>
            <span>Total:</span><span className='font-semibold'> ₹ {totalAmount}</span>
            <button type='submit' className="text-sm bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-400 mt-5">
              Book Now
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
