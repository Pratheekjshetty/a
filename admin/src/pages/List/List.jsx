import React, { useEffect, useState, useCallback } from 'react';
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
    </div>
  );
}

export default List;
