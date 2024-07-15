import React from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Booking from './pages/Booking/Booking';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cancel from './pages/Cancel/Cancel';

function App() {
  const url ="http://localhost:4001"
  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <div className='app-content'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Home url={url}/>}/>
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url} />}/>
          <Route path='/booking' element={<Booking url={url}/>}/>
          <Route path='/cancel' element={<Cancel url={url}/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
