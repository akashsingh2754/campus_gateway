import React from 'react';
import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { Textarea } from '@mantine/core';
import { NumberInput, TextInput, Button, Box, Group } from '@mantine/core';
import ReactDOM from 'react-dom'
import logo from './bg.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { useState } from 'react';



function Productform() {
    const navigate = useNavigate();
    const [data, setData] = useState({})

    const form = useForm({
    
        initialValues: {
            title: '',
            domain: '',
            name:'',
            description: '',
            revenue: '',
            founders: "",
            valuation: "",
            plans:"",
            extra:"",    
            name: '',
            domain: '',
            description: '',
            revenue: '',
            founders: "",
            plans: "",
            extra: "",


        },
    });

    return (
        

        <div className='w-full flex h-[40%]'>
            <div className='w-[80%] mt-10 mx-10'>

                <Box sx={{ maxWidth: 640 }} >
                    <form onSubmit={form.onSubmit((values) => {
                  
                    
                        toast.success("Form Submitted!!")
                        let startdata={
                            FullName: values.title,
                            email: values.domain,
                            ContactNo:values.name,
                            Address: values.description,
                            DOB: values.revenue,
                            father: values.father,
                            mother: values.mother,
                            category: values.plans,
                            course: values.extra,
                        }

                        console.log(startdata,"dfbgiuegiuebfkyub")

                        const getback=axios.post('http://localhost:4000/idea/',startdata);  
                        getback.then(value=>  {
                            console.log(value,"fssss");
                  
                             
                          
                  
                          })

                          navigate("/")
                        
                    })}>

                        <TextInput
                            className=''
                            required
                            label="Full Name : "
                            placeholder="Enter your firt name"
                            {...form.getInputProps('title')}
                        />
                          <TextInput
                            required
                            label="Email :"
                            placeholder="Enter your email "
                            mt="sm"
                            {...form.getInputProps('domain')}
                        />
                        <TextInput
                            required
                            label="Contact Number : "
                            placeholder="Enter your contact number"
                            mt="sm"
                            {...form.getInputProps('name')}
                        />
                        <Textarea
                            required
                            label="Address: "
                            placeholder="Enter your address"
                            mt="sm"
                            {...form.getInputProps('description')}
                        />
                        <NumberInput
                            required
                            label="Date of birth"
                            placeholder="DD/MM/YY"
                            mt="sm"
                            {...form.getInputProps('revenue')}
                        />
                        <Textarea
                            required
                            label="Father's name"
                            placeholder="Enter your father's name"
                            mt="sm"
                            {...form.getInputProps('father')}
                        />
                      
                        <Textarea
                            required
                            label="mother's name"
                            placeholder="Enter your mother's name "
                            mt="sm"
                            {...form.getInputProps('mother')}
                        />
                           <Textarea
                            required
                            label="Category"
                            placeholder="Gen/OBC/SC/ST"
                            mt="sm"
                            {...form.getInputProps('plans')}
                        />
                           <TextInput
                            required
                            label="Course Applying for"
                            placeholder="MBA/MCA/B.tech/BBA...."
                            mt="sm"
                            {...form.getInputProps('extra')}
                        />


                        <Group className='my-10 border-2 w-[20%] text-white shadow-lg text-center hover:bg-yellow-500'>
                            <button type="submit"  className='mx-auto'>Submit</button>
                        </Group>
                    </form>


                </Box>

            </div>

            <div className='w-[50%] mx-auto text-center my-auto'>
                <img className='h-[150%]' src={logo}></img>
            </div>
            <ToastContainer autoClose = {5000} />
        </div>

    );
}

export default Productform