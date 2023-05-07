import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/header.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const checkLoggedIn = async () => {

    const token = localStorage.getItem('token');
    if (!token) {
      logout()
      return;
    }
    const response = await axios.get('http://localhost:5000/profile', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setIsLoggedIn(true);
    }).catch(err => {
      localStorage.removeItem("token")
      logout()
    })
  }

  useEffect(() => {
    checkLoggedIn()


  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
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
  } else {
    return (
      <div className={styles.header}>
        <Link to='/profile'>
          <div className={styles.button}>Profile</div>
        </Link>
        <button className={styles.button} onClick={logout}><div>Log out</div></button>
        <Link to='/feed'>
          <div className={styles.button}>Feed</div>
        </Link>
      </div>
    )

  }

}

export default Header