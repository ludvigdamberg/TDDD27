import React from 'react'
import styles from '../styles/login.module.css'
import LoginForm from '../components/LoginForm'


const Login = () => {

  return (
    <div className={styles.parent}>
      <div className={styles.left}>
        <h1 className={styles.label}>LOGIN🎈</h1>
        <LoginForm />
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