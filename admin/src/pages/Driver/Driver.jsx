import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Confirmation from  '../../components/Confirmation/Confirmation';

const DriverPage = ({ url }) => {
  const [drivers, setDrivers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchDrivers = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/user/list-users/driver`);
      if (response.data.success) {
        setDrivers(response.data.users);
      } else {
        toast.error('Failed to fetch drivers');
      }
    } catch (err) {
      toast.error('An error occurred while fetching drivers');
      console.error(err);
    }
  }, [url]);

  const deactivateDriver = async () => {
    try {
      const response = await axios.put(`${url}/api/user/deactivate/${selectedDriver}`);
      if (response.data.success) {
        toast.success('Driver deactivated successfully');
        fetchDrivers(); // Refresh the driver list after deactivation
        setShowModal(false);
      } else {
        toast.error('Failed to deactivate driver');
      }
    } catch (err) {
      toast.error('An error occurred while deactivating the driver');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const handleDeleteClick = (driverId) => {
    setSelectedDriver(driverId);
    setShowModal(true);
  };

  const totalPages = Math.ceil(drivers.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = drivers.slice(startIdx, endIdx);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="mx-20 my-12">
      <h2 className="text-2xl font-bold">Drivers Page</h2>
      <div className="flex flex-col gap-5 mt-7">
        {currentItems.map((driver, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_1fr] items-center gap-5 text-sm p-2.5 px-5 text-gray-500 border border-blue-500 sm:grid-cols-[1fr_1fr_1fr]  md:grid-cols-[1fr_1fr_1fr_1fr] md-gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr_0.5fr]">
            <img className="w-16" src={`${url}/${driver.image}`} alt="Driver Icon" />
            <p className="mt-2 mb-1">{driver.name}</p>
            <p>{driver.email}</p>
            <p>{driver.phone}</p>
            <p className="cursor-pointer" onClick={() => handleDeleteClick(driver._id)}>
              <FaTrash />
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <Confirmation
        show={showModal}
        message="Are you sure you want to deactivate this driver?"
        onConfirm={deactivateDriver}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default DriverPage;
