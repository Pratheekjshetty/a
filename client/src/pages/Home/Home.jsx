import React, { useRef, useState }  from 'react';
import Header from '../../component/Header/Header';
import VehicleDisplay from '../../component/VehicalDisplay/VehicleDisplay';
import BrowseCar from '../../component/BrowseCars/BrowseCar';
import CarDisplay from '../../component/CarDisplay/CarDisplay';
import AppDownload from '../../component/AppDownload/AppDownlad';
import Apply from '../../component/Apply/Apply';
const Home = () => {
  const [category,setCategory] =useState("All");
  const carDisplayRef = useRef(null);
  const vehicleDisplayRef = useRef(null);
  const homeDisplayRef =useRef(null);
  return (
    <div>
    <div ref={homeDisplayRef}>
      <Header carDisplayRef={carDisplayRef}/>
    </div>
    <div ref={vehicleDisplayRef}>
      <VehicleDisplay category={category} setCategory={setCategory} carDisplayRef={carDisplayRef}/>
    </div>
    <div ref={carDisplayRef}>
        <CarDisplay category={category} setCategory={setCategory}/>
    </div>
    <BrowseCar carDisplayRef={carDisplayRef}/>
    <Apply/>
    <AppDownload/>
    </div>
  );
};

export default Home;
