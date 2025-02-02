import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const rentId = searchParams.get("rentId");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();
    useEffect(()=>{
        const verifyPayment = async() =>{
            const response = await axios.post(url+"/api/book/verify",{success,rentId});
            if (response.data.success){
                navigate("/mybooking")
            }
            else{
                navigate("/")
            }
        }
        verifyPayment();
    },[success, rentId, url, navigate])
  return (
    <div className='min-h-[60vh] grid'>
        <div className='w-12 h-12 justify-center border-4 border-gray-400 border-t-blue-500 rounded-full animate-rotate'>
        </div>
    </div>
  )
}

export default Verify