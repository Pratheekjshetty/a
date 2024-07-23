import React from 'react';
import logo from '../../assets/logo.png';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-blue-400 flex justify-center items-center z-50">
      <img src={logo} alt="Loading Logo" className="w-60 h-auto" />
    </div>
  );
};

export default Loading;
