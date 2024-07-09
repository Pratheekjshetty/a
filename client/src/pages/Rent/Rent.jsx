import React from 'react'
import { useLocation } from 'react-router-dom';

const Rent = () => {
    const location = useLocation();
  const {
    subtotal, driverFee, totalAmount,
    pickupDate, pickupTime, dropoffDate, dropoffTime
  } = location.state;
  return (
    <form className='flex flex-wrap justify-between items-start gap-[50px] my-24 mx-20'>
        <div className='flex-1 p-[2.5] w-full max-w-[max(30%,500px)]'>
            <p className='text-[30px] font-semibold mb-[50px]'>Booking Information</p>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="fname" type='text' placeholder='First name' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="lname" type='text' placeholder='Last name' required/>
            </div>
            <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="email" type='email' placeholder='Email address' required/>
            <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="phone" type='tel' placeholder='Phone' required/>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="from" type='text' placeholder='From place' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="to" type='text' placeholder='To place' required/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="pickupdate" type='date' value={pickupDate} placeholder='PickUpDate' readOnly/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="dropoffdate" type='date' value={dropoffDate} placeholder='DropOffDate' readOnly/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="pickuptime" type='time' value={pickupTime} placeholder='PickUpTime' readOnly/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="dropofftime" type='time' value={dropoffTime} placeholder='DropOffTime' readOnly/>
            </div>
            <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="street" type='text' placeholder='Street address' required/>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="city" type='text' placeholder='City' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="state" type='text' placeholder='State' required/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="zipcode" type='text' placeholder='Zip code' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="country" type='text' placeholder='Country' required/>
            </div>
        </div>
        <div className='flex-1 p-[2.5] w-full max-w-[max(30%,500px)]'>
            <div>
                <p className='text-[25px] font-semibold mb-[30px]'>Rent Total</p>
                <div className='flex justify-between my-5'>
                    <p>SubTotal</p>
                    <p className='font-semibold'>₹ {subtotal}</p>
                </div>
                <hr className="border-0 bg-gray-400" style={{ height:'0.5px'}}/>
                <div className='flex justify-between my-5'>
                    <p>Driver Fee</p>
                    <p className='font-semibold'>₹ {driverFee}</p>
                </div>
                <hr className="border-0 bg-gray-400" style={{ height:'0.5px'}}/>
                <div className='flex justify-between my-5'>
                    <b>Total</b>
                    <b className='font-semibold'>₹ {totalAmount}</b>
                </div>
                <button className='mt-4 text-sm bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-400'>Proceed To Payment</button>
            </div>
        </div>
    </form>
  )
}

export default Rent