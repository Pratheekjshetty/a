import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../../context/StoreContext';
import ReactStars from 'react-rating-stars-component';

const AddRating = () => {
    const { token, url } = useContext(StoreContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({
        userId: "",
        carId: id,
        rating: 0,
        comments: "",
    });

    useEffect(() => {
        if (!token) {
            toast.error('Please sign in to continue.');
            navigate('/');
            return;
        }
        const fetchUserDetails = async () => {
            if (!token) {
                return;
            }
            try {
                const response = await axios.get(`${url}/api/user/get-user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.success) {
                    const { _id: userId } = response.data.user;
                    setData(prevData => ({
                        ...prevData,
                        userId,
                    }));
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        if (token) {
            fetchUserDetails();
        }
    }, [token, url, navigate]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onRatingChange = (newRating) => {
        setData(prevData => ({
            ...prevData,
            rating: newRating,
        }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/rating/add`, { ...data, vehicleId: id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                setData({
                    userId: '',
                    carId: id,
                    rating: 0,
                    comments: '',
                });
                toast.success(response.data.message);
                navigate("/ratings");
            } else {
                toast.error(response.data.message || 'Failed to add rating');
            }
        } catch (error) {
            console.error('Error adding rating:', error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error adding rating');
            }
        }
    };

    return (
        <div className='w-[70%] ml-5 mt-12 text-[#6d6d6d] text-base xs:ml-12 sm:ml-20 lg:ml-40'>
            <h2 className='text-2xl font-bold mb-7 text-black'>Add Rating</h2>
            <form className='flex-col gap-5' onSubmit={onSubmitHandler}>
                <div className="flex-col">
                    <p>Rating</p>
                    <ReactStars count={5} onChange={onRatingChange} size={24} activeColor="#ffd700" value={data.rating}/>
                </div>
                <div className="flex-col">
                    <p>Comments</p>
                    <textarea className='w-custom border border-black p-3 text-sm' onChange={onChangeHandler} value={data.comments} name='comments' rows="4" placeholder='Enter comments' required></textarea>
                </div>
                <br />
                <div className='flex gap-2 w-custom cursor-pointer'>
                    <button type='submit' className='w-custom border border-none p-3 mb-4 bg-[green] text-white cursor-pointer'>SUBMIT</button>
                    <button type='button' className='w-custom border border-none p-3 mb-4 bg-[blue] text-white cursor-pointer' onClick={() => navigate("/ratings")}>GO BACK</button>
                </div>
            </form>
        </div>
    );
}

export default AddRating;
