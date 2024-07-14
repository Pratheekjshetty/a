import React, { useState } from "react";
import download1 from "../../assets/browse/download1.png";
import download2 from "../../assets/browse/download2.png";
import download3 from "../../assets/browse/download3.png";
import download4 from "../../assets/browse/download4.png";
import { useNavigate } from 'react-router-dom';
const images = [
  {
    src: download1,alt: "download1",value: "Find the perfect car to conquer the great outdoors",
    paragraph: "Explore the wilderness with a car that's designed for adventure. From rugged terrains to scenic trails, find the perfect car to conquer the great outdoors and make every journey memorable.",
  },
  {
    src: download2,alt: "download2",value: "Find the perfect car to unwind for the weekend",
    paragraph: "Whether it's a spontaneous road trip or a planned getaway, unwind and relax in a car that's built for comfort and leisure. Discover the joy of weekend escapes with the perfect car.",
  },
  {
    src: download3,alt: "download3",value: "Find the perfect car to upgrade your vacation plans",
    paragraph: "Elevate your vacation experience with a car that offers luxury, convenience, and style. Upgrade your travel plans and make every moment of your journey as enjoyable as the destination itself.",
  },
  {
    src: download4,alt: "download4",value: "Find the perfect car for scenic corners & curves",
    paragraph: "Navigate through scenic routes and winding roads with a car that's engineered for precision and performance. Find the perfect car to enjoy every curve and corner of your drive.",
  },
];
const BrowseCar = ({ carDisplayRef }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };
  const nextSlide = () => {
    const index = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };
  const navigate=useNavigate();
  const handleBrowseBlogs = () => {
    navigate('/blogs')
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-300">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative flex justify-center items-center">
            <img src={images[currentIndex].src} alt={images[currentIndex].alt} className="rounded-lg max-w-full"/>
            <div className="absolute top-2 left-12 right-4 flex space-x-2">
              <button type="button" className="p-2 text-slate-700 rounded-full hover:bg-transparent transition" onClick={prevSlide}>
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
                <span className="sr-only">Previous</span>
              </button>
              <button type="button" className="p-2 text-slate-700 rounded-full hover:bg-transparent transition" onClick={nextSlide}>
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
                <span className="sr-only">Next</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {images[currentIndex].value}
            </h1>
            <p className="text-md font-sans text-gray-600 mb-4">
              {images[currentIndex].paragraph}
            </p>
            <center><button onClick={handleBrowseBlogs} className='bg-indigo-600 text-white p-2 rounded-lg text-md w-40' >Browse Blogs</button></center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseCar;
