import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Available = ({ url }) => {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Fetch the list of all booked cars
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(url + "/api/book/listbooking");
                if (response.data.success) {
                    setCars(response.data.data.map(booking => booking.caritem));
                } else {
                    toast.error("Failed to fetch cars");
                }
            } catch (err) {
                toast.error("An error occurred while fetching cars");
                console.error(err);
            }
        };
        fetchCars();
    }, [url]);

    const handleCarSelection = (car) => {
        setSelectedCar(car);
    };

    const handleUpdateAvailability = async () => {
        if (!selectedCar || !startDate || !endDate) {
            toast.error("Please select a car and specify both start and end dates");
            return;
        }

        try {
            const response = await axios.post(url + "/api/book/update-car-availability", {
                carId: selectedCar._id,
                startDate,
                endDate
            });

            if (response.data.success) {
                toast.success("Car availability updated successfully");
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error("An error occurred while updating car availability");
            console.error(err);
        }
    };

    return (
        <div className="mx-20 my-12">
            <h2 className="text-2xl font-bold">Update Car Availability</h2>

            <div className="mt-5">
                <h3 className="text-lg font-semibold mb-3">Select Car:</h3>
                <div className="grid grid-cols-4 gap-4">
                    {cars.map((car, index) => (
                        <div
                            key={index}
                            className={`border p-3 cursor-pointer ${selectedCar && selectedCar._id === car._id ? 'border-blue-500' : 'border-gray-300'}`}
                            onClick={() => handleCarSelection(car)}
                        >
                            <img src={url+"/images/"+car.image} alt={car.name} className="w-full h-32 object-cover" />
                            <p className="mt-2 text-center">{car.name}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-5">
                    <label className="block text-lg font-semibold mb-2">Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>

                <div className="mt-5">
                    <label className="block text-lg font-semibold mb-2">End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>

                <button
                    onClick={handleUpdateAvailability}
                    className="mt-5 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Update Availability
                </button>
            </div>
        </div>
    );
};

export default Available;
