import React, { useCallback, useState, useEffect } from 'react';
import apply_icon from '../../assets/apply_icon.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import Confirmation from '../../components/Confirmation/Confirmation';

const Apply = ({ url }) => {
  const [applications, setApplications] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1);
  const [statuses, setStatuses] = useState({});
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [action, setAction] = useState(null);
  const itemsPerPage = 5;

  const fetchApplications = useCallback(async () => {
    try {
        const response = await axios.get(`${url}/api/driver/applications`);
        const reversedApplications = response.data.reverse();
        setApplications(reversedApplications);
        const newStatuses = {};
        reversedApplications.forEach(app => {
        newStatuses[app.userId] = app.status;
      });
      setStatuses(newStatuses);
    } catch (err) {
      toast.error("An error occurred while fetching applications");
      console.error(err);
    }
  }, [url]);

  const updateStatus = async (userId, status) => {
    try {
      const endpoint = status === 'Driver Confirmed'
        ? `${url}/api/driver/update-role`
        : `${url}/api/driver/delete-role`;

      await axios.post(endpoint, { userId });
      toast.success(`Driver application ${status === 'Driver Confirmed' ? 'accepted' : 'rejected'} successfully`);
      setStatuses(prev => ({ ...prev, [userId]: status }));
    } catch (err) {
      console.error(`Error updating driver status: ${status}`, err);
      toast.error(`Failed to update driver status`);
    }
  };

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

  const handleActionClick = (application, actionType) => {
    setSelectedApplication(application);
    setAction(actionType);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (selectedApplication) {
      updateStatus(selectedApplication.userId, action);
    }
    setShowConfirmation(false);
    setSelectedApplication(null);
    setAction(null);
  };

  const groupApplicationsByDate = (applications) => {
    return applications.reduce((groups, application) => {
      const date = new Date(application.date).toISOString().split('T')[0]; // Extract date part
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(application);
      return groups;
    }, {});
  };

  const groupedApplications = groupApplicationsByDate(currentItems);

  return (
    <div className="mx-20 my-12">
      <h2 className="text-2xl font-bold">Driver Applications</h2>
      <div className='flex flex-col gap-5 mt-7'>
      {Object.entries(groupedApplications).map(([date, applications]) => (
        <div key={date}>
        <h3 className='text-xl font-semibold'>{formatDate(date)}</h3>
        {applications.map((application) => {
          const status = statuses[application.userId];
          return (
            <div key={application._id} className='grid grid-cols-[1fr_2fr_2fr] items-center gap-5 text-sm p-2.5 px-5 text-gray-500 border border-blue-500 md:grid-cols-[1fr_2fr_2fr_1fr] md-gap-4 lg:grid-cols-[1fr_2fr_2fr_1fr_1fr] xl:grid-cols-[1fr_2fr_2fr_1fr_1fr_1fr_1fr]'>
              <img className='w-12' src={apply_icon} alt="" />
              <div>
                <p className='mt-2 mb-1'>{application.address.firstName} {application.address.lastName}</p>
                <p>{application.address.email}</p>
                <p>{application.address.phone}</p>
              </div>
              <div>
                <p className='mt-2 mb-1'>{application.licencenumber}</p>
                <p>{formatDate(application.expiredate)}</p>
                <p>{application.preferredLocation + ", " + application.experience + " years"}</p>
              </div>
              <p>{application.availability}</p>
              <p>{application.preferredLocation}</p>
              <button className={`p-2 outline-none ${status === 'Driver Confirmed' ? 'bg-green-200 border border-green-500' : 'bg-blue-200 border border-blue-500'} transform transition-transform duration-300 hover:scale-105`}
                onClick={() => handleActionClick(application, 'Driver Confirmed')}>Accept</button>
              <button className={`p-2 outline-none ${status === 'Driver Rejected' ? 'bg-orange-200 border border-orange-500' : 'bg-red-200 border border-red-500'} transform transition-transform duration-300 hover:scale-105`}
                onClick={() => handleActionClick(application, 'Driver Rejected')}>Reject</button>
            </div>
          )
        })}
        </div>
        ))}
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
      <Confirmation
        show={showConfirmation}
        message={`Are you sure you want to ${action === 'Driver Confirmed' ? 'accept' : 'reject'} this application?`}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirmation(false)}
      />
    </div>
  )
}

export default Apply;
