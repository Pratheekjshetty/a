import React, { useState } from 'react';
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/NavBar/Navbar'
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Booking from './pages/Booking/Booking';
import Contact from './pages/Contact/Contact'
import Login from './pages/Login/Login'
import NoPage from './pages/NoPage/NoPage';
function App() { 
  const[showLogin,setShowLogin] = useState(true);
  return (   
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>} 
    <div>
    <Navbar setShowLogin={setShowLogin}/> 
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/booking' element={<Booking/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>  
    </div> 
    </> 
  );
}
export default App;

