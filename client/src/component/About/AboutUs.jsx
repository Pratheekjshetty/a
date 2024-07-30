import React from 'react'
import about_6 from '../../assets/about/about_6.jpg';
const AboutUs = () => {
  return (
    <div className="flex flex-wrap bg-blue-100">
        <div className="w-full p-16 md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-gray-800">
            Welcome to Voyager, where we bring the best car rental experience right to your fingertips. Discover a wide range of vehicles and enjoy convenient booking with every rental. Renting a car from your favorite local providers has never been easier. Our mission is to make car rentals quick, easy, and enjoyable.
          </p>
        </div>
        <div className="w-full p-16 md:w-1/3">
          <center><img src={about_6} alt="Car rental" className="w-full sm:w-1/2 md:w-full h-auto rounded-xl"/></center>
        </div>
    </div>
  )
}

export default AboutUs