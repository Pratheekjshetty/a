import React, { useContext,useState } from 'react'
import './Login.css'
import cross_icon from '../../assets/cross_icon.png'
import { StoreContext } from '../../context/StoreContext'
// import upload_area from '../../assets/upload_area.png'
import axios from 'axios'
const Login = ({setShowLogin}) => {

    // const [image,setImage] = useState(false);
    const {url,setToken} = useContext(StoreContext
    )
    const[currState,setCurrState]=useState("Login")
    const [data,setData] = useState({
        name:"",
        phone:"",
        email:"",
        password:""
    })
    const onChangeHandler =(event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    const onLogin =async(event) =>{
        event.preventDefault()
        let newUrl = url;
        if (currState==="Login"){
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        }
        const response = await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }
        else{
            alert(response.data.message);
        }
    }
  return (
    <div className='login'>
        <form onSubmit={onLogin} className='login-container'>
            <div className="login-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)}src={cross_icon} alt="Cross"/>
            </div>
            <div className="login-inputs">
                {currState==="Login"?<></>:<>
                {/* <center>
                    <label htmlFor='image'><img className='rounded-lg' src={image?URL.createObjectURL(image):upload_area} alt=''/></label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
                </center> */}
                <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required/>
                <input name='phone' onChange={onChangeHandler} value={data.phone} type="number" placeholder='Phone Number' required/></>}  
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email'required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password'required/>
            </div>
            <button type='submit'>{currState==="Sign Up"?"Sign Up":"Login"}</button>
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