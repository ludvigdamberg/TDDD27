import React from 'react'
import styles from '../styles/styles.module.css'
const Landing = () => {
  return (
    <>
    <div className={styles.Header}>
        <div className={styles.text_container}>
        <h1>Welcome to Liqour Buddy!</h1>
        <p>A project by Ludvig Damberg and Ludvig Hillert for Linköping University. </p>
        <p>Scroll down to see a checklist for our project and test the current features! Keep in mind that this is a project
            under developement, some features might not work or have any response. 🍹🍻
        </p>
        </div>
        <div className={styles.image_container}>
            <img alt='' src='../../content/landing.jpg'/>
        </div>
    </div>
    <div className={styles.Header2}>
        <div className={styles.card}>
            <h1>Functionality 🍺</h1>
            <ul className={styles.list}>
           <li className={styles.item}>Creating Posts  </li>
           <li className={styles.item}>Account Sign Up  </li>
           <li className={styles.item}>Logging In  </li>
           <li className={styles.item}>Authentication Checking </li>
           <li className={styles.item}>Post filtering and priority</li>
           </ul>
        </div>
        <div className={styles.card}>
            <h1>Pages🍺</h1>
            <ul className={styles.list}>
           <li className={styles.item}>Home </li>
           <li className={styles.item}>Profile </li>
           <li className={styles.item}>Discover </li>
           <li className={styles.item}>Log In and Sign Up </li>
           <li className={styles.item}>Crate Post </li>
           </ul>
        </div>
        <div className={styles.card}>
            <h1>User Experience🍺</h1>
            <ul className={styles.list}>
           <li className={styles.item}>Scrolling Triggers </li>
           <li className={styles.item}>Hover Interactions </li>
           <li className={styles.item}>Instructional Interface </li>
           <li className={styles.item}>Easy Usage </li>
           <li className={styles.item}>Consistent Theme </li>
           
           </ul>
        </div>
    </div>
    </>
  )
}

export default Landing