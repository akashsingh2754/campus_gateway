import React from 'react'
import Finance from './Finance'
import './guide.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Guide = () => {

  let navigate = useNavigate()
  function func1(e) {
    e.currentTarget.parentElement.classList.add('hover-left')
  }

  function func2(e) {
    e.currentTarget.parentElement.classList.remove('hover-left')
  }

  function func3(e) {
    e.currentTarget.parentElement.classList.add('hover-right')

  }
  function func4(e) {
    e.currentTarget.parentElement.classList.remove('hover-right')

  }



  return (
    <div className='outer' >

      <div className='left' onMouseEnter={func1} onMouseLeave={func2}>
        <Finance />
      </div>

      <div className='right' onMouseEnter={func3} onMouseLeave={func4}>
        <Link to='/business'> business Strategy </Link>
      </div>

    </div>
  )
}

export default Guide