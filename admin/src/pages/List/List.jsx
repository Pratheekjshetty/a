import React, { useEffect, useState, useCallback } from 'react';
import upload_area from '../../assets/upload_area.png'
import axios from 'axios';
import './List.css';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const List = ({ url }) => {

  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/car/list`);
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error fetching the list");
    }
  }, [url]);

  const removeCar = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/car/remove`, { id: foodId });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error removing the car item");
    }
  };

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const totalPages = Math.ceil(list.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = list.slice(startIdx, endIdx);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //edit page
  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Benz",
    location:"Manglore"
  })
  const onChangeHandler =(event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("location",data.location)
    formData.append("image",image)
    const response =await axios.post(`${url}/api/car/add`,formData);
    if(response.data.success){
      setData({
        name:"",
        description:"",
        price:"",
        category:"",
        location:""
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
    <div className='list add flex-col'>
      <p>All Car List</p>
      <div className="list-table">
        <div style={{ gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1fr 0.5fr' }} className="title grid justify-center items-center gap-2 px-3 py-4 border border-solid border-zinc-300 text-sm bg-[#f9f9f9]">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Location</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {currentItems.map((item, index) => (
          <div key={index} className="list-table-format grid justify-center items-center gap-2 px-3 py-4 border border-solid border-zinc-300 text-sm">
            <img className='w-[50px]' src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.location}</p>
            <p>Rs.{item.price}</p>
            <p onClick={() => removeCar(item._id)} className='cursor'><FaTrash/></p>
            {/* <p onClick={() => editCar(item._id)} className='cursor'><FaEdit/></p> */}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
    <form className='flex-col gap-5' onSubmit={onSubmitHandler}>
          <div className="flex-col">
            <p>Upload Image</p>
            <label htmlFor='image'>
              <img className='w-32' src={image?URL.createObjectURL(image):upload_area} alt=''/>
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required/>
          </div>
          <div className="flex-col w-custom">
            <p>Car name</p>
            <input className='p-3 border border-black text-sm' onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required/>
          </div>
          <div className="flex-col w-custom">
            <p>Car description</p>
            <textarea className='p-3 border border-black text-sm' onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Write content here' required></textarea>
          </div>
          <div className="flex gap-7 w-custom">
            <div className="flex-col w-[198px]">
              <p>Car category</p>
              <select className='p-2 border border-black text-sm' onChange={onChangeHandler} name="category" >
                <option value="Benz">Benz</option>
                <option value="BMW">BMW</option>
                <option value="Ford">Ford</option>
                <option value="Nissan">Nissan</option>
                <option value="Subaro">Subaro</option>
                <option value="Tesla">Tesla</option>
              </select>
            </div>
            <div className="flex-col w-[198px]">
              <p>Car location</p>
              <select className='p-2 border border-black text-sm' onChange={onChangeHandler} name="location" >
                <option value="Manglore">Manglore</option>
                <option value="Puttur">Puttur</option>
                <option value="Bantwal">Bantwal</option>
              </select>
            </div>
          </div>
          <div>
            <div className="flex-col w-custom">
              <p>Car price</p>
              <input className='p-2 border border-black text-sm' onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='Rs.200'/>
            </div>
          </div><br/>
          <div className='flex gap-2 w-custom cursor-pointer'>
            <button className='flex-col w-[198px] border border-none p-3 bg-[green] text-white justify-center items-center' type='submit'>UPDATE</button> 
            <button className='flex-col w-[198px] border border-none p-3 bg-[green] text-white justify-center items-center' >CANCEL</button>
          </div>
      </form>
  </div>
  );
}

export default List;
