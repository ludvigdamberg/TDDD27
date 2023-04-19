import React from 'react'
import {useState, useRef, useEffect} from 'react'
import axios from 'axios'
import styles from '../styles/login.module.css'

const LoginForm = () => {


    const[password,setPassword] = useState("")
    const[email,setEmail] = useState("")
  
    const handleLogin = () => {

        axios.post("http://localhost:5000/login", {email, password})
        .then((res) => {
            console.log(res.data)
        }).catch((err) => console.log(err))

    }

  return (
  
   <div className={styles.container}>

  
      <div className={styles.inputs}>
      <p>Email</p>
      <input type='text' className={styles.input} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div className={styles.inputs}>
      <p>Password</p>
      <input type='password' className={styles.input} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div className={styles.inputs}>
      <button className={styles.button} onClick={handleLogin}>Login</button>
      </div>
  </div>
  )
}

export default LoginForm