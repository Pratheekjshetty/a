import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import CarItem from '../CarItem/CarItem';

const CarDisplay = ({ category, setCategory, seats, setSeats, priceRange, setPriceRange }) => {
    const { vehicle_list } = useContext(StoreContext);
    const [filterType, setFilterType] = useState('');

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSeatsChange = (e) => {
        setSeats(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPriceRange(e.target.value);
    };

    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
    };

    const isPriceInRange = (price, range) => {
        if (range === 'All') return true;
        const [min, max] = range.split('-').map(Number);
        return price >= min && price <= max;
    };

    const renderFilterOptions = () => {
        switch (filterType) {
            case 'Category':
                return (
                    <select value={category} onChange={handleCategoryChange} className='bg-blue-300 w-32 rounded-md px-1 ml-4'>
                        <option value="All">All</option>
                        <option value="Benz">Benz</option>
                        <option value="BMW">BMW</option>
                        <option value="Ford">Ford</option>
                        <option value="Nissan">Nissan</option>
                        <option value="Subaro">Subaro</option>
                        <option value="Tesla">Tesla</option>
                    </select>
                );
            case 'Seats':
                return (
                    <select value={seats} onChange={handleSeatsChange} className='bg-blue-300 w-32 rounded-md px-1 ml-4'>
                        <option value="All">All</option>
                        <option value="4">4 seats</option>
                        <option value="5">5 seats</option>
                    </select>
                );
            case 'Price':
                return (
                    <select value={priceRange} onChange={handlePriceChange} className='bg-blue-300 w-32 rounded-md px-1 ml-4'>
                        <option value="All">All</option>
                        <option value="2000-3000">2k-3k</option>
                        <option value="3000-4000">3k-4k</option>
                        <option value="4000-5000">4k-5k</option>
                        <option value="5000-6000">5k-6k</option>
                    </select>
                );
            default:
                return null;
        }
    };

    return (
        <div className='bg-blue-50'>
            <div className='m-8' id='car_display'>
                <h2 className='text-xl font-semibold'>Browse by Make</h2>
                <div className='flex items-center'>
                    <select value={filterType} onChange={handleFilterTypeChange} className='bg-blue-300 w-32 rounded-md px-1 ml-1 mt-1'>
                        <option value="">Select Filter</option>
                        <option value="Category">Category</option>
                        <option value="Seats">Seats</option>
                        <option value="Price">Price</option>
                    </select>
                    {filterType && renderFilterOptions()}
                </div>
                <div className='grid mt-8 gap-x-13 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {vehicle_list.map((item, index) => {
                        const matchesCategory = category === 'All' || category === item.category;
                        const matchesSeats = seats === 'All' || seats === String(item.seats);
                        const matchesPrice = isPriceInRange(item.price, priceRange);

                        if (matchesCategory && matchesSeats && matchesPrice) {
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
