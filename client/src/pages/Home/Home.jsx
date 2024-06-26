import React, { useState }  from 'react';
import Header from '../../component/Header/Header';
import VehicleDisplay from '../../component/VehicalDisplay/VehicleDisplay';
import BrowseCar from '../../component/BrowseCars/BrowseCar';
import Hosts from '../../component/Hosts/Hosts';
import CarDisplay from '../../component/CarDisplay/CarDisplay';
import Footer from '../../component/Footer/Footer';
import AppDownload from '../../component/AppDownload/AppDownlad';
const Home = () => {
  const [category,setCategory] =useState("All");
  return (
    <div>
    <Header/>
    <VehicleDisplay category={category} setCategory={setCategory}/>
    <CarDisplay category={category}/>
    <BrowseCar/>
    <Hosts/>
    <AppDownload/>
    <Footer/>
    </div>
  );
};

export default Home;
