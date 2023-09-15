import { Card } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Form from '../../components/Form'
import Listings from '../../components/Listings'
import './styles.css'

const VC = () => {

    const user = JSON.parse(localStorage.getItem('currentUser'))

    const [flag, setFlag] = useState();
   const [load,setload]=useState(false);

    useEffect(() => {
        console.log(user,"fsd")
        if(!user){
            console.log('no user')
            setload(true);
        }else{
            if (user.username === "vc") {
                setFlag(true)
            } else {
                setFlag(false)
            }
        }
        
    }, [])


    return (
        <>
            <div className='h-[140vh] formpage bg-[#efc97c]'>
                
                   
                    
                            <h1 className='text-5xl w-[50%] mx-auto text-center my-10 border-none rounded-lg bg-yellow-400 p-4'><span className='text-red-600'>Registration</span></h1>
                            <h1 className='text-3xl  text-center mb-10 underline'>Enter your details for admission process</h1>
                            <Form />
                        
                   
                    
                            {/* <h1 className='text-5xl w-[50%] mx-auto text-center my-10 border-none rounded-lg bg-yellow-400 p-4'>Welcome to Idea<span className='text-red-600'>LAND</span></h1>
                            <h1 className='text-3xl  text-center mb-10 underline'>The MarketPlace is Burning with Hot new Ideas!! Exploreee</h1> */}
                            <Listings />
                        
                  
                
                
            
            </div>
        </>
    )
}

export default VC
