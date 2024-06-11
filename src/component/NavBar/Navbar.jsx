import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
const Navbar = ({setShowLogin}) => {
return (
  <div className='Navbar'>
      <img src={logo} alt="" className="rounded-full w-16"/>
      <button className='sign_in' onClick={()=>setShowLogin(true)}>Sign in</button>
  </div>
)
}
export default Navbar