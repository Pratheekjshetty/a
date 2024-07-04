import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
const CarItem = ({id,name,price,location,description,image}) => {
  const {url}=useContext(StoreContext);
  const navigate=useNavigate();
  const handleBooking = () => {
    navigate('/booking', { state: { id, name, price, location, description, image } });
  };
  return (
    <div className="w-full mx-auto rounded shadow-lg animate-fadeIn duration-2000" id="car_item">
        <img className='w-full rounded-md'src={url+"/images/"+image} alt=""/>
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
              <button onClick={handleBooking} className='bg-blue-400 px-2 py-1 rounded text-white hover:bg-blue-300'>Book Now</button>
            </div>
        </div>
    </div>
  )
}

export default CarItem