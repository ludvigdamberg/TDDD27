import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const [profileData, setProfileData] = useState()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLoggedIn = async () => {
   
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoggedIn(false);
        navigate('/login');
        return;
      }
      const response = await axios.get('http://localhost:5000/profile', {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        setIsLoggedIn(true);
      }).catch(err => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        navigate('/login')
      })
  }

  const fetchProfile = async () => {

    setLoading(true)
    
      const token = localStorage.getItem('token');
      console.log(token)
      
      axios.get('http://localhost:5000/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        setProfileData(res.data);
        console.log(profileData)
      }).catch(err => console.log(err))

      setLoading(false)
      
   
  }

  useEffect(() => {
    checkLoggedIn()
    fetchProfile()
    
   
  }, [])

  if(!profileData){
    return(
      <div>Loading...</div>
    )
  }else if(profileData){
    return (
  <div>
    <h1>{profileData.username}</h1>
    <h1>{profileData.email}</h1>
   <img src={`http://localhost:5000/uploads/${profileData.photo}`}/>
  </div>
 )
  }
 

}

export default Profile