import React, { useEffect, useState } from 'react'


const Crowdfunding = () => {

    const [ideas, setIdeas] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/idea/')
            .then((response) => response.json())
            .then((data) => {
                setIdeas(data.idea)
            })
    }, [])

    return (
        <>

<div className='bg-yellow-400 h-[100vh]'>

            <h1 className='text-5xl w-[50%] mx-auto text-center my-10 border-none rounded-lg bg-yellow-400 p-4'>CrowdFundddd</h1>
            <h1 className='text-3xl  text-center mb-10 underline'>Lend a Helping Hand and make the World a Better Place!!</h1>
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

                                        <button>Donate Now</button>
                                    </div>
                                   
                                </div>
                            </>
                        )
                    })
                }
            </div>
</div>
        </>
    )
}


export default Crowdfunding