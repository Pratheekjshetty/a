import React  from 'react';
import front from '../../assets/front.jpg';
import VehicleDisplay from './VehicleDisplay';
import BrowseCar from './BrowseCar';
const Home = () => {
  return (
    <>
    <div>
      <img className="" src={front} alt="Front" style={{ height: '600px', width: '100%' }} />
    </div>
    <VehicleDisplay/>
    <BrowseCar/>
    </>
  );
};

export default Home;
