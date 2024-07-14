import React, { useContext } from 'react'
import { StoreContext } from '../../../context/StoreContext';  
const CarItem = ({id,name,description,image}) => {
  const {url}=useContext(StoreContext);
  return (
    <div className="w-full mx-auto rounded shadow-lg animate-fadeIn duration-2000 " id="car_item">
        <img className='w-full rounded-md'src={url+"/images/"+image} alt=""/>
        <div className='p-2.5'>
            <div className='flex justify-between items-center mb-2.5'>
                <p className='text-md font-bold'>{name}</p>
            </div>
        </div>
    </div>
  )
}

export default CarItem