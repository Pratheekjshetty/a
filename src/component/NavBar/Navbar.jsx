import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
const Navbar = ({setShowLogin}) => {
return (
  <div className="bg-blue-300 mx-auto">
    <nav className="max-w-[1170px] text-white mx-auto flex justify-between py-8 font-bold h-20 ">
      <div className="flex gap-10 items-center">
        <div className="px-1">
          <img src={logo} className="w-[200px]" alt="logo" />
        </div>
        <ul className='flex flex-row'>
          <li className="hidden sm:block cursor-pointer p-4"><Link to='/'>Home</Link></li>
          <li className="hidden sm:block cursor-pointer p-4"><Link to='/about'>About</Link></li>
          <li className="hidden sm:block cursor-pointer p-4"> <Link to='/contact'>Contact</Link></li>
        </ul>
      </div>
      <div className="flex gap-6 items-center mx-4">
        <button className='bg-white text-blue-900 rounded-full p-2 cursor-pointer transition duration-500 hover:bg-blue-700 hover:text-white' onClick={()=>setShowLogin(true)}>
          Sign in
        </button>
      </div>
    </nav>
  </div>
);
}
export default Navbar