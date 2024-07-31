import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const CarItem = ({id,name,price,location,description,image,model,color,seats,averageRating}) => {
  const {url}=useContext(StoreContext);
  const navigate=useNavigate();
  const handleBooking = () => {
    navigate('/booking', { state: { id, name, price, location, description, image, model, color, seats, } });    
  };

  const handleImageClick = () => {
    navigate(`/ratings/${id}`,{ state: { name, image, model } });
  };
  return (
    <div className="w-full mx-auto rounded shadow-lg bg-white transform transition-transform duration-300 hover:scale-105" id="car_item">
      <div className="relative">
      {averageRating > 0 && (
        <div className="absolute bottom-0 left-0 flex items-center bg-transparent p-1 rounded-full">
          <span className="ml-1 text-white font-bold">{averageRating?.toFixed(1) || 0}</span>
          <FaStar className="text-yellow-500 w-4 h-4" />
        </div>
        )}
        <img className='w-full rounded-md' src={url + "/images/" + image} alt="" onClick={handleImageClick}/>
      </div>
        <div className='p-2.5'>
            <div className='flex justify-between items-center mb-2.5'>
                <p className='text-md font-bold'>{name}</p>
            </div>
            <p className='text-gray text-sm'>{description}</p>
            <div className='flex justify-between'>
              <p className="text-blue-400 text-md font-medium my-0">Rs.{price}</p>
              <p className="text-blue-400 text-md font-medium my-0">{location}</p>
            </div>
            <div className='flex justify-center items-center'>
              <button onClick={handleBooking} className='bg-blue-400 px-2 py-1 rounded text-white hover:bg-blue-300 transform transition-transform duration-300 hover:scale-105'>Book Now</button>
            </div>
        </div>
    </div>
  )
}

export default CarItem