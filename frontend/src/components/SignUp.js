import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import styles from '../styles/login.module.css'
const SignUp = () => {


  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")


  const handleSignup = () => {


    console.log({ email, username, password })

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    axios.post("http://localhost:5000/register", { email, username, password }, config)
      .then((res) => {
        console.log(res.data)
      }).catch((err) => console.log(err))

  }

  return (
    <div className={styles.container}>

      <div className={styles.inputs}>
        <p>Username</p>
        <input type='text' className={styles.input} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className={styles.inputs}>
        <p>Email</p>
        <input type='text' className={styles.input} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className={styles.inputs}>
        <p>Password</p>
        <input type='password' className={styles.input} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className={styles.inputs}>
        <button className={styles.button} onClick={handleSignup}>Register</button>
      </div>
    </div>

  )
}

export default SignUp