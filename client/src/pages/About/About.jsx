import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import about_1 from '../../assets/about/about_1.jpg';
import about_2 from '../../assets/about/about_2.jpg';
import about_3 from '../../assets/about/about_3.jpg';
import about_4 from '../../assets/about/about_4.jpg';
import about_5 from '../../assets/about/about_5.jpg';
import about_6 from '../../assets/about/about_6.jpg';

const About = () => {
  const { url } = useContext(StoreContext);
  const [counts, setCounts] = useState({
    users: 0,
    drivers: 0,
    cars: 0 
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [userResponse, carResponse] = await Promise.all([
          axios.get(`${url}/api/user/get-count`),
          axios.get(`${url}/api/car/total-cars`)
        ]);
        setCounts({
          users: userResponse.data.counts.users || 0,
          drivers: userResponse.data.counts.drivers || 0,
          cars: carResponse.data.totalCars  || 0
        });
      } catch (error) {
        console.error("Error fetching counts", error);
      }
    };

    fetchCounts();
  }, [url]);

  return (
    <div className="container justify-center">
      <div className="flex flex-wrap bg-blue-100">
        <div className="w-full p-16 md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-gray-800">
            Welcome to Voyager, where we bring the best car rental experience right to your fingertips. Discover a wide range of vehicles and enjoy convenient booking with every rental. Renting a car from your favorite local providers has never been easier. Our mission is to make car rentals quick, easy, and enjoyable.
          </p>
        </div>
        <div className="w-full p-16 md:w-1/3">
          <img src={about_6} alt="Car rental" className="w-full h-auto rounded-xl"/>
        </div>
      </div>
      <div className="flex flex-wrap bg-blue-300">
        <div className="w-full p-16 md:w-2/3 order-1 md:order-2">
          <h1 className="text-4xl font-bold mb-4">Our Mission</h1>
          <p className="text-lg text-gray-600">
            Our mission is to provide the most reliable, efficient, and enjoyable car rental experience possible. We aim to offer a diverse range of vehicles to meet all your needs, whether you're traveling for business, pleasure, or any other reason.
          </p>
        </div>
        <div className="w-full p-16 md:w-1/3 order-2 md:order-1">
          <img src={about_4} alt="Our mission" className="w-full h-auto rounded-xl"/>
        </div>
      </div>
      <div className="flex flex-wrap bg-blue-100">
        <div className="w-full p-16 md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">Our Story</h1>
          <p className="text-lg text-gray-800">
            Voyager was founded with a simple idea: to make car rentals accessible and hassle-free for everyone. From our humble beginnings, we've grown to become a trusted name in the car rental industry, known for our commitment to customer satisfaction and our extensive selection of high-quality vehicles.
          </p>
        </div>
        <div className="w-full p-16 md:w-1/3">
          <img src={about_3} alt="Our story" className="w-full h-auto rounded-xl"/>
        </div>
      </div> 
      <div className="p-8 bg-blue-300">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Growth</h2> 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 ">
        <div className="text-center bg-white rounded-xl p-16">
          <img src={about_2} alt="Total Users" className="mx-auto w-32 h-32 rounded-full"/>
          <h3 className="text-2xl font-bold">{counts.users || '0'}+</h3>
          <p className="text-gray-600">Total Users</p>
        </div>
        <div className="text-center bg-white rounded-xl p-16">
          <img src={about_1} alt="Total Drivers" className="mx-auto w-32 h-32 rounded-full"/>
          <h3 className="text-2xl font-bold">{counts.drivers || '0'}+</h3>
          <p className="text-gray-600">Total Drivers</p>
        </div>
        <div className="text-center bg-white rounded-xl p-16">
          <img src={about_5} alt="Total Cars" className="mx-auto w-32 h-32 rounded-full"/>
          <h3 className="text-2xl font-bold">{counts.cars || '0'}+</h3>
          <p className="text-gray-600">Total Cars</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
