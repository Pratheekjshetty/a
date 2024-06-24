import React from 'react'
import profile_image from '../../assets/profile_image.png'
import logo from '../../assets/logo.png'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-[2px_4%]'>
        <img className='w-[max(12%,80px)]'src={logo} width={100} alt="" />
        <img className='w-[40px]'src={profile_image} alt="" />
    </div>
  )
}

export default Navbar