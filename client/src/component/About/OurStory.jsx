import React from 'react'
import about_3 from '../../assets/about/about_3.jpg';
const OurStory = () => {
  return (
    <div className="flex flex-wrap bg-blue-100">
        <div className="w-full p-16 md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">Our Story</h1>
          <p className="text-lg text-gray-800">
            Voyager was founded with a simple idea: to make car rentals accessible and hassle-free for everyone. From our humble beginnings, we've grown to become a trusted name in the car rental industry, known for our commitment to customer satisfaction and our extensive selection of high-quality vehicles.
          </p>
        </div>
        <div className="w-full p-16 md:w-1/3">
        <center><img src={about_3} alt="Our story" className="w-full sm:w-1/2 md:w-full h-auto rounded-xl"/></center>
        </div>
    </div>
  )
}

export default OurStory