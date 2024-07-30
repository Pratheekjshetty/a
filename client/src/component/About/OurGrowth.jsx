import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import about_1 from '../../assets/about/about_1.jpg';
import about_2 from '../../assets/about/about_2.jpg';
import about_5 from '../../assets/about/about_5.jpg';
import about_7 from '../../assets/about/about_7.jpg';

const OurGrowth = () => {
    const { url } = useContext(StoreContext);
    const [counts, setCounts] = useState({
      users: 0,
      drivers: 0,
      cars: 0,
      blogs: 0,
    });
  
    useEffect(() => {
      const fetchCounts = async () => {
        try {
          const [userResponse, carResponse, blogResponse ] = await Promise.all([
            axios.get(`${url}/api/user/get-count`),
            axios.get(`${url}/api/car/total-cars`),
            axios.get( `${url}/api/blog/total-blogs`)
          ]);
          setCounts({
            users: userResponse.data.counts.users || 0,
            drivers: userResponse.data.counts.drivers || 0,
            cars: carResponse.data.totalCars  || 0,
            blogs: blogResponse.data.totalBlogs || 0,
          });      
        } catch (error) {
          console.error("Error fetching counts", error);
        }
      };
  
      fetchCounts();
    }, [url]);
  return (
    <div className="bg-blue-300">
      <div className="p-16">
        <h2 className="text-4xl font-bold text-center mb-8">Our Growth</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="w-full mx-auto rounded shadow-lg bg-white p-4">
            <img src={about_2} alt="Total Users" className="w-full rounded-md" />
            <h3 className="text-2xl font-bold mt-4">{counts.users || '0'}+</h3>
            <p className="text-gray-600">Total Users</p>
          </div>
          <div className="w-full mx-auto rounded shadow-lg bg-white p-4">
            <img src={about_1} alt="Total Drivers" className="w-full rounded-md" />
            <h3 className="text-2xl font-bold mt-4">{counts.drivers || '0'}+</h3>
            <p className="text-gray-600">Total Drivers</p>
          </div>
          <div className="w-full mx-auto rounded shadow-lg bg-white p-4">
            <img src={about_5} alt="Total Cars" className="w-full rounded-md" />
            <h3 className="text-2xl font-bold mt-4">{counts.cars || '0'}+</h3>
            <p className="text-gray-600">Total Cars</p>
          </div>
          <div className="w-full mx-auto rounded shadow-lg bg-white p-4">
            <img src={about_7} alt="Total Blogs" className="w-full rounded-md" />
            <h3 className="text-2xl font-bold mt-4">{counts.blogs || '0'}+</h3>
            <p className="text-gray-600">Total Blogs</p>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default OurGrowth