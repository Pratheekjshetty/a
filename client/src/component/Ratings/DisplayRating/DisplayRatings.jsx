import React, { useContext } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';

const DisplayRatings = () => {
    const { vehicle_list, url, token } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleAddRating = (vehicleId) => {
        navigate(`/add-rating/${vehicleId}`);
    };

    return (
        <div className='bg-blue-50'>
            <div className='m-8' id='car_display'>
            <h2 className='text-xl font-semibold'>Browse by Make</h2>
                <div className='grid mt-8 gap-x-13 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {vehicle_list.map((item, index) => (
                        <div key={index} className="w-full mx-auto rounded shadow-lg bg-white p-4 relative">
                            {token && (
                                <button 
                                className="absolute top-2 right-2 p-2 bg-transparent rounded-full shadow-md"
                                onClick={() => handleAddRating(item._id)}>
                                <FaPlusCircle className="text-white w-5 h-5" />
                            </button>
                            )}
                            <img className='w-full rounded-md' src={`${url}/images/${item.image}`} alt="" />
                            <div className='p-2.5'>
                                <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                            </div>
                        </div>
                    ))}  
                </div>
            </div>
        </div>
    );
}

export default DisplayRatings; 
