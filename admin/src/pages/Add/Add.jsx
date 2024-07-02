import React,{ useState } from 'react'
import upload_area from '../../assets/upload_area.png'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

  // const url = 'http://localhost:3005';
  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Benz",
    location:"Manglore"
  })
  const onChangeHandler =(event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("location",data.location)
    formData.append("image",image)
    const response =await axios.post(`${url}/api/car/add`,formData);
    if(response.data.success){
      setData({
        name:"",
        description:"",
        price:"",
        category:"",
        location:""
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }
  return (
    <div className='w-[70%] ml-20 mt-12 text-[#6d6d6d] text-base'>
      <form className='flex-col gap-5' onSubmit={onSubmitHandler}>
          <div className="flex-col">
            <p>Upload Image</p>
            <label htmlFor='image'>
              <img className='w-32' src={image?URL.createObjectURL(image):upload_area} alt=''/>
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required/>
          </div>
          <div className="flex-col w-custom">
            <p>Car name</p>
            <input className='p-3 border border-black text-sm' onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required/>
          </div>
          <div className="flex-col w-custom">
            <p>Car description</p>
            <textarea className='p-3 border border-black text-sm' onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Write content here' required></textarea>
          </div>
          <div className="flex gap-7 w-custom">
            <div className="flex-col w-[198px]">
              <p>Car category</p>
              <select className='p-2 border border-black text-sm' onChange={onChangeHandler} name="category" >
                <option value="Benz">Benz</option>
                <option value="BMW">BMW</option>
                <option value="Ford">Ford</option>
                <option value="Nissan">Nissan</option>
                <option value="Subaro">Subaro</option>
                <option value="Tesla">Tesla</option>
              </select>
            </div>
            <div className="flex-col w-[198px]">
              <p>Car location</p>
              <select className='p-2 border border-black text-sm' onChange={onChangeHandler} name="location" >
                <option value="Manglore">Manglore</option>
                <option value="Puttur">Puttur</option>
                <option value="Bantwal">Bantwal</option>
              </select>
            </div>
          </div>
          <div>
            <div className="flex-col w-custom">
              <p>Car price</p>
              <input className='p-2 border border-black text-sm' onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='Rs.200'/>
            </div>
          </div><br/>
          <button type='submit' className='w-custom border border-none p-3 bg-[green] text-white cursor-pointer'>ADD</button>
      </form>
    </div>
  )
}

export default Add