import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const Blog = () => {
    const {url}=useContext(StoreContext);
    const location = useLocation();  
    const navigate = useNavigate();
    const { blog } = location.state || {};
    const [user, setUser] = useState(null);
    const [similarBlogs, setSimilarBlogs] = useState([]);

    useEffect(() => {
      const fetchUserDetails = async () => {
          if (blog && blog.userId) {
              try {
                const response = await axios.get(`${url}/api/user/get-user-by-id/${blog.userId}`);
                  if (response.data.success) {
                      const { name, image } = response.data.user;
                      setUser({ name, image });
                  } else {
                      console.error("Error fetching user details");
                  }
              } catch (error) {
                  console.error("Error fetching user details", error);
              }
          }
      };
      fetchUserDetails();
  }, [blog, url]);

  useEffect(() => {
    const fetchSimilarBlogs = async () => {
        if (blog && blog.category) {
            try {
                const response = await axios.get(`${url}/api/blog/category/${blog.category}`);
                if (response.data.success) {
                    // Filter out the current blog from similar blogs list
                    const filteredBlogs = response.data.data.filter(b => b._id !== blog._id);
                    setSimilarBlogs(filteredBlogs);
                } else {
                    console.error("Error fetching similar blogs");
                }
            } catch (error) {
                console.error("Error fetching similar blogs", error);
            }
        }
    };
    fetchSimilarBlogs();
}, [blog, url]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!blog) {
        return <p>No blog details available</p>;
    }
    const formattedDate = format(new Date(blog.date), 'MMM d, yyyy hh:mm:ss a');

    return (
      <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl mx-auto p-4 bg-white shadow-none rounded-lg my-4 ">
          <div className="flex flex-col w-full">
            <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
            <p className="mt-2 text-gray-500">Published On: {formattedDate}</p>
          </div>
          <div className="w-full h-auto md:h-96">
            <img src={`${url}/blog-uploads/${blog.image}`} alt={blog.title} className="w-full h-full object-contain" />
          </div>
          {user && (
              <div className="flex items-center mt-4">
                  <img src={`${url}/${user.image}`} alt={user.name} className="w-12 h-12 rounded-full mr-4"/>
                  <p className="text-gray-700">{user.name}</p>
              </div>
          )}
          <div className="flex flex-col w-full">
            <p className="mt-4">{blog.description}</p>
          </div>
        {similarBlogs.length > 0 && (
            <div className="w-full max-w-5xl mx-auto p-4 bg-white shadow-none rounded-lg my-4">
                <h2 className="text-xl font-bold mb-4">Similar Blogs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {similarBlogs.map((similarBlog) => (
                        <div key={similarBlog._id} className="w-full mx-auto rounded shadow-lg bg-white p-4">
                            <img className="w-full h-auto rounded-md cursor-pointer" 
                                src={`${url}/blog-uploads/${similarBlog.image}`} alt={similarBlog.title} 
                                onClick={() => navigate(`/blog/${similarBlog._id}`, { state: { blog: similarBlog } })}/>
                            <div className="p-2.5">
                                <h2 className="text-xl font-bold mb-2">{similarBlog.title}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
         </div>
      </div>
        
    );
};

export default Blog;
