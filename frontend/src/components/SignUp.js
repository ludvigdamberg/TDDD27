import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import styles from '../styles/login.module.css'
import { useNavigate } from "react-router-dom";
const SignUp = () => {


  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [imageData,setImageData] = useState("")
  const navigate = useNavigate()

  
  const handleSignup = () => {


    console.log({ email, username, password, imageData })

    const formData = new FormData()
    formData.append('photo',imageData)
    formData.append('password',password)
    formData.append('username',username)
    formData.append('email',email)
    

    console.log({formData})


    axios.post("http://localhost:5000/register",formData)
      .then((res) => {
        console.log(res.data)
      })

      navigate('/login')
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
      
           <label className={styles.button} id="button">add image📸
            <input hidden type="file" id="button" onChange={(e) => setImageData(e.target.files[0])}/>
          </label>
      
        </div>
      <div className={styles.inputs}>
        <button className={styles.button} onClick={handleSignup}>Register</button>
      </div>
    </div>

  )
}

export default SignUp