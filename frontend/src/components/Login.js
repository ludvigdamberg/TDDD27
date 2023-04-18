import React from 'react'
import {useState, useRef, useEffect} from 'react'
import axios from 'axios'

const Login = () => {

  const userRef = useRef();
  const errRef = useRef();

    const[password,setPassword] = useState("")
    const[email,setEmail] = useState("")
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // useEffect(()=>{
    //   userRef.current.focus();
 
    //  }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

  
    const handleLogin = () => {

      console.log({email,password})

      setSuccess(true);

        axios.post("http://localhost:5000/login", {email, password})
        .then((res) => {
            console.log(res.data)
        }).catch((err) => console.log(err))

    }

  return (
    <> 
        {success ? (
            <section>
                <h1>You are logged in!</h1>
                <br />
              
            </section>
        ) : (
    <div>
       <p ref={errRef} className = {errMsg ? "errmsg" : "offscreen"}
            aria-live = "assertive">{errMsg}</p>
            <h1>Sign In</h1>
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

        <button onClick={handleLogin}>Sign in</button>

    </div>
        )}
        </>
  )
}

export default Login