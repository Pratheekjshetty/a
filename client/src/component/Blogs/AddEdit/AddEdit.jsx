import React, {useContext, useEffect, useState} from 'react'
import upload_area from '../../../assets/upload_area.png'
import { StoreContext } from '../../../context/StoreContext';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";

const AddEdit = () => {
    const {token,url}=useContext(StoreContext);

    const navigate = useNavigate();
    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        userId: "",
        title:"",
        description:"",
        category:"Cars",
  })

  useEffect(() => {
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
          const { userId } = response.data.user;
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
  }, [token, url]);

  const onChangeHandler =(event)=>{
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }

  const onImageChangeHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("title",data.title)
    formData.append("description",data.description)
    formData.append("category",data.category)
    formData.append("image",image)
    try {
      const response = await axios.post(`${url}/api/blog/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    if(response.data.success){
      setData({
        userId: "",
        title:"",
        description:"",
        category:"",
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message || 'Failed to add blog')
    }    
  } catch (error) {
    console.error('Error adding blog:', error);
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Error adding blog');
    }
  }
};
  return (
    <div className='w-[70%] ml-5 mt-12 text-[#6d6d6d] text-base xs:ml-12 sm:ml-20 lg:ml-40'>
      <h2 className='text-2xl font-bold mb-7 text-black'>Add Blog</h2>
      <form className='flex-col gap-5' onSubmit={onSubmitHandler}>
        <div className="flex-col">
            <p>Blog Image</p>
            <label htmlFor='image'>
            <img className='w-32' src={image?URL.createObjectURL(image):upload_area} alt=''/>
            </label>
            <input accept='image/*' onChange={onImageChangeHandler} type="file" id='image' name='image' hidden required/>
        </div>
        <p className="flex-col">
            <p>Blog title</p>
            <input className='w-custom border border-black p-3 text-sm' onChange={onChangeHandler} type="text" value={data.title} name="title" placeholder='Enter the title' required/>
        </p>
        
        <div className="flex-col">
            <p>Blog description</p>
            <textarea className='w-custom border border-black p-3 text-sm' onChange={onChangeHandler} value={data.description} name='description' rows="4" placeholder='Enter the description' required></textarea>
          </div>
        <div className='flex-col'>
            <p>Car category</p>
            <select className='w-custom border border-black p-3 text-sm' onChange={onChangeHandler} value={data.category} name="category" required>
                <option value="" disabled>Please Select Category</option>
                <option value="Cars">Cars</option>
                <option value="Travel">Travel</option>
                <option value="Hotel">Hotel</option>
                <option value="Food">Food</option>
            </select>
        </div>
        <br/>
        <div className='flex gap-2 w-custom cursor-pointer'>
            <button type='submit' className='w-custom border border-none p-3 mb-4 bg-[green] text-white cursor-pointer'>SUBMIT</button>
            <button type='button' className='w-custom border border-none p-3 mb-4 bg-[blue] text-white cursor-pointer' onClick={()=> navigate("/blogs")}>GO BACK</button>
        </div> 
      </form>
      </div>
  )
}

export default AddEdit