import React from 'react';
import './About.scss';

const About = () => {
  return (
  <div className='about-container'>
      <div className='content'>
        <h1>Meet the Developers</h1>
        <h2>Check out the developers' Githubs to see what other projects they are working on, and their LinkedIns to connect!</h2>
        <div className='creator-wrapper'>


        <div className='creator'>
          <h3>Robert</h3>
          <img
          src='Robert-headshot.jpeg'
          alt='headshot of robert berman'
          className='headshot'></img>
          <a href='https://www.linkedin.com/in/robertbermantech/'>LinkedIn</a>
          <a href="https://github.com/robert-berman">Github</a>
        </div>
        <div className='creator'>
          <h3>Alberto</h3>
          <img
          src='alberto-headshot.jpeg'
          alt='headshot of alberto huerta'
          className='headshot'></img>
          <a href='https://www.linkedin.com/in/alberto-huerta-fullstackdev/'>LinkedIn</a>
          <a href="https://github.com/albertohuerta22">Github</a>
        </div>
        <div className='creator'>
          <h3>Samuel</h3>
          <img
          src='sam-headshot.jpeg'
          alt='headshot of samuel joh'
          className='headshot'></img>
          <a href='https://www.linkedin.com/in/samuel-joh/'>LinkedIn</a>
          <a href="https://github.com/sem0701">Github</a>
        </div>
        <div className='creator'>
          <h3>Ricardo</h3>
          <img
          src='ricky-headshot.jpg'
          alt='headshot of ricardo payares'
          className='headshot'></img>
          <a href='https://www.linkedin.com/in/ricardopayares/'>LinkedIn</a>
          <a href="https://github.com/rickypaya">Github</a>
        </div>

        </div>
      </div>
  </div>
  )
};

export default About;
