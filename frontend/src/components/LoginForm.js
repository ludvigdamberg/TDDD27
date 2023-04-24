import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import styles from '../styles/login.module.css'
import { useNavigate } from "react-router-dom";


const LoginForm = () => {


    const[password,setPassword] = useState("")
    const[email,setEmail] = useState("")
    const navigate = useNavigate()

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login',{email, password})
            return response.data.token
            console.log(response.data)
          } catch (error) {
            console.error(error);
            return null;
          }
    }

    const handleLogin = async (e) => {

        e.preventDefault();
        // Make API call to login endpoint and retrieve JWT token
        const token = await login();
        if (token) {
          // Save token to local storage or cookies for future use
          localStorage.setItem('token', token);
          // Redirect to dashboard page
          navigate('/profile');
        }

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