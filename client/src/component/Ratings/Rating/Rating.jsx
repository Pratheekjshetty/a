import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import {useLocation, useParams , useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar, FaEdit } from 'react-icons/fa';

const Rating = () => {
    const { url, token  } = useContext(StoreContext);
    const location = useLocation();
    const {name,image,model} = location.state || {};
    const { carId } = useParams();
    const [ratings, setRatings] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await axios.get(`${url}/api/rating/car/${carId}`);
                if (response.data.success) {
                  const fetchedRatings = response.data.data;
                  setRatings(fetchedRatings);

                    // Fetch user details for each rating
                    const userIds = fetchedRatings.map(rating => rating.userId);
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
                                </div>
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
