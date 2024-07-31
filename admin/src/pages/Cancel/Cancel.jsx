import React, { useEffect, useState, useCallback } from 'react';
import cancel_icon from '../../assets/cancel_icon.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const Cancel = ({ url }) => {
    const [cancellations, setCancellations] = useState([]);
    const [statuses, setStatuses] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchCancellations = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/api/cancel/cancellations`);
            const reversedCancellations = response.data.reverse();
            setCancellations(reversedCancellations);
            const newStatuses = {};
            reversedCancellations.forEach((cancellation) => {
            newStatuses[cancellation.bookingid] = cancellation.status;
        });
        setStatuses(newStatuses);
        } catch (err) {
            toast.error("An error occurred while fetching cancellations");
            console.error(err);  
        }
    }, [url]);

    const isButtonActive = (pickupDate, pickupTime) => {
        const pickupDateTime = new Date(pickupDate);
        const [hours, minutes] = pickupTime.split(':');
        pickupDateTime.setHours(hours, minutes);
        const currentTime = new Date();
        const timeDifference = pickupDateTime - currentTime;
        return timeDifference > 10 * 60 * 1000; // 10 minutes
    };

    const statusHandler = async (event, bookingid, pickupDate, pickupTime) => {
        event.preventDefault();
        if (!isButtonActive(pickupDate, pickupTime)) {
            toast.error("Accept action is not allowed within 10 minutes of pickup time.");
            return;
        }
        try {
            await axios.post(`${url}/api/cancel/update-status`, { bookingid });
            toast.success("Booking status updated successfully");
            fetchCancellations(); 
        } catch (err) {
            console.error('Error updating booking status:', err);
            toast.error("Failed to update booking status");
        }
    };

    const handleReject = async (event, bookingid, pickupDate, pickupTime) => {
        event.preventDefault();
        if (!isButtonActive(pickupDate, pickupTime)) {
            toast.error("Reject action is not allowed within 10 minutes of pickup time.");
            return;
        }
        try {
            await axios.post(`${url}/api/cancel/delete-status`, { bookingid });
            toast.success("Cancellation request rejected successfully");
            fetchCancellations();
        } catch (err) {
            console.error('Error rejecting cancellation:', err);
            toast.error("Failed to reject cancellation");
        }
    };
    
    useEffect(() => {
        fetchCancellations();
    }, [fetchCancellations]);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    const totalPages = Math.ceil(cancellations.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentItems = cancellations.slice(startIdx, endIdx);

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

    return (
        <div className="mx-20 my-12">
            <h2 className="text-2xl font-bold">Cancellation Requests</h2>
            <div className='flex flex-col gap-5 mt-7'>
                {currentItems.map((cancellation, index) => {
                    const status = statuses[cancellation.bookingid];
                    const buttonActive = isButtonActive(cancellation.pickupdate, cancellation.pickuptime);
                    return (
                        <div key={cancellation._id} className='grid grid-cols-[1fr_2fr_2fr] items-center gap-5 text-sm p-2.5 px-5 text-gray-500 border border-blue-500 md:grid-cols-[1fr_2fr_2fr_1fr] md-gap-4 lg:grid-cols-[1fr_2fr_2fr_1fr_1fr] xl:grid-cols-[1fr_2fr_2fr_1fr_1fr_1fr_1fr]'>
                            <img className='w-12' src={cancel_icon} alt=""/>
                            <div>
                                <p className='mt-2 mb-1'>{cancellation.firstName} {cancellation.lastName}</p>
                                <p>{cancellation.email}</p>
                                <p>{cancellation.phone}</p>
                            </div>
                            <p className='w-48'>{cancellation.reason}</p>
                            <p>{formatDate(cancellation.bookingdate)}</p>
                            <p>{formatDate(cancellation.currentdate)}</p>
                            <button className={`p-2 outline-none ${buttonActive ? (status === 'Cancellation Approved' ? 'bg-green-200 border border-green-500' : 'bg-blue-200 border border-blue-500') : 'bg-gray-300 cursor-not-allowed'}`}
                            onClick={(event) => {
                            if (buttonActive) {
                                statusHandler(event, cancellation.bookingid, cancellation.pickupdate, cancellation.pickuptime);
                            } else {
                                alert("Accept action is not allowed within 10 minutes of pickup time.");
                            }
                            }}>Accept</button>
                            <button className={`p-2 outline-none ${buttonActive ? (status === 'Cancellation Rejected' ? 'bg-orange-200 border border-orange-500' : 'bg-red-200 border border-red-500') : 'bg-gray-300 cursor-not-allowed'}`}
                            onClick={(event) => {
                            if (buttonActive) {
                                handleReject(event, cancellation.bookingid, cancellation.pickupdate, cancellation.pickuptime);
                            } else {
                                alert("Reject action is not allowed within 10 minutes of pickup time.");
                            }
                            }}>Reject</button>
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
    );
};

export default Cancel;