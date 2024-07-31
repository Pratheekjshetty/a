import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import not_found from '../../assets/not_found.png'
import axios from 'axios';
import CarItem from '../CarItem/CarItem';

const CarDisplay = ({ category, setCategory, seats, setSeats, priceRange, setPriceRange, location, setLocation }) => {
    const { vehicle_list, bookingList ,url} = useContext(StoreContext);
    const [filterType, setFilterType] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');
    const [averageRatings, setAverageRatings] = useState({});

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSeatsChange = (e) => {
        setSeats(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPriceRange(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
    };

    const handlePickupDateChange = (e) => {
        const newPickupDate = e.target.value;
        if (new Date(newPickupDate) > new Date(dropoffDate)) {
            alert("Pickup date cannot be greater than dropoff date.");
        } else {
            setPickupDate(newPickupDate);
        }
    };

    const handleDropoffDateChange = (e) => {
        const newDropoffDate = e.target.value;
        if (new Date(pickupDate) > new Date(newDropoffDate)) {
            alert("Dropoff date cannot be less than pickup date.");
        } else {
            setDropoffDate(newDropoffDate);
        }
    };

    const isPriceInRange = (price, range) => {
        if (range === 'All') return true;
        const [min, max] = range.split('-').map(Number);
        return price >= min && price <= max;
    };

    const isCarBooked = (carId) => {
        if (!pickupDate || !dropoffDate) return false;
        return bookingList.some(booking => {
            return booking.carItemId === carId && (booking.status === "Car Booked" || booking.status === "Car Started" || booking.status === "Car Reached Destination") &&
                new Date(pickupDate) <= new Date(booking.dropoffDate) &&
                new Date(dropoffDate) >= new Date(booking.pickupDate);
        });
    };

    useEffect(() => {
        const fetchAverageRatings = async () => {
          const ratingsMap = {};
          await Promise.all(
            vehicle_list.map(async (vehicle) => {
              try {
                const response = await axios.get(`${url}/api/rating/car/${vehicle._id}`);
                if (response.data.success) {
                  const ratings = response.data.data;
                  const averageRating = ratings.length > 0
                    ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length
                    : 0;
                  ratingsMap[vehicle._id] = averageRating;
                } else {
                  ratingsMap[vehicle._id] = 0;
                }
              } catch (error) {
                console.error("Error fetching ratings", error);
                ratingsMap[vehicle._id] = 0;
              }
            })
          );
          setAverageRatings(ratingsMap);
        };
    
        fetchAverageRatings();
      }, [vehicle_list, url]);

    const renderFilterOptions = () => {
        switch (filterType) {
            case 'Category':
                return (
                    <select value={category} onChange={handleCategoryChange} className='bg-blue-300 w-32 rounded-md px-1 ml-1 pt-1'>
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
                    <select value={seats} onChange={handleSeatsChange} className='bg-blue-300 w-32 rounded-md px-1 ml-1 pt-1'>
                        <option value="All">All</option>
                        <option value="4">4 seats</option>
                        <option value="5">5 seats</option>
                    </select>
                );
            case 'Price':
                return (
                    <select value={priceRange} onChange={handlePriceChange} className='bg-blue-300 w-32 rounded-md px-1 ml-1 pt-1'>
                        <option value="All">All</option>
                        <option value="2000-3000">2k-3k</option>
                        <option value="3000-4000">3k-4k</option>
                        <option value="4000-5000">4k-5k</option>
                        <option value="5000-6000">5k-6k</option>
                    </select>
                );
                case 'Location':
                    return (
                        <select value={location} onChange={handleLocationChange} className='bg-blue-300 w-32 rounded-md px-1 ml-1 pt-1'>
                            <option value="All">All</option>
                            <option value="Manglore">Manglore</option>
                            <option value="Bantwal">Bantwal</option>
                            <option value="Puttur">Puttur</option>
                        </select>
                    );
            default:
                return null;
        }
    };

    const filteredVehicles = vehicle_list.filter(item => {
        const matchesCategory = category === 'All' || category === item.category;
        const matchesSeats = seats === 'All' || seats === String(item.seats);
        const matchesPrice = isPriceInRange(item.price, priceRange);
        const matchesLocation = location === 'All' || location === item.location;
        const notBooked = !isCarBooked(item._id);

        return matchesCategory && matchesSeats && matchesPrice && matchesLocation && notBooked;
    });

    return (
        <div className='bg-blue-50 p-8'>
            <div className='p-8' id='car_display'>
                <h2 className='text-xl font-semibold'>Browse by Make</h2>
                <div className='flex flex-col md:flex-row'>
                <div className='flex items-center mt-4'>
                    <input type="date" value={pickupDate} onChange={handlePickupDateChange} className='bg-blue-300 w-32 rounded-md px-1 ml-1' placeholder="Pickup Date" onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = e.target.value ? 'date' : 'text')}/>
                    <input type="date" value={dropoffDate} onChange={handleDropoffDateChange} className='bg-blue-300 w-32 rounded-md px-1 ml-1' placeholder="Dropoff Date" onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = e.target.value ? 'date' : 'text')} />
                </div>
                <div className='flex items-center mt-4'>
                    <select value={filterType} onChange={handleFilterTypeChange} className='bg-blue-300 w-32 rounded-md px-1 pt-1 ml-1'>
                        <option value="">Select Filter</option>
                        <option value="Category">Category</option>
                        <option value="Seats">Seats</option>
                        <option value="Price">Price</option>
                        <option value="Location">Location</option>
                    </select>
                    {filterType && renderFilterOptions()}
                </div>
                </div>
                {filteredVehicles.length === 0 ? (
                    <div className='flex flex-col justify-center items-center'>
                    <img src={not_found} alt="Not Found"/>
                    <p className='mt-8 mb-4 text-3xl text-center font-semibold md:text-4xl text-red-500'>No cars found</p>
                    <p className="mb-4 text-lg text-center font-light text-gray-500 dark:text-gray-400">Sorry, we can't find any cars that match your criteria.</p>
                    </div>
                ) : (
                <div className='grid mt-8 gap-x-13 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {vehicle_list.map((item, index) => {
                        const matchesCategory = category === 'All' || category === item.category;
                        const matchesSeats = seats === 'All' || seats === String(item.seats);
                        const matchesPrice = isPriceInRange(item.price, priceRange);
                        const matchesLocation = location === 'All' || location === item.location;
                        const notBooked = !isCarBooked(item._id);

                        if (matchesCategory && matchesSeats && matchesPrice && matchesLocation && notBooked) {
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
                                    averageRating={averageRatings[item._id]}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
                )}
            </div>
        </div>
    );
}

export default CarDisplay;
