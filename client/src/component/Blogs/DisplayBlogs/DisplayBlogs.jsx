import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const DisplayBlogs = () => {
    const {url,token}=useContext(StoreContext);   
    const [blogs, setBlogs] = useState([]);
    const [userId, setUserId] = useState('');
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
    const fetchUserDetails = async () => {
      if (!token) return;
      try {
          const response = await axios.get(`${url}/api/user/get-user`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          if (response.data.success) {
              setUserId(response.data.user.userId);
          }
      } catch (error) {
          console.error("Error fetching user details", error);
      }
  };
    fetchBlogs();
    fetchUserDetails();
  }, [url,token]);

  const handleImageClick = (blog) => {
    navigate(`/blog/${blog._id}`, { state: { blog } });
};

const handleEditClick = (blogId) => {
  navigate(`/edit-blog/${blogId}`); 
};
  return (
    <div className="bg-blue-50">
            <div className="m-8" id="blog_display">
            <h2 className='text-xl font-semibold'>Browse by Type</h2>
                {blogs.length === 0 ? (
                    <p className="text-center text-gray-500">No blogs available</p>
                ) : (
                    <div className="grid mt-8 gap-x-13 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="w-full mx-auto rounded shadow-lg bg-white p-4 relative">
                                <img className="w-full h-auto rounded-md cursor-pointer" src={`${url}/blog-uploads/${blog.image}`} alt={blog.title} onClick={() => handleImageClick(blog)}/>
                                {blog.userId === userId && (
                                    <button 
                                        className="absolute top-2 right-2 p-2 bg-transparent rounded-full shadow-md"
                                        onClick={() => handleEditClick(blog._id)}>
                                        <FaEdit className="text-white w-5 h-5" />
                                    </button>
                                )}
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