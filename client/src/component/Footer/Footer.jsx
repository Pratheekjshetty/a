import React from 'react'
import logo from '../../assets/logo.png'
import facebook_icon from '../../assets/facebook_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import linkedin_icon from '../../assets/linkedin_icon.png'
const Footer = () => {
  return (
    <div className='text-white bg-customGray flex flex-col items-center gap-5 px-8vw py-5 pt-20 mt-24' id='footer'>
        <div className="w-full grid grid-cols-1 md:grid-cols-2fr-1fr-1fr gap-20 px-32">
        <div className="flex flex-col items-start gap-5">
            <img className='rounded-full border border-none bg-white w-16'src={logo} alt="" width={100}/>
            <p>Welcome to Voyager, where we bring the best car rental experience right to your fingertips. Discover a wide range of vehicles and enjoy convenient booking 
                with every rental. Renting a car from your favorite local providers has never been easier. Our mission is to make car rentals quick, easy, and enjoyable.</p>
            <div className='flex flex-row'>
                <img className="w-10 mr-4" src={facebook_icon} alt="" />
                <img className="w-10 mr-4" src={twitter_icon} alt="" />
                <img className="w-10 mr-4" src={linkedin_icon} alt="" />
            </div>
        </div>
        <div className="flex flex-col items-start gap-5">
            <h2 className="text-2xl font-bold">Company</h2>
            <ul>
                <li className='list-none mb-2.5 curser-pointer'>Home</li>
                <li className='list-none mb-2.5 curser-pointer'>About Us</li>
                <li className='list-none mb-2.5 curser-pointer'>Booking</li>
            </ul>
            <h2 className="text-2xl font-bold">Legal</h2>
            <ul>
                <li className='list-none mb-2.5 curser-pointer'>Privacy Policy</li>
                <li className='list-none mb-2.5 curser-pointer'>Terms of Service</li>
                <li className='list-none mb-2.5 curser-pointer'>Refund Policy</li>
            </ul>
        </div>
        <div className="flex flex-col items-start gap-5">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <ul>
                <li className='list-none mb-2.5 curser-pointer'>Phone:+9876543210</li>
                <li className='list-none mb-2.5 curser-pointer'>Email:voyagerapp@gmail.com</li>
                <li className='list-none mb-2.5 curser-pointer'>Github:github.com/voyagerapp</li>
            </ul>
            <h2 className="text-2xl font-bold">Follow Us</h2>
            <ul>
                <li className='list-none mb-2.5 curser-pointer'>Facebook:facebook.com/voyagerapp</li>
                <li className='list-none mb-2.5 curser-pointer'>Instagram:instagram.com/voyagerapp</li>
                <li className='list-none mb-2.5 curser-pointer'>Twitter:twitter.com/voyagerapp</li>
            </ul>
        </div>
        </div>
        <hr className="w-full h-0.5 my-5 bg-gray-400 border-none"/>
        <p className='text-center'> © Copright 2024 Voyager.com - All Right Reserved.</p>
    </div>
  )
}
export default Footer