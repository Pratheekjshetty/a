import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Confirmation from  '../../components/Confirmation/Confirmation';

const UserPage = ({ url }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/user/list-users/user`);
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (err) {
      toast.error('An error occurred while fetching users');
      console.error(err);
    }
  }, [url]);

  const deactivateUser = async () => {
    try {
      const response = await axios.put(`${url}/api/user/deactivate/${selectedUser}`);
      if (response.data.success) {
        toast.success('User deactivated successfully');
        fetchUsers(); // Refresh the user list after deactivation
        setShowModal(false);
      } else {
        toast.error('Failed to deactivate user');
      }
    } catch (err) {
      toast.error('An error occurred while deactivating the user');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteClick = (userId) => {
    setSelectedUser(userId);
    setShowModal(true);
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = users.slice(startIdx, endIdx);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  return (
    <div className="mx-20 my-12">
      <h2 className="text-2xl font-bold">Users Page</h2>
      <div className="flex flex-col gap-5 mt-7">
        {currentItems.map((user, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_1fr] items-center gap-5 text-sm p-2.5 px-5 text-gray-500 border border-blue-500 sm:grid-cols-[1fr_1fr_1fr]  md:grid-cols-[1fr_1fr_1fr_1fr] md-gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr_0.5fr]">
            <img className="w-16" src={`${url}/${user.image}`} alt="User Icon" />
            <p className="mt-2 mb-1">{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p className="cursor-pointer" onClick={() => handleDeleteClick(user._id)}>
              <FaTrash />
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        {Array.from({ length: endPage - startPage + 1}, (_, index) => (
          <button
            key={index + startPage}
            className={`page-button ${currentPage === index + startPage? 'active' : ''}`}
            onClick={() => handlePageChange(index + startPage)}>
            {index + startPage}
          </button>
        ))}
      </div>
      <Confirmation
        show={showModal}
        message="Are you sure you want to deactivate this user?"
        onConfirm={deactivateUser}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default UserPage;
