import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaStar } from 'react-icons/fa';
import axios from 'axios';

const DisplayRatings = () => {
    const { vehicle_list, url, token } = useContext(StoreContext);
    const navigate = useNavigate();
    const [averageRatings, setAverageRatings] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchAverageRatings = async () => {
            const ratingsMap = {};
            await Promise.all(
                vehicle_list.map(async (vehicle) => {
                    try {
                        const response = await axios.get(`${url}/api/rating/car/${vehicle._id}`);
                        if (response.data.success) {
                            const ratings = response.data.data;
                            const averageRating = ratings.length > 0
                                ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length
                                : 0;
                            ratingsMap[vehicle._id] = averageRating;
                        } else {
                            ratingsMap[vehicle._id] = 0;
                        }
                    } catch (error) {
                        console.error("Error fetching average rating", error);
                        ratingsMap[vehicle._id] = 0;
                    }
                })
            );
            setAverageRatings(ratingsMap);
        };

        fetchAverageRatings();
    }, [vehicle_list, url]);

    const handleAddRating = (vehicleId) => {
        navigate(`/add-rating/${vehicleId}`);
    };

    const handleViewRatings = (vehicleId, name, image, model) => {
        navigate(`/ratings/${vehicleId}`,{state:{name,image,model}});
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(vehicle_list.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentItems = vehicle_list.slice(startIdx, endIdx);

    return (
        <div className='bg-blue-50'>
            <div className='p-8' id='car_display'>
                <h2 className='text-xl font-semibold'>Browse by Make</h2>
                <div className='grid mt-8 gap-x-13 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {currentItems.map((item, index) => (
                        <div key={index} className="w-full mx-auto rounded shadow-lg bg-white p-4 relative">
                            {token && (
                            <button 
                                className="absolute top-2 right-2 p-2 bg-transparent rounded-full shadow-md"
                                onClick={() => handleAddRating(item._id)}>
                                <FaPlusCircle className="text-white w-5 h-5" />
                            </button>
                            )}
                            {averageRatings[item._id] > 0 && (
                            <div className="absolute bottom-16 left-4 flex items-center bg-transparent p-1 rounded-full">
                                <span className="ml-1 text-white font-bold">{averageRatings[item._id]?.toFixed(1) || 0}</span>
                                <FaStar className="text-yellow-500 w-4 h-4" />   
                            </div>
                            )}
                            <img className='w-full rounded-md' src={`${url}/images/${item.image}`} alt="" onClick={() => handleViewRatings(item._id, item.name, item.image, item.model)}/>
                            <div className='p-2.5'>
                                <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                            </div>
                        </div>
                    ))}  
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded-l">
                        Prev
                    </button>
                    <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-blue-500 text-white rounded-r">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DisplayRatings; 
