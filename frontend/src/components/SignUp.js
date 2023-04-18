import React from 'react'
import {useState, useRef, useEffect} from 'react'
import axios from 'axios'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();



    const[username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const[email,setEmail] = useState("")

    const [validName, setValidName] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
      setErrMsg('');
  }, [username, password])

  useEffect(() => {
    const result = USER_REGEX.test(username);
   
    setValidName(result);
}, [username])




    const handleSignup = () => {
      setSuccess(true);
        
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
<>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                    <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (

    <div>
      <h1>Register</h1>

      <label htmlFor="email">Email:</label>
        <input type='text' 
        placeholder='Email' 
        ref={userRef}
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="username">Username:</label>
        <input type='text'
         placeholder='Username' 
         ref={userRef}
         autoComplete="off"
         onChange={(e) => setUsername(e.target.value)}
         required
         />
        

        <label htmlFor="password">Password:</label> 
        <input type='password' 
        placeholder='Password' 
        onChange={(e) => setPassword(e.target.value)}
        value={password}/>
        
        <button disabled={!validName ? true : false} 
        onClick={handleSignup}>
          Sign up
          </button>

    </div>
     )}
     </>
  )
}

export default SignUp