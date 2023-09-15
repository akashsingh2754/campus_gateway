
import React from "react";
import Typewriter from "typewriter-effect";
// import { Button } from './Button';
import { Link } from 'react-router-dom';


import './HeroSection.css';
function Landing() {
  return (
 
    
        <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1><Typewriter
              options={{
                strings: [
                  "Build your dreams"
                ],
                autoStart: true,
                loop: true,
              }}
            /></h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns11'>
      <Link to='/signup' className='btn22-mobile'>  <button class="button">I'M USER</button> </Link>
         
      <Link to='/signup' className='btn22-mobile'>  <button class="button">I'M VC</button></Link>
       
      </div>
    </div>
      
    
  );
}

export default Landing;
