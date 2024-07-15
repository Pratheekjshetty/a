import React, { useEffect, useState } from 'react';
import cancel_icon from '../../assets/cancel_icon.png'
import axios from 'axios';
import { toast } from 'react-toastify';
   
const Cancel = ({url}) => {
    const [cancellations, setCancellations] = useState([]);

    useEffect(() => {
        const fetchCancellations = async () => {
            try {
                const response = await axios.get(`${url}/api/cancel/cancellations`);
                setCancellations(response.data);
            } catch (error) {
                console.error('Error fetching cancellations:', error);
                toast.error("Failed to fetch cancellation");
            }
        };
        fetchCancellations();
    }, [url]);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

    return (
        <div className="mx-20 my-12">
            <h2 className="text-2xl font-bold">Cancellation Requests</h2>
            <div className='flex flex-col gap-5 mt-7'>
            {cancellations.map((cancellation, index) => {
                return(
                    <div className='grid grid-cols-[1fr_2fr_2fr] items-center gap-5 text-sm p-2.5 px-5 text-gray-500 border border-blue-500 md:grid-cols-[1fr_2fr_2fr_1fr] md-gap-4 lg:grid-cols-[1fr_2fr_2fr_1fr_1fr] xl:grid-cols-[1fr_2fr_2fr_1fr_1fr_1fr_1fr]'>
                        <img className='w-12' src={cancel_icon} alt=""/>
                        <div>
                            <p className='mt-2 mb-1'>{cancellation.firstName+" "+cancellation.lastName}</p>
                            <p>{cancellation.email}</p>
                            <p>{cancellation.phone}</p>
                        </div>
                        <p className='w-48'>{cancellation.reason}</p>
                        <p>{formatDate(cancellation.bookingdate)}</p>
                        <p>{formatDate(cancellation.currentdate)}</p>
                        <button className='bg-blue-200 border border-blue-500 p-2 outline-none'>Accept</button>
                        <button className='bg-red-200 border border-red-500 p-2 outline-none'>Reject</button>
                    </div>
                )
            })}
            </div>
        </div>
    );
};
export default Cancel;
