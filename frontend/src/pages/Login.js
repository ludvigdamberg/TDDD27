import React from 'react'
import styles from '../styles/login.module.css'
import LoginForm from '../components/LoginForm'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import buttons from '../styles/login.module.css'

const Login = () => {

  return (
    <div className={styles.parent}>

      <div className={styles.left}>
        <div className={buttons.arrow}><Link to='/'><FaArrowLeft /></Link></div>
        <h1 className={styles.label}>LOG IN</h1>
        <LoginForm />

        <p>or register <Link to='/register'>here</Link></p>
      </div>
      <div className={styles.right}>
        <div className={styles.image_container}>
          <img src='../content/cheers.jpg' />
        </div>
      </div>
    </div>
  )
}

export default Login