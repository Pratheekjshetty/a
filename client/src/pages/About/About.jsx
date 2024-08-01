import React, { useEffect } from 'react';
import AboutUs from '../../component/About/AboutUs';
import OurMission from '../../component/About/OurMission';
import OurStory from '../../component/About/OurStory';
import OurGrowth from '../../component/About/OurGrowth';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <AboutUs/>
      <OurMission/>
      <OurStory/>
      <OurGrowth/>
    </div>
  );
};

export default About;
