import React, { useCallback, useEffect, useState } from 'react'
import rental_icon from '../../assets/rental_icon.png'
import axios from 'axios';
import {toast} from "react-toastify"

const Booking = ({url}) => {
  const [booking,setBooking] =useState([]);

  const fetchAllBooking =useCallback(async()=>{
    try {
      const response = await axios.get(url + "/api/book/listbooking");
      if (response.data.success) {
        setBooking(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Failed to fetch booking");
      }
    } 
    catch (err) {
      toast.error("An error occurred while fetching booking");
      console.error(err);
    }
  },[url]);

  useEffect(()=>{
    fetchAllBooking();
  },[fetchAllBooking])

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className='mx-20 my-12'>
      <h2 className='text-2xl font-bold'>Booking Page</h2>
      <div className='flex flex-col gap-5 mt-7'>
        {booking.map((rent,index)=>{
          return(
            <div className='grid grid-cols-[1fr_3fr_1fr] items-center gap-5 text-sm p-2.5 px-5 text-gray-500 border border-blue-500 sm:grid-cols-[1fr_3fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] md-gap-4 lg:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] xl:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr]'>
              <img className='w-16' src={rental_icon} alt=""/>
              <div>
                <p className='mt-2 mb-1'>{rent.address.firstName+" "+rent.address.lastName}</p>
                <div className='mb-2'>
                  <p>{rent.address.street+","}</p>
                  <p>{rent.address.city+", "+rent.address.state+", "}</p>
                  <p>{rent.address.country+", "+rent.address.zipcode}</p>
                </div>
                <p>{rent.address.phone}</p>
              </div>
              <p>{rent.caritem.name}</p>
              <img className='w-14' src={url+"/images/"+rent.caritem.image} alt="carImage"/>
              <p>₹ {rent.amount}.00</p>
              <p>{formatDate(rent.pickupdate)}</p>
              <p>{formatDate(rent.dropoffdate)}</p>
              <p><span className='text-blue-500'>&#x25cf;</span> <b>{rent.status}</b></p>
            </div>
          ) 
       })}
      </div>   
    </div>
  )
}

export default Booking