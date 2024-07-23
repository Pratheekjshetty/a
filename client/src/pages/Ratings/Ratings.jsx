import React, { useEffect } from 'react'
import DisplayRatings from '../../component/Ratings/DisplayRating/DisplayRatings';

const Ratings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <DisplayRatings/>
    </div>
  )
}

export default Ratings   