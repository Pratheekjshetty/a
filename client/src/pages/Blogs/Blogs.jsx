import React, { useEffect } from 'react'
import CarDisplay from '../../component/Blogs/CarDisplay/CarDisplay'
const Blogs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
    <div>
        <CarDisplay/>
    </div>
    </div>
  )
}

export default Blogs