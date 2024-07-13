import React from 'react';
import front from '../../assets/front.jpg';

const Header = ({carDisplayRef}) => {   
  const scrollToCarDisplay = () => {
    if (carDisplayRef && carDisplayRef.current) {
      carDisplayRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 ml-32 mt-64 text-white w-1/2">
        <h1 className="font-medium text-white text-6xl  lg:text-7xl xl:text-8xl">
          Rent a Best Car
        </h1>
        <p className="mt-4 text-sm hidden lg:block">
        Our app provides a wide selection of vehicles to choose from, ensuring you find the perfect car for your journey. Whether you're planning a quick trip across town or a long-distance adventure, we have the right car for you. Our easy-to-use platform allows you to compare different models, book in advance, and enjoy a hassle-free rental experience. Join our community of satisfied customers and start your journey with us today!
        </p>
        <center><button onClick={scrollToCarDisplay} className='bg-white text-indigo-600 p-2 rounded-lg text-md w-44 mt-8'>View Cars</button></center>
      </div>
      <img
        className="w-full object-cover rounded-xl"
        src={front}
        alt="Front"
        style={{ height: '600px'}}
      />
    </div>
  );
};

export default Header;
