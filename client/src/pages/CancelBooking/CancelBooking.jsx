import React from 'react'

const CancelBooking = () => {
  return (
    <div>
          <form  className='flex flex-wrap justify-between items-start gap-[50px] my-24 mx-20'>
        <div className='flex-1 p-[2.5] w-full max-w-[max(30%,500px)]'>
            <p className='text-[30px] font-semibold mb-[50px]'>Cancel Booking</p>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="firstName" type='text' placeholder='First name' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="lastName" type='text' placeholder='Last name' required/>
            </div>
            <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="email" type='email' placeholder='Email address' readOnly/>
            <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="booking_id" type='text' placeholder='Booking Id' readOnly/>
            <textarea className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' rows="4" name="reason" placeholder='Reason for CancelBooking' ></textarea>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="city" type='date' placeholder='Booking Date' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="state" type='date' placeholder='Current Date' required/>
            </div>
        </div>
    </form>
    </div>
  )
}

export default CancelBooking