import React from 'react'
import {useState, useRef, useEffect} from 'react'
import styles from '../styles/login.module.css'



const Login = () => {
const userRef = useRef();
const errRef = useRef();

  const[password,setPassword] = useState("")
  const[email,setEmail] = useState("")
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  return (
  <div className={styles.parent}>
   <div className={styles.left}>
    <h1>LOGIN TO START SHARING THE FUN!</h1>
   </div>
 
   <div className={styles.card}>
   <label htmlFor = "Email">Email:  </label>
        <input
         type='text'
         id='Email'
         ref ={userRef}
         autocomplete = "off"
         onChange={(e) => setEmail(e.target.value)} 
         value = {email}
         required/>

<label htmlFor = "password">Password:  </label>
        <input
         type='text' 
         id="password" 
         ref ={userRef}
         onChange={(e) => setPassword(e.target.value)}
         value = {password}
         required/>

         <button>Sign in</button>

         </div>
     <div className={styles.right}>
  <div className={styles.image_container}>
    <img src='../content/cheers.jpg'/>
    </div>
   </div>
   </div>
  )
}

export default Login