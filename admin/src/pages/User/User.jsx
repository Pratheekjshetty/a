import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const UserList = ({ url }) => {
  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const fetchUsersByRole = useCallback(async (role, setState) => {
    try {
      const response = await axios.get(`${url}/api/user/list-users/${role}`);

      if (response.data.success) {
        setState(response.data.users);
      } else {
        toast.error(`Failed to fetch ${role}s`);
      }
    } catch (err) {
      toast.error(`An error occurred while fetching ${role}s`);
      console.error(err);
    }
  }, [url]);

  const deactivateUser = async (userId) => {
    try {
      const response = await axios.put(`${url}/api/user/deactivate/${userId}`);

      if (response.data.success) {
        toast.success('User deactivated successfully');
        // Refresh the user list after deactivation
        fetchUsersByRole('user', setUsers);
        fetchUsersByRole('driver', setDrivers);
      } else {
        toast.error('Failed to deactivate user');
      }
    } catch (err) {
      toast.error('An error occurred while deactivating the user');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsersByRole('user', setUsers);
    fetchUsersByRole('driver', setDrivers);
  }, [fetchUsersByRole]);

  return (
    <div className="mx-20 my-12">
      <h2 className="text-2xl font-bold">Users Page</h2>
      <div className="flex flex-col gap-5 mt-7">
        {users.map((user, index) => (
          <div key={index} className='grid grid-cols-[1fr_1fr] items-center gap-5 text-sm p-2.5 px-5 text-gray-500 border border-blue-500 sm:grid-cols-[1fr_1fr_1fr]  md:grid-cols-[1fr_1fr_1fr_1fr] md-gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr]'>
            <img className="w-16" src={`${url}/${user.image}`} alt="User Icon" />
            <p className="mt-2 mb-1">{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p className='cursor' onClick={() => deactivateUser(user._id)}><FaTrash /></p>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-10">Drivers Page</h2>
      <div className="flex flex-col gap-5 mt-7">
        {drivers.map((driver, index) => (
          <div key={index} className='grid grid-cols-[1fr_1fr] items-center gap-5 text-sm p-2.5 px-5 text-gray-500 border border-blue-500 sm:grid-cols-[1fr_1fr_1fr]  md:grid-cols-[1fr_1fr_1fr_1fr] md-gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr]'>
            <img className="w-16" src={`${url}/${driver.image}`} alt="Driver Icon" />
            <p className="mt-2 mb-1">{driver.name}</p>
            <p>{driver.email}</p>
            <p>{driver.phone}</p>
            <p className='cursor' onClick={() => deactivateUser(driver._id)}><FaTrash /></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
