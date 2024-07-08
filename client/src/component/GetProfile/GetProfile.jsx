import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetProfile = ({ url }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${url}/api/user/get-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Error fetching user details');
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [url]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No User details available</div>;

  return (
    <div className='flex flex-row'>
    <div className='w-[20%] ml-20 mt-12 text-[#474747] text-base bg-blue-100 p-4 rounded-md flex flex-col'>
      <div className="flex justify-center items-center m-4">
          {user.image && <img className='w-32 rounded-full border border-blue-500' src={`${url}/${user.image}`} alt="User Profile" />}
      </div>
      <div className='m-4'>
        <p><strong>Name:</strong> {user.name}</p>
      </div>
      <div className='m-4'>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className='m-4'>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
      <div className='flex justify-center items-center m-4'>
        <button className='bg-blue-600 text-white px-4 py-2 rounded-md'>Edit Profile</button>
      </div>
    </div>
    <div className='w-[20%] ml-20 mt-12 text-[#474747] text-base bg-blue-100 p-4 rounded-md flex flex-col'>
      <div className="flex justify-center items-center m-4">
          {user.image && <img className='w-32 rounded-full border border-blue-500' src={`${url}/${user.image}`} alt="User Profile" />}
      </div>
      <div className='m-4'>
        <p><strong>Name:</strong> {user.name}</p>
      </div>
      <div className='m-4'>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className='m-4'>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
      <div className='flex justify-center items-center m-4 gap-4'>
        <button className='bg-blue-600 text-white px-4 py-2 rounded-md'>Update</button>
        <button className='bg-blue-600 text-white px-4 py-2 rounded-md'>Cancel</button>
      </div>
    </div>
    </div>
  );
};

export default GetProfile;
