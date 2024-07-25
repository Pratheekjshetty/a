import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import RecentBlogs from '../RecentBlogs/RecentBlogs';

const DisplayBlogs = () => {
    const {url,token}=useContext(StoreContext);   
    const [blogs, setBlogs] = useState([]);
    const [userId, setUserId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const itemsPerPage = 6;
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
  }, [url,token,currentPage]);

  const handleImageClick = (blog) => {
    navigate(`/blog/${blog._id}`, { state: { blog } });
};

const handleEditClick = (blogId) => {
  navigate(`/edit-blog/${blogId}`); 
};

const handleCategorySelect = (category) => {
  setSelectedCategory(category);
  setCurrentPage(1);
};

  const filteredBlogs = selectedCategory=== 'All' 
  ? blogs 
  : blogs.filter(blog => blog.category === selectedCategory);

    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentItems = filteredBlogs.slice(startIdx, endIdx);

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
    
  return (
    <div className="flex flex-col bg-blue-50 lg:flex-row">
            <div className="flex-1 p-8" id="blog_display">
            <h2 className='text-xl font-semibold'>Browse by Type</h2>
                {filteredBlogs.length === 0 ? (
                    <p className="text-center text-gray-500">No blogs available</p>
                ) : (
                    <div className="grid mt-8 gap-x-13 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {currentItems.map((blog) => (
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
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded-l">
                        Prev
                    </button>
                    <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-blue-500 text-white rounded-r">
                        Next
                    </button>
                </div>
            </div>
            <div className='w-full lg:w-1/4 p-8 lg:pl-0 lg:pt-8 lg:pb-0 lg:pr-8 lg:mt-[58px] lg:mb-4'>
                <RecentBlogs onCategorySelect={handleCategorySelect}  />
            </div>
        </div>
  );
};

export default DisplayBlogs;