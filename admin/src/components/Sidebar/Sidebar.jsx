import React from 'react'
import './Sidebar.css'
import home_icon from '../../assets/home_icon.png'
import user_icon from '../../assets/user_icon.png'
import add_icon from '../../assets/add_icon.png'
import order_icon from '../../assets/order_icon.png'
import car_icon from '../../assets/car_icon.png'
import cancel_icon from '../../assets/cancel.png'
import driver_icon from '../../assets/driver_icon.png'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border border-gray-400 border-t-0 text-[max(1vw,1px)]  bg-blue-200'>
        <div className="pt-[50] pl-5 flex flex-col gap-[20px]">
          <br/>
            <NavLink to='/' className="sidebar-option flex items-center gap-[12px] border border-gray-400 border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer bg-blue-100">
                <img src={home_icon} alt="" style={{ width: '30px' }} />
                <p className='hidden lg:block'>Home</p>
            </NavLink>
            <NavLink to='/user' className="sidebar-option flex items-center gap-[12px] border border-gray-400 border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer bg-blue-100">
                <img src={user_icon} alt="" style={{ width: '30px' }} />
                <p className='hidden lg:block'>Users</p>
            </NavLink>
            <NavLink to='/driver' className="sidebar-option flex items-center gap-[12px] border border-gray-400 border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer bg-blue-100">
                <img src={driver_icon} alt="" style={{ width: '30px' }}/>
                <p className='hidden lg:block'>Drivers</p>
            </NavLink>
            <NavLink to='/add' className="sidebar-option flex items-center gap-[12px] border border-gray-400 border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer bg-blue-100">
                <img src={add_icon} alt="" />
                <p className='hidden lg:block'>Add Cars</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option flex items-center gap-[12px] border border-gray-400 border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer bg-blue-100">
                <img src={order_icon} alt="" />
                <p className='hidden lg:block'>List Cars</p>
            </NavLink>
            <NavLink to='/booking' className="sidebar-option flex items-center gap-[12px] border border-gray-400 border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer bg-blue-100">
                <img src={car_icon} style={{ width: '30px' }} alt="" />
                <p className='hidden lg:block'>Bookings</p>
            </NavLink>
            <NavLink to='/cancel' className="sidebar-option flex items-center gap-[12px] border border-gray-400 border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer bg-blue-100">
                <img src={cancel_icon} alt="" style={{ width: '30px' }}/>
                <p className='hidden lg:block'>Cancelation</p>
            </NavLink>
            <NavLink to='/apply' className="sidebar-option flex items-center gap-[12px] border border-gray-400 border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer bg-blue-100">
                <img src={driver_icon} alt="" style={{ width: '30px' }}/>
                <p className='hidden lg:block'>Application</p>
            </NavLink>
         </div>
    </div>
  )
}

export default Sidebar