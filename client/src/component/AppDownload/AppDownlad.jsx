import React from 'react'
import play_store from '../../assets/play-store.png'
import app_store from '../../assets/app-store.png'

const AppDownload = () => {
  return (
    <div className='m-auto mt-6 flex flex-col justify-center items-center font-bold py-10 mb-24' id='app-download'>
        <p className='text-xl xs:text-2xl sm:text-3xl md:text-4xl'>For Better Experience Download </p>
        <p className='text-xl xs:text-2xl sm:text-3xl md:text-4xl'>Voyager App</p>
        <p className='text-xs xs:text-sm sm:text-lg lg:text-xl'>Download our app using Playstore or Appstore</p>
        <div className="flex flex-col justify-center mt-10 sm:flex-row">
            <img className='w-48 h-16 cursor-pointer transform transition-transform duration-300 hover:scale-105' src={play_store} alt="" />&nbsp;
            <img className='w-48 h-16 cursor-pointer transform transition-transform duration-300 hover:scale-105' src={app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload