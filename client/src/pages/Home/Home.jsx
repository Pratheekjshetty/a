import React, { useRef, useState }  from 'react';
import Header from '../../component/Header/Header';
import VehicleDisplay from '../../component/VehicalDisplay/VehicleDisplay';
import BrowseCar from '../../component/BrowseCars/BrowseCar';
import Hosts from '../../component/Hosts/Hosts';
import CarDisplay from '../../component/CarDisplay/CarDisplay';
import AppDownload from '../../component/AppDownload/AppDownlad';
const Home = () => {
  const [category,setCategory] =useState("All");
  const carDisplayRef = useRef(null);
  const vehicleDisplayRef = useRef(null);
  return (
    <div>
    <Header/>
    <div ref={vehicleDisplayRef}>
      <VehicleDisplay category={category} setCategory={setCategory} carDisplayRef={carDisplayRef}/>
    </div>
    <div ref={carDisplayRef}>
        <CarDisplay category={category} />
    </div>
    <BrowseCar carDisplayRef={carDisplayRef}/>
    <Hosts/>
    <AppDownload/>
    </div>
  );
};

export default Home;
