import React, { useEffect } from 'react'
import DisplayBlogs from '../../component/Blogs/DisplayBlogs/DisplayBlogs';

const Blogs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h2>Blogs</h2>
      <DisplayBlogs/>
    </div>
  )
}

export default Blogs