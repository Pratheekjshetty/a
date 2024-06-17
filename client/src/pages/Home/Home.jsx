import React  from 'react';
import front from '../../assets/front.jpg';
import VehicleDisplay from './VehicleDisplay';
const Home = () => {
  return (
    <>
    <div>
      <img className="" src={front} alt="Front" style={{ height: '600px', width: '100%' }} />
    </div>
    <VehicleDisplay/>
    </>
  );
};
export default Home;
