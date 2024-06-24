import React from 'react'
import './Sidebar.css'
import add_icon from '../../assets/add_icon.png'
import order_icon from '../../assets/order_icon.png'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border border-gray-400 border-t-0 text-[max(1vw,1px)]  bg-blue-200'>
        <div className="pt-[50] pl-5 flex flex-col gap-[20px]">
            <NavLink to='/add' className="sidebar-option flex items-center gap-[12px] border border-gray-400 border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer bg-blue-100">
                <img src={add_icon} alt="" />
                <p className='hidden lg:block'>Add Cars</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option flex items-center gap-[12px] border border-gray-400 border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer bg-blue-100">
                <img src={order_icon} alt="" />
                <p className='hidden lg:block'>List Cars</p>
            </NavLink>
            <NavLink to='/booking' className="sidebar-option flex items-center gap-[12px] border border-gray-400 border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer bg-blue-100">
                <img src={order_icon} alt="" />
                <p className='hidden lg:block'>Bookings</p>
            </NavLink>
         </div>
    </div>
  )
}

export default Sidebar