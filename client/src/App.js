import React, { useState } from 'react';
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/NavBar/Navbar'
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Blogs from './pages/Blogs/Blogs';
import Contact from './pages/Contact/Contact'
import Login from './component/Login/Login'
import EditProfile from './component/EditProfile/EditProfile';
import MyBooking from './component/MyBooking/MyBooking';
import CarDisplay from './component/CarDisplay/CarDisplay';
import Booking from './pages/Booking/Booking';
import Footer from './component/Footer/Footer';
import NoPage from './pages/NoPage/NoPage';

function App() { 
  const[showLogin,setShowLogin] = useState(false);
  // const handleLoginSuccess = () => {
  //   setShowLogin(false);
  // };
  return (   
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>} 
    <div>
    <Navbar setShowLogin={setShowLogin}/> 
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/edit-profile' element={<EditProfile/>}/>
          <Route path='/mybooking' element={<MyBooking/>}/>
          <Route path='/booking' element={<Booking/>}/>
          <Route path="/car-display" element={<CarDisplay />} />
          <Route path="*" element={<NoPage/>}/>
        </Routes>  
    </div>
    <Footer/> 
    </> 
  );
}
export default App;

