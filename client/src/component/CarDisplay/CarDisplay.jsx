import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import CarItem from '../CarItem/CarItem'

const CarDisplay = ({category}) => {
    const {vehicle_list} = useContext(StoreContext)
  return (
    <div className='m-8'id='car_display'>
      <h2 className='text-xl font-semibold'>Top Cars near you</h2>
      <div className='grid mt-8 gap-x-13 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {vehicle_list.map((item,index)=>{
          return <CarItem key={index} id={item._id} name={item.name} price={item.price} 
          location={item.location} description={item.description} image={item.image}/>
        })}
      </div>
    </div>
  )
}

export default CarDisplay