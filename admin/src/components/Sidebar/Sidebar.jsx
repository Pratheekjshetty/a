import React from 'react'
import './Sidebar.css'
import add_icon from '../../assets/add_icon.png'
import order_icon from '../../assets/order_icon.png'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border border-gray-400 border-t-0 text-[max(1vw,1px)]'>
        <div className="pt-[10] pl-20 flex flex-col">
            <NavLink to='/add' className="sidebar-option flex items-center gap-[12px] border border-gray-400 border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer">
                <img src={add_icon} alt="" />
                <p className='hidden lg:block'>Add Cars</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option flex items-center gap-[12px] border border-gray-400 border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer">
                <img src={order_icon} alt="" />
                <p className='hidden lg:block'>List Cars</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option flex items-center gap-[12px] border border-gray-400 border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer">
                <img src={order_icon} alt="" />
                <p className='hidden lg:block'>Booking</p>
            </NavLink>
         </div>
    </div>
  )
}

export default Sidebar