import React from 'react'
import './Home.css'
import front from '../../assets/front.jpg'
const Home = () => {
  return (
    <div>
      <img  className=""src={front} alt="" style={{ height: '600px' , width: '100%'}}/>
      <div className='text-block'>
        <input type='radio'/>One Way &nbsp;<input type='radio'/>Round Trip
      </div>
    </div>
  )
}
export default Home