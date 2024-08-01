import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import contactus from '../../assets/contactus.jpg';
import { toast } from 'react-toastify'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const {url}= useContext(StoreContext);

  useEffect(() => {
    // Fetch user details using the token
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${url}/api/user/get-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            name: response.data.user.name,
            email: response.data.user.email,
          }));
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error('Error fetching user details');
      }
    };

    fetchUserDetails();
  }, [url]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to send a message.');
      return;
    }
    try {
      const response = await fetch(`${url}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Failed to send message.');
      }
    } catch (error) {
      toast.error('Error sending message');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className='flex flex-row justify-center items-center h-screen'
      style={{ backgroundImage: `url(${contactus})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <form className='bg-white p-6 rounded-lg shadow-lg' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold mb-4'>Contact Us</h2>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name</label>
          <input type='text'id='name' name='name' value={formData.name} onChange={handleChange}className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500'required/>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
          <input type='email'id='email' name='email' value={formData.email}onChange={handleChange}className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500' readOnly/>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='message'>Message</label>
          <textarea id='message'
            name='message' value={formData.message} onChange={handleChange} className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500' rows='4' required/>
        </div>
        <button type='submit' className='w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600'>Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
