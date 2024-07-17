import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Driver = () => {
    const {token,url}= useContext(StoreContext);

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      });

      const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob:"",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        alemail: "",
        alphone: "",
        adharnumber: "",
        licencenumber: "",
        expiredate: "",
        experience: "",
        reference: "",
        language: "",
        availability: "",
      });

      useEffect(() => {
        const fetchUserDetails = async () => {
          if (!token) {
            return;
          }
          try {
            const response = await axios.get(`${url}/api/user/get-user`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (response.data.success) {
              const { name, email, phone } = response.data.user;
    
              const splitName = name.split(' ');
              const firstName = splitName[0];
              const lastName = splitName.slice(1).join(' ');
    
              setUser({ firstName, lastName, email, phone });
              setData(data => ({
                ...data,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
              }));
            }
          } catch (err) {
            console.error('Error fetching user details', err);
          }
        };
    
        fetchUserDetails();
      }, [token, url]);
    
      const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
      };
  return (
    <form  className='flex flex-wrap justify-between items-start gap-[50px] my-24 mx-20'>
        <div className='flex-1 p-[2.5] w-full max-w-[max(30%,500px)]'>
            <p className='text-[30px] font-semibold mb-[50px]'>Apply As a Driver</p>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="firstName" type='text' placeholder='First name' onChange={onChangeHandler} value={data.firstName} required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="lastName" type='text' placeholder='Last name' onChange={onChangeHandler} value={data.lastName} required/>
            </div>
            <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="email" type='email' placeholder='Email address' onChange={onChangeHandler} value={user.email} readOnly/>
            <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="phone" type='tel' placeholder='Phone' onChange={onChangeHandler} value={user.phone} readOnly/>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="dob" type='date' placeholder='Date of Birth' onChange={onChangeHandler} value={data.dob} onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = e.target.value ? 'date' : 'text')} required/>
            </div>
            <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="street" type='text' placeholder='Street address' onChange={onChangeHandler} value={data.street} required/>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="city" type='text' placeholder='City' onChange={onChangeHandler} value={data.city} required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="state" type='text'  placeholder='State' onChange={onChangeHandler} value={data.state} required/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="zipcode" type='text' placeholder='Zip code' onChange={onChangeHandler} value={data.zipcode} required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="country" type='text' placeholder='Country' onChange={onChangeHandler} value={data.country} required/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="alemail" type='email' placeholder='Alternate Email' onChange={onChangeHandler} value={data.alemail} required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="alphone" type='tel' placeholder='Altenate Phone' onChange={onChangeHandler} value={data.alphone} required/>
            </div>
        </div>
        <div className='flex-1 p-[2.5] w-full max-w-[max(30%,500px)]'>
            <p className='text-[25px] font-semibold mb-[30px]'>Additional Information</p>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="adharnumber" type='number' placeholder='Adhar Number' onChange={onChangeHandler} value={data.adharnumber} required/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="licencenumber" type='number' placeholder='Driving Licence' onChange={onChangeHandler} value={data.licencenumber} required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="expiredate" type='date' placeholder='Licence Expire Date' onChange={onChangeHandler} value={data.expiredate} onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = e.target.value ? 'date' : 'text')} required/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="experience" type='text' placeholder='Years of Driving Experience' onChange={onChangeHandler} value={data.experience} required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="reference" type='tel' placeholder='Reference Contact' onChange={onChangeHandler} value={data.reference} required/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="language" type='text' placeholder='Mother Tongue' onChange={onChangeHandler} value={data.language} required/>
                <select className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="availability" onChange={onChangeHandler} value={data.availability} required>
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