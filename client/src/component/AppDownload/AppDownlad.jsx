import React from 'react'
import play_store from '../../assets/play-store.png'
import app_store from '../../assets/app-store.png'

const AppDownload = () => {
  return (
    <div className='m-auto mt-6 flex flex-col justify-center items-center font-bold text:xl sm:text-2xl md:text-4xl py-10 mb-24' id='app-download'>
        <p>For Better Experience Download </p>
        <p>Voyager App</p>
        <p className='text-lg'>Download our app using Playstore or Appstore</p>
        <div className="flex flex-col justify-center mt-10 sm:flex-row">
            <img className='w-48 h-16 cursor-pointer' src={play_store} alt="" />&nbsp;
            <img className='w-48 h-16 cursor-pointer' src={app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload