import React, { useContext } from 'react';
import { StoreContext } from '../../../context/StoreContext';

const DisplayRatings = () => {
    const { vehicle_list, url } = useContext(StoreContext);
    return (
        <div className='bg-blue-50'>
            <div className='m-8' id='car_display'>
            <h2 className='text-xl font-semibold'>Browse by Make</h2>
                <div className='grid mt-8 gap-x-13 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {vehicle_list.map((item, index) => (
                        <div key={index} className="w-full mx-auto rounded shadow-lg bg-white p-4">
                            <img className='w-full rounded-md' src={`${url}/images/${item.image}`} alt="" />
                            <div className='p-2.5'>
                                <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DisplayRatings; 
