import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Navbar = ({setShowLogin}) => {
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
return (
  <div className="bg-blue-300">
    <nav  className='flex flex-col'>
      <div className="max-w-[1170px] text-white mx-auto flex justify-between items-center py-8 font-bold h-24 ">
      <div className="flex gap-10 items-center">
        <div className="px-1 cursor-pointer">
          <Link to='/'><img src={logo} className="w-[200px]" alt="logo" /></Link>
        </div>
        <ul className='flex flex-row space-x-4'>
          <li className="hidden lg:block cursor-pointer p-4"><Link to='/'>Home</Link></li>
          <li className="hidden lg:block cursor-pointer p-4"><Link to='/about'>About</Link></li>
          <li className="hidden lg:block cursor-pointer p-4"> <Link to='/booking'>Booking</Link></li>
          <li className="hidden lg:block cursor-pointer p-4"> <Link to='/contact'>Contact</Link></li>
        </ul>
      </div>
      <div className="flex gap-6 items-center mx-4">
        <div className="relative hidden sm:block">
          <input type="text" placeholder="Search" className="p-2 rounded-full text-blue-900 placeholder-blue-900 border border-blue-900 focus:outline-none"/>
        </div>
        <button className='bg-white text-blue-900 rounded-full p-2 cursor-pointer transition duration-500 hover:bg-blue-700 hover:text-white' onClick={()=>setShowLogin(true)}>
          Sign In
        </button>
        <div className="lg:hidden">
          <FaBars className="text-white text-2xl cursor-pointer" onClick={() => setIsMobileMenuOpen(true)}/>
        </div>
      </div>
      </div>
      <div className={`fixed inset-0 bg-blue-300 p-8 transition-transform transform ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}style={{ width: '40%',height:'750px' }} >
          <button className="text-white text-2xl mb-2" onClick={() => setIsMobileMenuOpen(false)}> x </button>
          <ul className="flex flex-col">
            <li className="cursor-pointer p-2">
              <Link to='/' onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            </li>
            <li className="cursor-pointer p-2">
              <Link to='/about' onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            </li>
            <li className="cursor-pointer p-2">
              <Link to='/booking' onClick={() => setIsMobileMenuOpen(false)}>Booking</Link>
            </li>
            <li className="cursor-pointer p-2">
              <Link to='/contact' onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </li>
          </ul>
        </div>
      <div className="block sm:hidden w-full mt-4 md:mt-0">
        <div className="flex items-center justify-center">
          <input type="text" placeholder="Search" className="w-full px-4 py-2 rounded-full text-blue-900 placeholder-blue-900 border border-blue-900  focus:outline-none"/>
        </div>
      </div>
    </nav>
  </div>
);
}
export default Navbar