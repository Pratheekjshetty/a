import React, {useContext, useState} from 'react'
import upload_area from '../../../assets/upload_area.png'
import { StoreContext } from '../../../context/StoreContext';
import axios from "axios";
import {toast} from "react-toastify";

const AddEdit = () => {

    const {url}=useContext(StoreContext);
    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        title:"",
        description:"",
        category:"Cars",
  })

  const onChangeHandler =(event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("title",data.title)
    formData.append("description",data.description)
    formData.append("category",data.category)
    formData.append("image",image)
    const response =await axios.post(`${url}/api/blog/add`,formData);
    if(response.data.success){
      setData({
        title:"",
        description:"",
        category:"",
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }    
  }
  return (
    <div className='w-[70%] ml-20 mt-12 text-[#6d6d6d] text-base'>
      <h2 className='text-2xl font-bold mb-7 text-black'>Add Blog</h2>
      <form className='flex-col gap-5' onSubmit={onSubmitHandler}>
        <div className="flex-col">
            <p>Blog Image</p>
            <label htmlFor='image'>
            <img className='w-32' src={image?URL.createObjectURL(image):upload_area} alt=''/>
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required/>
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
        <button type='submit' className='w-custom border border-none p-3 mb-4 bg-[green] text-white cursor-pointer'>SUBMIT</button>
      </form>
      </div>
  )
}

export default AddEdit