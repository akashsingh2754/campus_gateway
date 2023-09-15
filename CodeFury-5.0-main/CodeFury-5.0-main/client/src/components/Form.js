import React from 'react';
import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { Textarea } from '@mantine/core';
import { NumberInput, TextInput, Button, Box, Group } from '@mantine/core';
import ReactDOM from 'react-dom'
import logo from './bg.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
import axios from 'axios';
import { useState } from 'react';

const schema = Yup.object().shape({
    name: Yup.string().min(2, 'Name should have at least 2 letters'),
    email: Yup.string().email('Invalid email'),
    age: Yup.number().min(18, 'You must be at least 18 to create an account'),
});


function Productform() {

    const [data, setData] = useState({})

    const form = useForm({
        schema: yupResolver(schema),
        initialValues: {
            title: '',
            domain: '',
            name:'',
            description: '',
            revenue: '',
            founders: "",
            valuation: "",
            plans:"",
            extra:""    

        },
    });

    return (
        

        <div className='w-full flex h-[40%]'>
            <div className='w-[80%] mt-10 mx-10'>

                <Box sx={{ maxWidth: 640 }} >
                    <form onSubmit={form.onSubmit((values) => {
                  
                            console.log('HI')
                        toast.success("Form Submitted!!")
                        let startdata={
                            title: values.title,
                            domain: values.domain,
                            name:values.name,
                            description: values.description,
                            revenue: values.revenue,
                            founders: values.founders,
                            valuation: values.valuation,
                            plans: values.plans,
                            extra: values.extra,
                        }

                        const getback=axios.post('http://localhost:4000/idea/',startdata);  
                        getback.then(value=>  {
                            console.log(value);
                  
                             
                          
                  
                          })
                        
                    })}>

                        <TextInput
                            className=''
                            required
                            label="Your Project Title"
                            placeholder="Title"
                            {...form.getInputProps('title')}
                        />
                          <TextInput
                            required
                            label="Project Domain"
                            placeholder="Healthcare, Environmental.."
                            mt="sm"
                            {...form.getInputProps('domain')}
                        />
                        <TextInput
                            required
                            label="Creater's Name"
                            placeholder="John Doe"
                            mt="sm"
                            {...form.getInputProps('name')}
                        />
                        <Textarea
                            required
                            label="Pitch your Idea in no more than 200 Words"
                            placeholder="about product"
                            mt="sm"
                            {...form.getInputProps('description')}
                        />
                        <NumberInput
                            required
                            label="Total Revenue Generated This year (In Lakhs)"
                            placeholder="How many Units did you sell"
                            mt="sm"
                            {...form.getInputProps('revenue')}
                        />
                        <NumberInput
                            required
                            label="Number of Founders"
                            placeholder="1,2,3"
                            mt="sm"
                            {...form.getInputProps('founders')}
                        />
                      
                        <NumberInput
                            required
                            label="Valuation of the Company (in Lakhs)"
                            placeholder="100 Crores or what!!"
                            mt="sm"
                            {...form.getInputProps('valuation')}
                        />
                           <Textarea
                            required
                            label="Future Plans & Execution"
                            placeholder="about product"
                            mt="sm"
                            {...form.getInputProps('plans')}
                        />
                           <TextInput
                            required
                            label="Any Extra Achievement"
                            placeholder="Google Drive link / Newspaper / Magzine Articles"
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