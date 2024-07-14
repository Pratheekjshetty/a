import React, { useContext } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import CarItem from '../CarItem/CarItem';

const CarDisplay = () => {
    const { vehicle_list } = useContext(StoreContext);
    return (
        <div className='bg-blue-50'>
            <div className='m-8' id='car_display'>
                <div className='flex flex-col md:flex-row'>
                <div className='flex items-center'>
                </div>
                </div>
                <div className='grid mt-8 gap-x-13 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {vehicle_list.map((item, index) => {
                            return (
                                <CarItem
                                    key={index}
                                    id={item._id}
                                    name={item.name}
                                    price={item.price}
                                    location={item.location}
                                    description={item.description}
                                    image={item.image}
                                    model={item.model}
                                    color={item.color}
                                    seats={item.seats}
                                />
                            );
                    })}
                </div>
            </div>
        </div>
    );
}

export default CarDisplay;
