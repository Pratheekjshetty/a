import React, { useEffect } from 'react'

const Blogs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h2>Blogs</h2>
    </div>
  )
}

export default Blogs