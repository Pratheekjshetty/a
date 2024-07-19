import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const Driver = () => {
  const { token, url } = useContext(StoreContext);

  const [user, setUser] = useState({
    userId:'',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [data, setData] = useState({
    userId:'',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    alemail: '',
    alphone: '',
    adharnumber: '',
    licencenumber: '',
    expiredate: '',
    experience: '',
    reference: '',
    language: '',
    availability: '',
    preferredLocation: '',
    driversLicense: null,
    proofOfAddress: null,
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
          const { userId, name, email, phone } = response.data.user;

          const splitName = name.split(' ');
          const firstName = splitName[0];
          const lastName = splitName.slice(1).join(' ');

          setUser({ userId, firstName, lastName, email, phone });
          setData((prevData) => ({
            ...prevData,
            userId,
            firstName,
            lastName,
            email,
            phone,
          }));
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (token) {
      fetchUserDetails();
    }
  }, [token, url]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const checkLicenseExpiry = (expireDate) => {
    const today = new Date();
    const expiryDate = new Date(expireDate);
    const sixMonthsLater = new Date(today.setMonth(today.getMonth() + 6));
    return expiryDate < sixMonthsLater;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const age = calculateAge(data.dob);

    if (age < 21) {
      alert('You are not eligible to apply as a driver.');
      return;
    }

    if (checkLicenseExpiry(data.expiredate)) {
      alert('Update your driving license before you apply as a driver.');
      return;
    }

    if (data.adharnumber.length !== 12) {
      alert('Aadhar number must be 12 digits long.');
      return;
    }

    if (data.licencenumber.length !== 16) {
      alert('License number must be 16 characters long.');
      return;
    }

    if (!isValidEmail(data.alemail)) {
      alert('Please enter a valid alternate email address.');
      return;
    }

    if (!isValidPhoneNumber(data.alphone)) {
      alert('Please enter a valid alternate phone number.');
      return;
    }

    if (!isValidPhoneNumber(data.reference)) {
      alert('Please enter a valid reference phone number.');
      return;
    }

    try {
      const formData = new FormData();
      Object.entries({ ...data, userId: user.userId }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(`${url}/api/driver/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success('Application submitted successfully');
      } else {
        toast.error(response.data.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error submitting application');
      }
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <form onSubmit={handleSubmit} className='flex flex-wrap justify-between items-start gap-[50px] my-24 mx-20'>
      <div className='flex-1 p-[2.5] w-full max-w-[max(30%,500px)]'>
          <p className='text-[30px] font-semibold mb-[50px]'>Apply As a Driver</p>
          <div className='flex gap-[10px]'>
              <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="text" name="firstName" value={data.firstName} placeholder="First Name" onChange={handleChange} required/>
              <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="text" name="lastName" value={data.lastName} placeholder="Last Name" onChange={handleChange} required/>
          </div>
          <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="email" name="email" value={user.email} placeholder="Email" readOnly/>
          <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="tel" name="phone" value={user.phone} placeholder="Phone" readOnly/>
          <div className='flex gap-[10px]'>
              <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="date" name="dob" value={data.dob} placeholder="Date of Birth" onChange={handleChange} required/>
              <select className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="gender" value={data.gender} onChange={handleChange} required>
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
          </div>
          <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="text" name="street" value={data.street} placeholder="Street Address" onChange={handleChange} required/>
          <div className='flex gap-[10px]'>
              <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="text" name="city" value={data.city} placeholder="City" onChange={handleChange} required />
              <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="text" name="state" value={data.state} placeholder="State" onChange={handleChange} required/>
          </div>
          <div className='flex gap-[10px]'>
              <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="text" name="zipcode" value={data.zipcode} placeholder="Zip Code" onChange={handleChange} required/>
              <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="text" name="country" value={data.country} placeholder="Country" onChange={handleChange} required/>
          </div>
          <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="email" name="alemail" value={data.alemail} placeholder="Alternate Email" onChange={handleChange} required/>
          <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="tel" name="alphone" value={data.alphone} placeholder="Alternate Phone" onChange={handleChange} required/>
      </div>
      <div className='flex-1 p-[2.5] w-full max-w-[max(30%,500px)]'>              
          <p className='text-[25px] font-semibold mb-[30px]'>Additional Information</p>
          <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' type="number" name="adharnumber" value={data.adharnumber} placeholder="Adhar Number" onChange={handleChange} required/>
          <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="text" name="licencenumber" value={data.licencenumber} placeholder="Driving Licence Number" onChange={handleChange} required/>
          <div className='flex gap-[10px]'>
              <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="date" name="expiredate" value={data.expiredate} placeholder="Licence Expire Date" onChange={handleChange} required/>
              <select className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="preferredLocation" onChange={handleChange} value={data.preferredLocation} required>
                  <option value="" disabled>Preferred Location</option>
                  <option value="Manglore">Manglore</option>
                  <option value="Bantwal">Bantwal</option>
                  <option value="Puttur">Puttur</option>
              </select>
          </div>
          <div className='flex gap-[10px]'>
              <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="text" name="experience" value={data.experience} placeholder="Years of Driving Experience" onChange={handleChange} required/>
              <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="number" name="reference" value={data.reference} placeholder="Reference Contact" onChange={handleChange} required/>
          </div>
          <div className='flex gap-[10px]'>
              <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' type="text" name="language" value={data.language} placeholder="Mother Tongue" onChange={handleChange} required/>
              <select className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="availability" onChange={handleChange} value={data.availability} required>
                  <option value="" disabled>Select Availability</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
              </select>
          </div>
          <div className='flex gap-[10px]'>
            <label className='mb-[15px] text-sm w-full'>
                <span className='block mb-2'>Upload Driver's License:</span>
                <input className='w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="driversLicense" type='file' accept="image/*" onChange={handleFileChange} required/>
            </label>
          </div>
          <div className='flex gap-[10px]'>
            <label className='mb-[15px] text-sm w-full'>
                <span className='block mb-2'>Upload Proof of Address:</span>
                <input className='w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500 mt-3' name="proofOfAddress" type='file' accept="image/*" onChange={handleFileChange} required/>
            </label>
          </div>
          <button className='mt-4 text-sm bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-400' type="submit">Submit</button>
      </div>
    </form>
  );
};
export default Driver;
