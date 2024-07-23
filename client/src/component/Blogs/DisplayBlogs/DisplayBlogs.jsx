import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const DisplayBlogs = () => {
    const {url}=useContext(StoreContext);
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${url}/api/blog/list`);
        if (response.data.success) {
          setBlogs(response.data.data);
        } else {
          console.error("Error fetching blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };
    fetchBlogs();
  }, [url]);

  const handleImageClick = (blog) => {
    navigate(`/blog/${blog._id}`, { state: { blog } });
};
  return (
    <div className="bg-blue-50">
            <div className="m-8" id="blog_display">
                {blogs.length === 0 ? (
                    <p className="text-center text-gray-500">No blogs available</p>
                ) : (
                    <div className="grid mt-8 gap-x-13 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="w-full mx-auto rounded shadow-lg bg-white p-4">
                                <img className="w-full h-auto rounded-md"
                                    src={`${url}/blog-uploads/${blog.image}`} alt={blog.title} onClick={() => handleImageClick(blog)}
                                />
                                <div className="p-2.5">
                                    <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
  );
};

export default DisplayBlogs;
