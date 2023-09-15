import React from 'react'
import { useNavigate } from 'react-router-dom'
import './guide.css'
// import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const Finance = () => {
    let navigate = useNavigate()
  return (
    <>

    <div className='f flex-col  h-full absolute top-20 text-white text-2xl font-mono'>
        <h1 className='my-4 mb-8 mx-auto underline' style={{color:'black'}}>Welcome to the <span className='font-bold' style={{color:'black'}} >Finance Guide </span></h1>

        <h1 className='text-xl mb-12 text-gray-100 w-[70%] bg-gray-600 p-8 rounded-xl mx-auto shadow-lg'>Every business needs financial stability. Yes, cash flow is important, but not at the risk of losing control over finances. What are the financial challenges that a business, especially a start-up, is likely to face? Are you prepared to tackle them and survive any financial instability?</h1>
        {/* <KeyboardDoubleArrowDownIcon /> */}

        <button className='border-2 border-blue-400 rounded-md bg-blue-600 p-4 my-4 w-full' onClick={()=>navigate("/finance")}>Click Here To Know More</button>
    </div>
    </>
  )
}

export default Finance