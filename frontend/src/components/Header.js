import React from 'react'
import {Link} from 'react-router-dom'
import styles from '../styles/header.module.css'

const Header = () => {
  return (
    
    <div className={styles.header}>
    <Link to='/register'>
    <div className={styles.button}>Register</div>
   </Link>
   <Link to='/login'>
    <div className={styles.button}>Login</div>
   </Link>
   <Link to='/feed'>
    <div className={styles.button}>Feed</div>
   </Link>
    </div>
  )
}

export default Header