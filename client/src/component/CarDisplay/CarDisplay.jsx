import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import CarItem from '../CarItem/CarItem';

const CarDisplay = ({ category, setCategory, seats, setSeats }) => {
    const { vehicle_list } = useContext(StoreContext);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    const handleSeatsChange = (e) => {
        setSeats(e.target.value);
    };
    return (
        <div className='bg-blue-50'>
            <div className='m-8 ' id='car_display'>
                <h2 className='text-xl font-semibold'>Top Cars near you</h2>
                <div>
                    <select value={category} onChange={handleCategoryChange}>
                        <option value="All">All</option>
                        <option value="Benz">Benz</option>
                        <option value="BMW">BMW</option>
                        <option value="Ford">Ford</option>
                        <option value="Nissan">Nissan</option>
                        <option value="Subaro">Subaro</option>
                        <option value="Tesla">Tesla</option>
                    </select><br/>
                    <select value={seats} onChange={handleSeatsChange}>
                        <option value="All">All</option>
                        <option value="4">4 seats</option>
                        <option value="5">5 seats</option>
                    </select>
                </div>
                <div className='grid mt-8 gap-x-13 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {vehicle_list.map((item, index) => {
                        const matchesCategory = category === 'All' || category === item.category;
                        const matchesSeats = seats === 'All' || seats === String(item.seats);
                        if (matchesCategory && matchesSeats) {
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
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
}

export default CarDisplay;
