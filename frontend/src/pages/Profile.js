import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/profile.module.css'
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

  if (!profileData) {
    return (
      <div>Loading...</div>
    )
  } else if (profileData) {
    return (
      <>
        <div className={styles.header}>
          <h1>Welcome to your profile page</h1>
          <h3>Redirect through these links 👍</h3>

          <div className={styles.text_container}>
            <h3>Discover</h3>
            <h3>|</h3>
            <h3>Settings</h3>
            <h3>|</h3>
            <h3>Log out</h3>
          </div>
        </div>
        <div className={styles.profile}>
          <img className={styles.picture} src={`http://localhost:5000/uploads/${profileData.photo}`} />
          <h2>{profileData.username}</h2>
          <h3>{profileData.email}</h3>
          <div className={styles.text_container}>
            <h3>Posts: 0</h3>
            <h3>Upvotes: 0</h3>
          </div>
        </div>
        <div>
          <h1>Your Posts:</h1>
        </div>
      </>
    )
  }


}

export default Profile