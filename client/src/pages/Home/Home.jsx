import React, { useState }  from 'react';
import Header from '../../component/Header/Header';
import VehicleDisplay from '../../component/VehicalDisplay/VehicleDisplay';
import BrowseCar from '../../component/BrowseCars/BrowseCar';
import Hosts from '../../component/Hosts/Hosts';
import CarDisplay from '../../component/CarDisplay/CarDisplay';
import Footer from '../../component/Footer/Footer';
const Home = () => {
  const [category,setCategory] =useState("All");
  return (
    <div>
    <Header/>
    <VehicleDisplay category={category} setCategory={setCategory}/>
    <CarDisplay category={category}/>
    <BrowseCar/>
    <Hosts/>
    <Footer/>
    </div>
  );
};

export default Home;
