import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const RecentBlogs = ({ onCategorySelect }) => {
    const { url } = useContext(StoreContext);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecentBlogs = async () => {
            try {
                const response = await axios.get(`${url}/api/blog/list`);
                if (response.data.success) {
                    const blogs = response.data.data;
                    //reverse the blogs array and slice the first 5
                    const reversedBlogs = blogs.reverse().slice(0,5);
                    setRecentBlogs(reversedBlogs); 

                    //extract categories
                    const uniqueCategories = [...new Set(blogs.map(blog => blog.category))];
                    setCategories(uniqueCategories);
                } else {
                    console.error("Error fetching recent blogs");
                }
            } catch (error) {
                console.error("Error fetching recent blogs", error);
            }
        };

        fetchRecentBlogs();
    }, [url]);

    const handleCategoryClick = (category) => {
      onCategorySelect(category);
    };

    const handleImageClick = (blog) => {
      navigate(`/blog/${blog._id}`, { state: { blog } });
  };

    return (
      <div className='flex flex-col sm:flex-row lg:flex-col lg:ml-4 gap-3'>
        <div className="p-4 bg-white rounded shadow-lg w-full sm:w-1/2 lg:w-full">
            <h3 className="text-lg font-semibold mb-4">Recent Blogs</h3>
            <div className="space-y-2">
                {recentBlogs.map((blog) => (
                    <div key={blog._id} className="flex items-center space-x-4">
                        <img src={`${url}/blog-uploads/${blog.image}`} alt={blog.title}
                            className="w-16 h-16 object-cover rounded-full" onClick={() => handleImageClick(blog)}/>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold">{blog.title}</h4>
                        </div>
                    </div>
                ))}
            </div>
          </div>
          <div className="p-4 bg-white rounded shadow-lg w-full sm:w-1/2 lg:w-full">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
                <li className="cursor-pointer text-blue-600" onClick={() => handleCategoryClick('All')}> All </li>
                {categories.map((category) => (
                    <li key={category} className="cursor-pointer text-blue-600" onClick={() => handleCategoryClick(category)}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
      </div>
    );
};

export default RecentBlogs;
