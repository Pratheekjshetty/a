import React, { useState } from 'react';
import benz from '../../assets/vehicle/benz.png';
import bmw from '../../assets/vehicle/bmw.png';
import ford from '../../assets/vehicle/ford.png';
import jeep from '../../assets/vehicle/jeep.png';
import nissan from '../../assets/vehicle/nissan.png';
import subaro from '../../assets/vehicle/subaro.png';
import tesla from '../../assets/vehicle/tesla.png';
import toyota from '../../assets/vehicle/toyota.png';
const images = [
  { src: benz, alt: 'Benz',value:'Benz' },
  { src: bmw, alt: 'BMW' ,value:'Bmv' },
  { src: ford, alt: 'Ford' ,value:'Ford' },
  { src: jeep, alt: 'Jeep' ,value:'Jeep' },
  { src: nissan, alt: 'Nissan' ,value:'Nissan' },
  { src: subaro, alt: 'Subaru' ,value:'Subaru' },
  { src: tesla, alt: 'Tesla' ,value:'Tesla' },
  { src: toyota, alt: 'Toyota' ,value:'Toyota' }
];
const VehicleDisplay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };
  const nextSlide = () => {
    const index = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };
  return (
    <div className='flex justify-center text-center flex-col'>
      <h1 className='m-8 font-bold text-4xl'>Endless Options</h1>
      <p>With our extensive range of cars, finding a ride anytime, anywhere has never been easier.</p><br/>
      <center><button className='bg-indigo-600 text-white p-2 rounded-lg text-md w-44'>Explore Cars</button></center>
      <div id="controls-carousel" className="relative w-full" data-carousel="static"><br/><br/>
        <h2 className="ml-4 mr-4 font-bold text-lg">Browse by make</h2>
        <div className="relative flex items-center justify-center overflow-hidden rounded-lg" style={{ height: '50vh' }}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'} m-4`}
              style={{ width: '20rem', height: '12.5rem' }}
            >
              <img
                src={image.src}
                className="w-full h-full object-cover rounded-2xl border-slate-400 border-4"
                alt={image.alt}
              />
              <p className='font-bold'>{image.value}</p>
            </div>
          ))}
          <button type="button" className="absolute left-4 z-30 flex items-center justify-center p-2 bg-indigo-600 text-white rounded-full cursor-pointer group focus:outline-none" onClick={prevSlide}>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
            <span className="sr-only">Previous</span>
          </button>
          <button type="button" className="absolute right-4 z-30 flex items-center justify-center p-2 bg-indigo-600 text-white rounded-full cursor-pointer group focus:outline-none" onClick={nextSlide}>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default VehicleDisplay;

