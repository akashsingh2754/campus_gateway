import React, { useEffect, useState } from 'react'

const Listings = () => {
    const [ideas, setIdeas] = useState([])
    useEffect(() => {

        fetch('http://localhost:4000/idea/')
            .then((response) => response.json())
            .then((data) => {
                setIdeas(data.idea)
            })
    }, [])

    return (
        <div className='flex'>
            {
                ideas.map((i) => {
                    return (
                        <>

                            <div className='flex h-full items-center '>

                                <div className='card 3 flex-col m-10 mx-24' onClick={() => console.log('clicked')}>
                                    <div className='border-4 border-black rounded-lg h-80 bg-gray-300'>
                                        <h1 className='text-3xl border-none bg-[#f7c590] mb-5 p-5'>{i.title}</h1>
                                        <p className='my-3'>Founder : <span className='text-black'>{i.name}</span> </p>
                                        <p className='my-3'>Domain : {i.domain}</p>
                                        <p className='my-3'>Domain : {i.description}</p>
                                        <p className='my-3'>Revenue This Year : {i.revenue} Lakhs</p>
                                        <p className='my-3'>Valuation : {i.valuation} lakhs </p>

                                    </div>

                                    <button className='border-none p-2 my-2 bg-yellow-300 hover:pl-3 transition-all ease-in duration-150' ><a href='https://front.vercel.app/ blank=_target'>Intrested</a></button>
                                </div>

                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}

export default Listings
