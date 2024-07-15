import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify'

const CancelBooking = () => {
  const location = useLocation();
  const { url } = useContext(StoreContext);
    const { firstName, lastName, email, phone, bookingId, date } = location.state;
    const [reason, setReason] = useState('');

    const getFormatDate = (isoDate) => {
      const date = new Date(isoDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

  const formatDate = getFormatDate(date);
  const currentDate = getCurrentDate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url +"/api/cancel/cancel-booking", {
        firstName,
        lastName,
        booking_id: bookingId,
        email,
        phone,
        reason,
        booking_date: formatDate,
        current_date: currentDate
      });
      toast.success('Booking cancellation request submitted successfully!');
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      toast.error('Failed to submit cancellation request.');
    }
  };
  return (
        <form onSubmit={handleSubmit} className='flex flex-wrap justify-center item-center gap-[50px] my-24 mx-20'>
        <div className='flex-1 p-[2.5] w-full max-w-[max(40%,500px)]'>
            <p className='text-[30px] font-semibold mb-[50px]'>Cancel Booking</p>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="firstName" type='text' value={firstName} placeholder='First name' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="lastName" type='text' value={lastName} placeholder='Last name' required/>
            </div>
            <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="booking_id" type='text' value={bookingId} placeholder='Booking Id' readOnly/>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="email" type='email' value={email} placeholder='Email address' readOnly/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="phone" type='tel' value={phone} placeholder='Phone Number' readOnly/>
            </div>
            <textarea className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' rows="4" name="reason" placeholder='Reason for Cancellation' value={reason} onChange={(e) => setReason(e.target.value)} required></textarea>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="booking-date" type='date' value={formatDate} placeholder='Booking Date' readOnly/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="current-date" type='date' value={currentDate} placeholder='Current Date' readOnly/>
            </div>
            <button type='submit' className='mt-4 text-sm bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-400'>Submit</button>
        </div>
    </form>
  )
}

export default CancelBooking