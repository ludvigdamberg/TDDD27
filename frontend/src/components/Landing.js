import React from 'react'
import '../styles.css'

const Landing = () => {
  return (
    <>
    <div className='Header'>
        <div className='text-container'>
        <h1>Welcome to Liqour Buddy!</h1>
        <p>A project by Ludvig Damberg and Ludvig Hillert for Linköping University </p>
        <p>Scroll down to see a checklist for our project and test the current features! Keep in mind that this is a project
            under developement, some features might not work or have any response.
        </p>
        </div>
        <div className='image-container'>
            <img alt='' src='../../content/landing.jpg'/>
        </div>
    </div>
    <div className='Header2'>
        <div className='card'>
            <h1>Functionality</h1>
            <ul className='list'>
           <li className='item'>Creating Posts </li>
           <li className='item'>Account Sign Up </li>
           <li className='item'>Logging In </li>
           <li className='item'>Authentication Checking </li>
           </ul>
        </div>
        <div className='card'>
            <h1>Pages</h1>
            <ul className='list'>
           <li className='item'>Home </li>
           <li className='item'>About </li>
           <li className='item'>Discover </li>
           <li className='item'>Log In and Sign Up </li>
           <li className='item'>Crate Post </li>
           </ul>
        </div>
        <div className='card'>
            <h1>User Experience</h1>
            <ul className='list'>
           <li className='item'>Scrolling Uriggers </li>
           <li className='item'>Hover Unteractions </li>
           <li className='item'>Instructional Unterface </li>
           <li className='item'>Easy Usage </li>
           <li className='item'>Consistent Theme </li>
           
           </ul>
        </div>
    </div>
    </>
  )
}

export default Landing