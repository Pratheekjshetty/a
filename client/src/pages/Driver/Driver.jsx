import React from 'react'

const Driver = () => {
  return (
    <form  className='flex flex-wrap justify-between items-start gap-[50px] my-24 mx-20'>
        <div className='flex-1 p-[2.5] w-full max-w-[max(30%,500px)]'>
            <p className='text-[30px] font-semibold mb-[50px]'>Apply As a Driver</p>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="firstName" type='text' placeholder='First name' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="lastName" type='text' placeholder='Last name' required/>
            </div>
            <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="email" type='email' placeholder='Email address' readOnly/>
            <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="phone" type='tel' placeholder='Phone' readOnly/>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="dob" type='date' placeholder='Date of Birth' required onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = e.target.value ? 'date' : 'text')}/>
            </div>
            <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="street" type='text'   placeholder='Street address' required/>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="city" type='text'  placeholder='City' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="state" type='text'  placeholder='State' required/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="zipcode" type='text'  placeholder='Zip code' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="country" type='text'   placeholder='Country' required/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="alemail" type='email' placeholder='Alternate Email' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="alphone" type='tel' placeholder='Altenate Phone' required/>
            </div>
        </div>
        <div className='flex-1 p-[2.5] w-full max-w-[max(30%,500px)]'>
            <p className='text-[25px] font-semibold mb-[30px]'>Additional Information</p>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="adharnumber" type='number' placeholder='Adhar Number' required/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="licencenumber" type='number' placeholder='Driving Licence' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="expiredate" type='date' placeholder='Licence Expire Date' required onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = e.target.value ? 'date' : 'text')}/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="experience" type='text' placeholder='Years of Driving Experience' required />
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="reference" type='tel' placeholder='Reference Contact' required />
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="language" type='text' placeholder='Mother Tongue' required />
                <select className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="availability" required>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                </select>
            </div>
            <div className='flex gap-[10px]'>
              <label className='mb-[15px] text-sm w-full'>
                <span className='block mb-2'>Upload Driver's License:</span>
                <input className='w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="driversLicense" type='file' accept="image/*" required />
              </label>
            </div>
            <div className='flex gap-[10px]'>
              <label className='mb-[15px] text-sm w-full'>
                <span className='block mb-2'>Upload Proof of Address:</span>
                <input className='w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="proofOfAddress" type='file' accept="image/*" required />
              </label>
            </div>
            <button type='submit' className='mt-4 text-sm bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-400'>Submit</button>
        </div>
    </form>
  )
}

export default Driver