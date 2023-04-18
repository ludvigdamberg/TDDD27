import React from 'react'
import styles from '../styles/login.module.css'


const Login = () => {

  return (
  <div className={styles.parent}>
   <div className={styles.left}>
    <h1>LOGIN TO START SHARING THE FUN!</h1>
   </div>
   <div className={styles.right}>
  <div className={styles.image_container}>
    <img src='../content/cheers.jpg'/>
    </div>
   </div>
   </div>
  )
}

export default Login