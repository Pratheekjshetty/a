import React, { useCallback, useState, useEffect } from 'react'
import apply_icon from '../../assets/apply_icon.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

const Apply = ({ url }) => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchApplications =useCallback(async () => {
    try {
        const response = await axios.get(`${url}/api/driver/applications`);
            const reversedApplications = response.data.reverse();
            setApplications(reversedApplications);
    } catch (err) {
        toast.error("An error occurred while fetching application");
        console.error(err);
    }
}, [url]);

const statusHandler = async (event, userId) => {
    try {
        event.preventDefault();
        await axios.post(`${url}/api/driver/update-role`, { userId });
        toast.success("Driver application accepted successfully");
        fetchApplications(); 
    } catch (err) {
        console.error('Error updating driver status:', err);
        toast.error("Failed to update driver status");
    }
};

const handleReject = async (event, userId) => {
    try {
        event.preventDefault();
       await axios.post(`${url}/api/driver/delete-role`, { userId });
        toast.success("Driver application rejected successfully");
        fetchApplications(); 
    } catch (err) {
        console.error('Error updating driver status:', err);
        toast.error("Failed to update driver status");
    }
};

const handelDelete = async(event, applyId) => {
    try {
        event.preventDefault();
        await axios.delete(`${url}/api/driver/delete-application`, { data: { applyId } });
        toast.success("Driver application deleted successfully");
        fetchApplications();
    } catch (err) {
        console.error('Error rejecting application:', err);
        toast.error("Failed to reject application");
    }
}

useEffect(() => {
  fetchApplications();
}, [fetchApplications]);

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const totalPages = Math.ceil(applications.length / itemsPerPage);
const startIdx = (currentPage - 1) * itemsPerPage;
const endIdx = startIdx + itemsPerPage;
const currentItems = applications.slice(startIdx, endIdx);

const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
};
  return (
      <div className="mx-20 my-12">
          <h2 className="text-2xl font-bold">Driver Applications</h2>
          <div className='flex flex-col gap-5 mt-7'>
              {currentItems.map((application, index) => {
                  return(
                      <div key={application._id} className='grid grid-cols-[1fr_2fr_2fr] items-center gap-5 text-sm p-2.5 px-5 text-gray-500 border border-blue-500 md:grid-cols-[1fr_2fr_2fr_1fr] md-gap-4 lg:grid-cols-[1fr_2fr_2fr_1fr_1fr] xl:grid-cols-[1fr_2fr_2fr_1fr_1fr_1fr_1fr_0.5fr]'>
                        <img className='w-12' src={apply_icon} alt=""/>
                        <div>
                            <p className='mt-2 mb-1'>{application.address.firstName} {application.address.lastName}</p>
                            <p>{application.address.email}</p>
                            <p>{application.address.phone}</p>
                        </div>
                        <div>
                            <p className='mt-2 mb-1'>{application.licencenumber}</p>
                            <p>{formatDate(application.expiredate)}</p>
                            <p>{application.preferredLocation+", "+application.experience+" years"}</p>
                        </div>
                        <p>{application.availability}</p>
                        <p>{formatDate(application.date)}</p>
                        <button className='bg-blue-200 border border-blue-500 p-2 outline-none' onClick={(event) => statusHandler(event, application.userId)}>Accept</button>
                        <button className='bg-red-200 border border-red-500 p-2 outline-none' onClick={(event) => handleReject(event, application.userId)}>Reject</button>
                        <p className='flex justify-center items-center cursor' onClick={(event) => handelDelete(event, application._id)}><FaTrash /></p>
                      </div>
                  )
              })}
          </div>
          <div className="flex justify-center mt-5">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            ))}
        </div>  
      </div>  
  )
}

export default Apply