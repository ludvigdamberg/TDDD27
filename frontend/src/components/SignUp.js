import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const SignUp = () => {

    const[username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const[email,setEmail] = useState("")

    const Signup = () => {

        
      console.log({email,username,password})

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

        axios.post("http://localhost:5000/register", {email,username,password},config)
        .then((res) => {
            console.log(res.data)
        }).catch((err) => console.log(err))

    }

  return (
    <div>
        <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
        <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
        <input type='text' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={Signup}>Sign up</button>

    </div>
  )
}

export default SignUp