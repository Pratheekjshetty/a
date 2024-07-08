import React, { useContext, useState, useEffect } from 'react';
import './EditProfile.css';
import cross_icon from '../../assets/cross_icon.png';
import { StoreContext } from '../../context/StoreContext';
import upload_area from '../../assets/upload_area.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ setShowEditProfile }) => {
    const [image, setImage] = useState(null);
    const { url, setToken } = useContext(StoreContext);
    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Fetch user data and set the state
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${url}/api/user/profile`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    const { name, phone, email, image } = response.data.user;
                    setData({ name, phone, email, password: "" });
                    setImage(image);
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                alert('Failed to fetch user data.');
            }
        };
        fetchUserData();
    }, [url]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("phone", data.phone);
        formData.append("email", data.email);
        if (data.password) formData.append("password", data.password);
        if (image) formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/user/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userImage", response.data.image);
                setShowEditProfile(false);
                navigate('/');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Profile update error:', error);
            alert('Failed to update profile. Please check your details and try again.');
        }
    };

    return (
        <div className='edit-profile'>
            <form onSubmit={onSubmit} className='edit-profile-container'>
                <div className="edit-profile-title">
                    <h2>Edit Profile</h2>
                    <img onClick={() => setShowEditProfile(false)} src={cross_icon} alt="Cross" />
                </div>
                <div className="edit-profile-inputs">
                    <center>
                        <label htmlFor='image'><img className='profile-image rounded-lg' src={image ? URL.createObjectURL(image) : upload_area} alt='' /></label>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                    </center>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />
                    <input name='phone' onChange={onChangeHandler} value={data.phone} type="number" placeholder='Phone Number' required />
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
                    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                        <input name='password' onChange={onChangeHandler} value={data.password} type={showPassword ? "text" : "password"} placeholder='Password' style={{ width: '100%', paddingRight: '40px' }} />
                        <span onClick={togglePasswordVisibility} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <button type='submit'>Update Profile</button>
            </form>
        </div>
    );
}

export default EditProfile;
