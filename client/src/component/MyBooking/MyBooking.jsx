import React, { useCallback, useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import rental_icon from '../../assets/rental_icon.png'
import { useNavigate } from 'react-router-dom';

const MyBooking = () => {
    const {url,token} = useContext(StoreContext);
    const [data,setData] = useState([]);
    const navigate=useNavigate();

    const cancelBooking = () => {
      navigate('/cancel-booking');
    }

    const fetchBooking = useCallback(async ()=>{
      try{
          const response = await axios.post(url+"/api/book/userbooking",{},{headers:{token}});
          setData(response.data.data);
      }
      catch(err){
          console.log(err);
      }    
  },[url, token]);

  useEffect(()=>{
    fetchBooking();
    },[fetchBooking]);

    const formatDate = (dateString) => {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  return (
    <div className='mx-20 my-12'>
      <h2 className='text-2xl font-bold'>My Booking</h2>
      <div className='flex flex-col gap-5 mt-7'>
      {data.map((rent,index)=>{
        return(
          <div className='grid grid-cols-[1fr_0.5fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-7 text-sm p-2.5 px-5 text-gray-500 border border-blue-500 md:grid-cols-[1fr_1fr_1fr_1fr] md-gap-4 lg:grid-cols-[1fr_0.5fr_1fr_1fr_1fr_1fr_1fr_1fr]'>
            <img className='w-16' src={rental_icon} alt=""/>
            <p>{rent.caritem.name}</p>
            <img className='w-14' src={url+"/images/"+rent.caritem.image} alt="carImage"/>
            <p>₹ {rent.amount}.00</p>
            <p>{formatDate(rent.pickupdate)}</p>
            <p>{formatDate(rent.dropoffdate)}</p>
            <p><span className='text-blue-500'>&#x25cf;</span> <b>{rent.status}</b></p>
            <button onClick={cancelBooking} className='border border-none p-2 rounded-sm bg-red-200 cursor-pointer text-gray-500'>Cancel Booking</button>
          </div>
        )  
      })}
      </div>
    </div>
  )
}

export default MyBooking