import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './component/NavBar/Navbar'
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact'
import Login from './pages/Login/Login'
import NoPage from './pages/NoPage/NoPage';
function App() { 
  const[showLogin,setShowLogin] = useState(false);
  return (   
    <BrowserRouter>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>} 
    <div>
    <Navbar setShowLogin={setShowLogin}/> 
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>  
    </div> 
    </BrowserRouter> 
  );
}
export default App;

