import React  from 'react';
import Header from '../../component/Header/Header';
import VehicleDisplay from '../../component/VehicalDisplay/VehicleDisplay';
import BrowseCar from '../../component/BrowseCars/BrowseCar';
import Hosts from '../../component/Hosts/Hosts';
const Home = () => {
  return (
    <>
    <Header/>
    <VehicleDisplay/>
    <BrowseCar/>
    <Hosts/>
    </>
  );
};

export default Home;
