import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Rent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    id, name, price, carLocation, description, image, model, color, seats,
    subtotal, driverFee, totalAmount,pickupDate, pickupTime, dropoffDate, dropoffTime,deliveryOption,
  } = location.state;

  const {token,url}= useContext(StoreContext);

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    from:"",
    to:"",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!token) {
        return;
      }
      try {
        const response = await axios.get(`${url}/api/user/get-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          const { name, email, phone } = response.data.user;

          const splitName = name.split(' ');
          const firstName = splitName[0];
          const lastName = splitName.slice(1).join(' ');

          setUser({ firstName, lastName, email, phone });
          setData(data => ({
            ...data,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            from: deliveryOption === 'branch' ? carLocation : ''
          }));
        }
      } catch (err) {
        console.error('Error fetching user details', err);
      }
    };

    fetchUserDetails();
  }, [token, url, deliveryOption, carLocation]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const car = {
    id: id,
    name: name,
    price: price,
    carLocation: carLocation,
    description: description,
    image: image,
    model: model,
    color: color,
    seats: seats,
  };

  const rentBooking =async(event)=>{
    event.preventDefault();
    handlePayment();
  };

  const processRentBooking = async () => {
    let rentData = {
        address: data,
        caritem: car,
        amount: totalAmount,
        userId: token.userId,
        pickupdate: pickupDate,
        dropoffdate: dropoffDate,
        pickuptime: pickupTime,
        dropofftime: dropoffTime,
        };

      try{
        let response = await axios.post(url + "/api/book/rent", rentData, { headers: { token } });
    
        if(response.data.success){
            const { rentId, amount, currency, success_url, cancel_url } = response.data;
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: amount,
                currency: currency,
                name: "Voyager Car-Rental-Solution",
                description: "Test Transaction",
                order_id: rentId,
                handler: function (response) {
                  window.location.href = `${success_url}&payment_id=${response.razorpay_payment_id}`;
                },
                prefill: {
                  name: `${data.firstName} ${data.lastName}`,
                  email: data.email,
                  contact: data.phone,
                },
                notes: {
                  address: `${data.street}, ${data.city}, ${data.state}, ${data.zipcode}, ${data.country}`,
                },
                theme: {
                  color: "#3399cc",
                },
              };

              const rzp1 = new window.Razorpay(options);
              rzp1.on('payment.failed', function (response) {
                window.location.href = `${cancel_url}&error=${response.error.description}`;
              });
              rzp1.open();
            } else {
              alert("Error");
            }
      }
      catch(err){
        console.error("Error placing order:", err);
        alert("Error placing order. Please try again.");
      }
    };

    useEffect(()=>{
        if(totalAmount===0){
          navigate("/")
        }
      },[totalAmount,navigate])
      const handlePayment = () => {
        if (token) {
          processRentBooking();
      } else {
        alert('Please sign in to continue.');
      }    
      };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <form onSubmit={rentBooking} className='flex flex-wrap justify-between items-start gap-[50px] my-24 mx-20'>
        <div className='flex-1 p-[2.5] w-full max-w-[max(30%,500px)]'>
            <p className='text-[30px] font-semibold mb-[50px]'>Booking Information</p>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="firstName" type='text' onChange={onChangeHandler} value={data.firstName}  placeholder='First name' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="lastName" type='text' onChange={onChangeHandler} value={data.lastName}  placeholder='Last name' required/>
            </div>
            <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="email" type='email' onChange={onChangeHandler} value={user.email}  placeholder='Email address' readOnly/>
            <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="phone" type='tel' onChange={onChangeHandler} value={user.phone}  placeholder='Phone' readOnly/>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="from" type='text' onChange={onChangeHandler} value={data.from}  placeholder='From place' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="to" type='text' onChange={onChangeHandler} value={data.to}  placeholder='To place' required/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="pickupdate" type='date' value={pickupDate} placeholder='PickUpDate' readOnly/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="dropoffdate" type='date' value={dropoffDate} placeholder='DropOffDate' readOnly/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="pickuptime" type='time' value={pickupTime} placeholder='PickUpTime' readOnly/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="dropofftime" type='time' value={dropoffTime} placeholder='DropOffTime' readOnly/>
            </div>
            <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="street" type='text' onChange={onChangeHandler} value={data.street}  placeholder='Street address' required/>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="city" type='text' onChange={onChangeHandler} value={data.city}  placeholder='City' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="state" type='text' onChange={onChangeHandler} value={data.state}  placeholder='State' required/>
            </div>
            <div className='flex gap-[10px]'>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="zipcode" type='text' onChange={onChangeHandler} value={data.zipcode}  placeholder='Zip code' required/>
                <input className='mb-[15px] text-sm w-full p-[8px] border border-[#c5c5c5] rounded-[4px] outline-blue-500' name="country" type='text' onChange={onChangeHandler} value={data.country}  placeholder='Country' required/>
            </div>
        </div>
        <div className='flex-1 p-[2.5] w-full max-w-[max(30%,500px)]'>
            <div>
                <p className='text-[25px] font-semibold mb-[30px]'>Rent Total</p>
                <div className='flex justify-between my-5'>
                    <p>SubTotal</p>
                    <p className='font-semibold'>₹ {subtotal}</p>
                </div>
                <hr className="border-0 bg-gray-400" style={{ height:'0.5px'}}/>
                <div className='flex justify-between my-5'>
                    <p>Driver Fee</p>
                    <p className='font-semibold'>₹ {driverFee}</p>
                </div>
                <hr className="border-0 bg-gray-400" style={{ height:'0.5px'}}/>
                <div className='flex justify-between my-5'>
                    <b>Total</b>
                    <b className='font-semibold'>₹ {totalAmount}</b>
                </div>
                <button type='submit' className='mt-4 text-sm bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-400'>Proceed To Payment</button>
            </div>
        </div>
    </form>
  )
}

export default Rent