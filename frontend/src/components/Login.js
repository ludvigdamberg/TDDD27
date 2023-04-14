import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const Login = () => {

    
    const[password,setPassword] = useState("")
    const[email,setEmail] = useState("")

    const Login = () => {

      console.log({email,password})


        axios.post("http://localhost:5000/login", {email, password})
        .then((res) => {
            console.log(res.data)
        }).catch((err) => console.log(err))

    }

  return (
    <div>
        <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
        <input type='text' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={Login}>Sign up</button>

    </div>
  )
}

export default Login