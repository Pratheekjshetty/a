import React, { useEffect } from 'react'
import DisplayBlogs from '../../component/Blogs/DisplayBlogs/DisplayBlogs';

const Blogs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <DisplayBlogs/>
    </div>
  )
}

export default Blogs