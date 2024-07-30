import React from 'react'
import about_4 from '../../assets/about/about_4.jpg';
const OurMission = () => {
  return (
    <div className="flex flex-wrap bg-blue-300">
        <div className="w-full p-16 md:w-2/3 order-1 md:order-2">
          <h1 className="text-4xl font-bold mb-4">Our Mission</h1>
          <p className="text-lg text-gray-600">
            Our mission is to provide the most reliable, efficient, and enjoyable car rental experience possible. We aim to offer a diverse range of vehicles to meet all your needs, whether you're traveling for business, pleasure, or any other reason.
          </p>
        </div>
        <div className="w-full p-16 md:w-1/3 order-2 md:order-1">
        <center><img src={about_4} alt="Our mission" className="w-full sm:w-1/2 md:w-full h-auto rounded-xl"/></center>
        </div>
    </div>
  )
}

export default OurMission