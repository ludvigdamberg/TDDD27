import React from 'react'
import styles from '../styles/login.module.css'
import SignUp from '../components/SignUp'
const Register = () => {
  return (
    <div className={styles.parent}>
      <div className={styles.left}>
        <h1 className={styles.label}>Sign up❤️</h1>
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