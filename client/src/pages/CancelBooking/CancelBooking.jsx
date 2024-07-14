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
            <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="phone" type='tel' placeholder='Phone' readOnly/>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="from" type='text' placeholder='From place' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="to" type='text' placeholder='To place' required/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="pickupdate" type='date' placeholder='PickUpDate' readOnly/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="dropoffdate" type='date' placeholder='DropOffDate' readOnly/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="pickuptime" type='time' placeholder='PickUpTime' readOnly/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="dropofftime" type='time' placeholder='DropOffTime' readOnly/>
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
    </form>
    </div>
  )
}

export default CancelBooking