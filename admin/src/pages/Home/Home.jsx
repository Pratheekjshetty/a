import React, { useEffect, useState } from 'react';
import { FaUsers, FaUserTie, FaCar, FaBlog } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = ({ url }) => {
  const [stats, setStats] = useState({ users: 0, drivers: 0, cars: 0, blogs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userResponse, carResponse, blogResponse ] = await Promise.all([
          axios.get(`${url}/api/user/get-count`),
          axios.get(`${url}/api/car/total-cars`),
          axios.get(`${url}/api/blog/total-blogs`),
        ]);

        setStats({
          users: userResponse.data.counts.users || 0,
          drivers: userResponse.data.counts.drivers || 0,
          cars: carResponse.data.totalCars  || 0,
          blogs: blogResponse.data.totalBlogs || 0,
        });
        setLoading(false);
      } catch (err) {
        toast.error("Failed to fetch dashboard data");
        console.error(err);
        setLoading(false);
      }
    };

    fetchStats();
  }, [url]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><p className="text-2xl font-semibold">Loading...</p></div>;
  }

  return (
    <div className="dashboard-container bg-gray-100 w-full">
      <div className="mx-20 my-12">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
        <div className="overview-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
            <FaUsers className="text-3xl mb-3" />
            <h2 className="text-2xl font-semibold">Total Users</h2>
            <p className="text-3xl font-bold">{stats.users}</p>
          </div>
          <div className="card bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
            <FaUserTie className="text-3xl mb-3" />
            <h2 className="text-2xl font-semibold">Total Drivers</h2>
            <p className="text-3xl font-bold">{stats.drivers}</p>
          </div>
          <div className="card bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
            <FaCar className="text-3xl mb-3" />
            <h2 className="text-2xl font-semibold">Total Cars</h2>
            <p className="text-3xl font-bold">{stats.cars}</p>
          </div>
          <div className="card bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
            <FaBlog className="text-3xl mb-3" />
            <h2 className="text-2xl font-semibold">Total Blogs</h2>
            <p className="text-3xl font-bold">{stats.blogs}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
