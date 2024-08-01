import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import {useLocation, useParams , useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar, FaEdit, FaReply } from 'react-icons/fa';
import { toast } from 'react-toastify'

const Rating = () => {
    const { url, token  } = useContext(StoreContext);
    const location = useLocation();
    const {name,image,model} = location.state || {};
    const { carId } = useParams();
    const [ratings, setRatings] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [userId, setUserId] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [showResponseInput, setShowResponseInput] = useState(null);
    const [adminResponse, setAdminResponse] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await axios.get(`${url}/api/rating/car/${carId}`);
                if (response.data.success) {
                  const fetchedRatings = response.data.data;
                  const reverseRatings =fetchedRatings.reverse();
                  setRatings(reverseRatings);

                    // Fetch user details for each rating
                    const userIds = reverseRatings.map(rating => rating.userId);
                    const userDetailsMap = {};

                    await Promise.all(userIds.map(async userId => {
                        const userResponse = await axios.get(`${url}/api/user/get-user-by-id/${userId}`);
                        if (userResponse.data.success) {
                            userDetailsMap[userId] = userResponse.data.user;
                        }
                    }));

                    setUserDetails(userDetailsMap);
                } else {
                    console.error("Error fetching ratings");
                }
            } catch (error) {
                console.error("Error fetching ratings", error);
            }
        };

        const fetchUserIdFromToken = async () => {
            if (!token) return;
            try {
                const response = await axios.get(`${url}/api/user/get-user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.success) {
                    setUserId(response.data.user.userId);
                    setIsAdmin(response.data.user.role === 'admin');
                }
            } catch (error) {
                console.error("Error fetching user details", error);
            }
        };

        fetchRatings();
        fetchUserIdFromToken();
    }, [carId, url, token]);

    const renderStars = (rating) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
          if (i <= rating) {
              stars.push(<FaStar key={i} className="text-yellow-500" />);
          } else if (i - rating === 0.5) {
              stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
          } else {
              stars.push(<FaRegStar key={i} className="text-yellow-500" />);
          }
      }
      return stars;
  };

    const handleEditClick = (ratingId) => {
        navigate(`/edit-rating/${ratingId}`);
    };

    const handleAdminResponseClick = (ratingId) => {
        setShowResponseInput(ratingId);
      };

    const handleAdminResponse = async (ratingId) => {
        if (!adminResponse) return;
    
        try {
          const res = await axios.post(`${url}/api/rating/${ratingId}/admin-response`, { response: adminResponse }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.data.success) {
            toast.success("Response added successfully.");
            const updatedRatings = ratings.map(rating => {
                if (rating._id === ratingId) {
                  return { ...rating, adminResponse };
                }
                return rating;
            });
            setRatings(updatedRatings);
            setAdminResponse('');
            setShowResponseInput(null);
          } else {
            toast.error("Failed to add response.");
          }
        } catch (error) {
          console.error("Error adding admin response", error);
        }
      };
    const handleCancelResponse = () => {
        setShowResponseInput(null);
        setAdminResponse('');
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
            <div className="w-full max-w-5xl mx-auto p-4 bg-white shadow-none rounded-lg my-4">
              <div className="flex flex-col w-full">
                <h1 className="text-2xl font-bold mb-4">{model}</h1>
              </div>
              <div className="w-full h-auto md:h-96">
                <img src={`${url}/images/${image}`} alt={name} className="w-full h-full object-contain" />
              </div>
                {ratings.length > 0 ? (
                    <div>
                        {ratings.map((rating) => (
                            <div key={rating._id}>
                              {userDetails[rating.userId] && (
                                    <div className="flex items-center mt-4">
                                        <img src={`${url}/${userDetails[rating.userId].image}`} alt={userDetails[rating.userId].name} className="w-12 h-12 rounded-full mr-4"/>
                                        <p className="text-gray-700">{userDetails[rating.userId].name}</p>
                                        {rating.userId === userId && (
                                            <button
                                                className="ml-auto p-2 bg-transparent rounded-full"
                                                onClick={() => handleEditClick(rating._id)}>
                                                <FaEdit className="text-gray-700" />
                                            </button>
                                        )}
                                    </div>  
                                )}
                                <div className="flex items-center">
                                    <strong>Rating:</strong>
                                    <div className="flex ml-2">
                                        {renderStars(rating.rating)}
                                    </div>
                                </div>
                                <div className="flex flex-col w-full">
                                    <p className="mt-4">{rating.comments}</p>
                                    {rating.adminResponse && (<div className="mt-2 p-4 bg-gray-100 rounded-lg ">
                                        <p className="mt-2 text-blue-600">Admin Response: <span className='text-black'>{rating.adminResponse}</span></p>
                                    </div>   
                                    )}
                                    {isAdmin && (
                                    <>
                                    <button className="mt-2 p-2 bg-gray-200 text-black rounded flex items-center"
                                    onClick={() => handleAdminResponseClick(rating._id, rating.adminResponse)}>
                                        <FaReply className="mr-2" /> {rating.adminResponse ? 'Edit' : 'Reply as Admin'}
                                    </button>
                                    {showResponseInput === rating._id && (
                                    <div className="mt-2">
                                        <textarea className="w-full p-2 border border-gray-300 rounded" placeholder="Write your response..."
                                        value={adminResponse} onChange={(e) => setAdminResponse(e.target.value)}/>
                                        <div className="flex justify-start mt-2 space-x-2">
                                            <button className="p-2 bg-blue-500 text-white rounded" onClick={() => handleAdminResponse(rating._id)}>
                                                Submit Response
                                            </button>
                                            <button className="p-2 bg-gray-300 text-black rounded" onClick={handleCancelResponse}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                    )}
                                    </>
                                    )}
                                </div>
                                <hr className="mt-4 border-gray-400" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No ratings available for this car.</p>
                )}
            </div>
        </div>
    );
};

export default Rating;
