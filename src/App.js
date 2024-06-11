import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './component/NavBar/Navbar'
import Layout from './component/Layout/Layout';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact'
import Login from './pages/Login/Login'
import NoPage from './pages/NoPage/NoPage';
function App() { 
  const[showLogin,setShowLogin] = useState(false);
  return (   
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>} 
    <div className="App">
    <Navbar setShowLogin={setShowLogin}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path="*" element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
    </div> 
    </>  
  );
}
export default App;

