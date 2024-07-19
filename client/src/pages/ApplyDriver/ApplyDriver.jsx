import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApplyDriver = () => {
  const {token, url} = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: ''
  });
  const [isChecked, setIsChecked] = useState(false);

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
          const { name } = response.data.user;
          setData(data => ({
            ...data,
            name: name
          }));
        }
      } catch (err) {
        console.error('Error fetching user details', err);
      }
    };

    fetchUserDetails();
  }, [token, url]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleConfirmClick = () => {
    if (isChecked) {
      navigate('/driver');
    } else {
      alert('Please check the checkbox to continue');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='mx-20 my-12'>
      <h2 className='text-2xl font-bold'>Terms and Conditions</h2>
      <div className='flex flex-col gap-5 mt-7'>
        <div className='grid items-center text-base p-2.5 px-5 text-gray-500 border border-blue-500 bg-blue-50'>
          <b>1. Eligibility Criteria</b>
          <ol className='list-disc list-inside mt-2 ml-6'>
            <li>Applicants must be at least 21 years old.</li>
            <li>Applicants must possess a valid and current driver's license, with an expiry date more than 6 months from the current date.</li>
            <li>Applicants need to submit one address proof document, such as an Aadhar card photo or any other valid address proof document.</li>
            <li>Applicants must have a clean driving record with no major traffic violations in the past 3 years.</li>
            <li>Applicants must pass a background check, including a criminal record check.</li>
            <li>Applicants must provide proof of eligibility to work in the country.</li>
          </ol>
          <b className='mt-2'>2. Application Process</b>
          <ol className='list-disc list-inside mt-2 ml-6'>
            <li>Applicants must complete the online application form and submit all required documents.</li>
            <li>Applicants will be required to attend an in-person or virtual interview.</li>
            <li>Successful applicants will undergo a driving test to assess their driving skills and knowledge of traffic laws.</li>
          </ol>
          <b className='mt-2'>3. Vehicle Use</b>
          <ol className='list-disc list-inside mt-2 ml-6'>
            <li>Drivers are responsible for maintaining the cleanliness and condition of the rental vehicle.</li>
            <li>Drivers must adhere to all traffic laws and regulations while operating the vehicle.</li>
            <li>Drivers must report any damage, accidents, or incidents involving the vehicle to the company immediately.</li>
            <li>Smoking, consumption of alcohol, or use of illegal substances in the vehicle is strictly prohibited.</li>
          </ol>
          <b className='mt-2'>4. Conduct and Professionalism</b>
          <ol className='list-disc list-inside mt-2 ml-6'>
            <li>Drivers are expected to maintain a professional demeanor and provide courteous service to all customers.</li>
            <li>Drivers must wear appropriate attire while on duty.</li>
            <li>Drivers must not engage in any behavior that could be considered discriminatory, harassing, or offensive to customers or colleagues.</li>
          </ol>
          <b className='mt-2'>5. Compensation and Fees</b>
          <ol className='list-disc list-inside mt-2 ml-6'>
            <li>Drivers will be compensated based on a predetermined rate per hour or per trip, as agreed upon in the contract.</li>
            <li>Drivers may be eligible for bonuses or incentives based on performance and customer feedback.</li>
            <li>Drivers are responsible for any fines or penalties incurred while operating the vehicle.</li>
          </ol>
          <b className='mt-2'>6. Termination</b>
          <ol className='list-disc list-inside mt-2 ml-6'>
            <li>The company reserves the right to terminate the driver's contract at any time for any breach of these terms and conditions.</li>
            <li>Drivers may terminate their contract by providing written notice to the company with a minimum of 14 days' notice.</li>
          </ol>
          <b className='mt-2'>7. Liability</b>
          <ol className='list-disc list-inside mt-2 ml-6'>
            <li>The company is not responsible for any personal property left in the vehicle by the driver or customers.</li>
            <li>Drivers are liable for any damage caused to the vehicle due to negligence or misuse.</li>
            <li>The company will provide insurance coverage for the vehicle, but drivers must comply with all terms of the insurance policy.</li>
          </ol>
          <b className='mt-2'>8. Confidentiality</b>
          <ol className='list-disc list-inside mt-2 ml-6'>
            <li>Drivers must maintain the confidentiality of all customer information and company data.</li>
            <li>Any breach of confidentiality may result in immediate termination and legal action.</li>
          </ol>
          <b className='mt-2'>9. Amendments</b>
          <ol className='list-disc list-inside mt-2 ml-6'>
            <li>The company reserves the right to amend these terms and conditions at any time. Drivers will be notified of any changes in writing.</li>
          </ol>
          <b className='mt-2'>10. Acceptance</b>
          <ol className='list-disc list-inside mt-2 ml-6'>
            <li>By applying for and accepting a position as a driver, the applicant agrees to comply with all the terms and conditions outlined above.</li>
          </ol>
          <div className='mt-4'>
            <label className='flex items-start mt-5'>
              <input type='checkbox' className='mt-1' checked={isChecked} onChange={handleCheckboxChange}/>
              <span className='ml-2'>
                I, <b>{data.name}</b>, have read and understood the terms and conditions for applying as a driver in the car rental app. I agree to abide by these terms and conditions and understand that any violation may result in the termination of my contract.
              </span>
            </label>
            <center><button onClick={handleConfirmClick} className='bg-blue-600 text-white p-2 rounded-lg text-md w-40 mt-4'>Confirm</button></center>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default ApplyDriver;
