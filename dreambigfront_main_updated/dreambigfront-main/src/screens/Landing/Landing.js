
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
                  "Build your career"
                ],
                autoStart: true,
                loop: true,
              }}
            /></h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns11'>
         
      <Link to='/adminlogin' className='btn22-mobile'>  <button class="button">I'm  Admin</button></Link>
      <Link to='/studentlogin' className='btn22-mobile'>  <button class="button">I'm  Candidate</button></Link>
       
      </div>
    </div>
      
    
  );
}

export default Landing;
