import React, { useContext,useState, useEffect  } from 'react'
import logo from '../../assets/logo.png'
import profile_icon from '../../assets/profile_icon.png'
import booking_icon from '../../assets/booking_icon.png'
import logout_icon from '../../assets/logout_icon.png'
import { Link, useNavigate } from 'react-router-dom';
import { FaBars,FaSearch, FaChevronDown } from 'react-icons/fa';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {

const{token,setToken}=useContext(StoreContext);
const navigate = useNavigate(); 
const [userImage, setUserImage] = useState(null);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

useEffect(() => {
  const storedImage = localStorage.getItem('userImage');
  if (storedImage) {
    setUserImage(`http://localhost:4001/${storedImage}`); // Set userImage state to the stored image path
  }else {
    setUserImage(profile_icon); // Set default profile icon if no image path found
  }
}, [token]);

const handleImageError = () => {
  setUserImage(null); // Set userImage state to null on image load error
};

const logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("userImage");
    setToken("");
    setUserImage(null); // Clear userImage state on logout
    navigate("/");
}
return (
  <div className="Navbar bg-blue-300">
    <nav className='flex flex-col'>
      <div className="max-w-[1170px] text-white mx-auto flex justify-between items-center py-8 font-bold h-24 ">
      <div className="flex gap-10 items-center">
        <div className="px-1 cursor-pointer">
          <Link to='/'><img src={logo} className="w-[200px]" alt="logo" /></Link>
        </div>
        <ul className='flex flex-row space-x-4'>
          <li className="hidden lg:block cursor-pointer p-4"><Link to='/'>Home</Link></li>
          <li className="hidden lg:block cursor-pointer p-4"><Link to='/about'>About</Link></li>
          <li className="hidden lg:block cursor-pointer p-4"> <Link to='/contact'>Contact</Link></li>
          <li className="hidden lg:block cursor-pointer p-4 relative group"> <Link to='/blogs'>Blogs<FaChevronDown className="inline ml-1"/></Link>
              <ul className="absolute hidden group-hover:block bg-white text-blue-900 mt-2 rounded-md shadow-lg"style={{ width: '100%', zIndex: 50 }}>
                  <li className="p-2 hover:bg-blue-200 hover:rounded-md cursor-pointer"><Link to='/add-blog'>Add Blog</Link></li>
                  <li className="p-2 hover:bg-blue-200 hover:rounded-md cursor-pointer"><Link to='/ratings'>Review &Rating</Link></li>
              </ul>
          </li>
        </ul>
      </div>
      <div className="flex gap-6 items-center mx-4">
        <div className="relative hidden sm:block">
          <input type="text" placeholder="Search" className="p-2 rounded-full text-blue-900 placeholder-blue-200 border border-blue-900 focus:outline-none"/>
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-900" />
        </div>
        {!token?(
          <button className='bg-white text-blue-900 rounded-full p-2 cursor-pointer transition duration-500 hover:bg-blue-700 hover:text-white' onClick={()=>setShowLogin(true)}>Sign In</button>)
        :(<div className='relative group'>{userImage ? (
        <img src={userImage} alt='Profile Icon'className='w-[60px] rounded-full' onError={handleImageError}/>
        ) : (  <img src={profile_icon} alt="Profile Icon" className="w-[60px] rounded-full"/>)}
        <ul className="absolute hidden right-0 z-[1] group-hover:flex flex-col gap-3 bg-orange-200 px-8 py-3 border border-blue-400 rounded-md outline outline-2 outline-white list-none">
            <li className='flex content-center gap-2 cursor-pointer hover:text-orange-400'onClick={()=>navigate('/get-profile')}><img className="w-6" src={profile_icon} alt=""/><p className='font-normal'>Profile</p></li>
            <hr/>
            <li className='flex content-center gap-2 cursor-pointer hover:text-orange-400' onClick={()=>navigate('/mybooking')}><img className="w-6" src={booking_icon} alt=""/><p className='font-normal'>Booking</p></li>
            <hr/>
            <li className='flex content-center gap-2 cursor-pointer hover:text-orange-400' onClick={logout}><img className="w-6" src={logout_icon} alt=""/><p className='font-normal'>Logout</p></li>
        </ul>
    </div>)}
        <div className="lg:hidden">
          <FaBars className="text-white text-2xl cursor-pointer" onClick={() => setIsMobileMenuOpen(true)}/>
        </div>
      </div>
      </div>
      <div className={`fixed inset-0 bg-blue-300 text-white p-4 transition-transform transform ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}style={{ width: '30%',height:'100%', zIndex: 50 }} >
          <button className="text-white text-2xl mb-2" onClick={() => setIsMobileMenuOpen(false)}> x </button>
          <ul className="flex flex-col ml-4">
            <li className="cursor-pointer p-2">
              <Link to='/' onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            </li>
            <li className="cursor-pointer p-2">
              <Link to='/about' onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            </li>
            <li className="cursor-pointer p-2">
              <Link to='/contact' onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </li>
            <li className="cursor-pointer p-2 relative group">
              <Link to='/blogs' onClick={() => setIsMobileMenuOpen(false)}>Blogs<FaChevronDown className="inline ml-1"/></Link>
              <ul className="absolute hidden group-hover:block bg-white text-blue-900 mt-2 rounded-md shadow-lg"style={{ width: '100%', zIndex: 50 }}>
                  <li className="p-2 hover:bg-blue-200 hover:rounded-md cursor-pointer"><Link to='/add-blog'>Add Blog</Link></li>
                  <li className="p-2 hover:bg-blue-200 hover:rounded-md cursor-pointer"><Link to='/ratings'>Review &Rating</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      <div className="block sm:hidden w-full mt-4 md:mt-0">
        <div className="flex items-center justify-center relative">
          <input type="text" placeholder="Search" className="w-full px-4 py-2 rounded-full text-blue-900 placeholder-blue-200 border border-blue-900 focus:outline-none"/>
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-900" />
        </div>
      </div>
    </nav>
  </div>
);
}
export default Navbar
