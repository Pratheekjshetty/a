import React  from 'react';
import front from '../../assets/front.jpg';
import VehicleDisplay from './VehicleDisplay';
import BrowseCar from './BrowseCar';
import Hosts from './Hosts';
const Home = () => {
  return (
    <>
    <div>
      <img className="" src={front} alt="Front" style={{ height: '600px', width: '100%' }} />
    </div>
    <VehicleDisplay/>
    <BrowseCar/>
    <Hosts/>
    </>
  );
};

export default Home;
