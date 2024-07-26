import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* About Us Section */}
      <div className="flex flex-wrap mb-8">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            Welcome to Voyager, where we bring the best car rental experience right to your fingertips. Discover a wide range of vehicles and enjoy convenient booking with every rental. Renting a car from your favorite local providers has never been easier. Our mission is to make car rentals quick, easy, and enjoyable.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img src="/path/to/your/image.jpg" alt="Car rental" className="w-full h-auto"/>
        </div>
      </div>
      
      {/* Our Mission Section */}
      <div className="flex flex-wrap mb-8">
        <div className="w-full md:w-1/2">
          <img src="/path/to/your/image.jpg" alt="Our mission" className="w-full h-auto"/>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to provide the most reliable, efficient, and enjoyable car rental experience possible. We aim to offer a diverse range of vehicles to meet all your needs, whether you're traveling for business, pleasure, or any other reason.
          </p>
        </div>
      </div>
      
      {/* Our Story Section */}
      <div className="flex flex-wrap mb-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold mb-2">Our Story</h2>
          <p className="text-gray-700">
            Voyager was founded with a simple idea: to make car rentals accessible and hassle-free for everyone. From our humble beginnings, we've grown to become a trusted name in the car rental industry, known for our commitment to customer satisfaction and our extensive selection of high-quality vehicles.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img src="/path/to/your/image.jpg" alt="Our story" className="w-full h-auto"/>
        </div>
      </div>
      
      {/* Statistics Section */}
      <div className="flex flex-wrap justify-around">
        <div className="w-full md:w-1/3 text-center mb-4">
          <img src="/path/to/your/image.jpg" alt="Total Users" className="mx-auto w-16 h-16 mb-2"/>
          <h3 className="text-2xl font-bold">1000+</h3>
          <p className="text-gray-600">Total Users</p>
        </div>
        <div className="w-full md:w-1/3 text-center mb-4">
          <img src="/path/to/your/image.jpg" alt="Total Drivers" className="mx-auto w-16 h-16 mb-2"/>
          <h3 className="text-2xl font-bold">500+</h3>
          <p className="text-gray-600">Total Drivers</p>
        </div>
        <div className="w-full md:w-1/3 text-center mb-4">
          <img src="/path/to/your/image.jpg" alt="Total Cars" className="mx-auto w-16 h-16 mb-2"/>
          <h3 className="text-2xl font-bold">300+</h3>
          <p className="text-gray-600">Total Cars</p>
        </div>
      </div>
    </div>
  );
};

export default About;
