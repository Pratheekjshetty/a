import React, { useState } from 'react';
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/NavBar/Navbar'
import Home from './pages/Home/Home';
import About from './pages/About/About';
import MyBooking from './pages/MyBooking/MyBooking';
import Contact from './pages/Contact/Contact'
import Login from './component/Login/Login'
import NoPage from './pages/NoPage/NoPage';
import Booking from './pages/Booking/Booking';
import Footer from './component/Footer/Footer';

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
          <Route path='/mybooking' element={<MyBooking/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/booking' element={<Booking/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>  
    </div>
    <Footer/> 
    </> 
  );
}
export default App;

