import React, { useState } from 'react'
import './Login.css'
import cross_icon from '../../assets/cross_icon.png'
import upload_area from '../../assets/upload_area.png'
const Login = ({setShowLogin}) => {
    const [image,setImage] = useState(false);
    const[currState,setCurrState]=useState("Login")
  return (
    <div className='login'>
        <form className='login-container'>
            <div className="login-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)}src={cross_icon} alt="Cross"/>
            </div>
            <div className="login-inputs">
                {currState==="Login"?<></>:<>
                <center>
                    <label htmlFor='image'><img className='rounded-lg' src={image?URL.createObjectURL(image):upload_area} alt=''/></label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
                </center>
                <input type="text" placeholder='Your Name' required/>
                <input type="number" placeholder='Phone Number' required/></>}  
                <input type="email" placeholder='Your Email'required/>
                <input type="password" placeholder='Password'required/>
            </div>
            <button>{currState==="Sign Up"?"Sign Up":"Login"}</button>
            <div className="login-condition">
                <input type='checkbox'required/>
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {currState==='Login'
            ?<p>Create a new Account?<span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
            :<p>Already have an account?<span onClick={()=>setCurrState("Login")}>Login here</span></p>
            }  
        </form>
    </div>
  )
}
export default Login