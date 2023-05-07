import React from 'react'
import styles from '../styles/login.module.css'
import SignUp from '../components/SignUp'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import buttons from '../styles/login.module.css'

const Register = () => {
  return (
    <div className={styles.parent}>
      <div className={styles.left}>
      <div className={buttons.arrow}><Link to='/'><FaArrowLeft /></Link></div>
        <h1 className={styles.label}>Register</h1>
        <SignUp/>
      </div>
      <div className={styles.right}>
        <div className={styles.image_container}>
          <img src='../content/cheers.jpg' />
        </div>
      </div>
    </div>
  )
}

export default Register