import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/profile.module.css'
import Post from '../components/Post'
import ProfilePosts from '../components/ProfilePosts'
import Loading from '../components/Loading';

const Profile = () => {

  const [profileData, setProfileData] = useState()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLoggedIn = async () => {

    const token = localStorage.getItem('token');
    if (!token) {
      logout()
      return;
    }
    const response = await axios.get('http://localhost:5000/profile', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setIsLoggedIn(true);
    }).catch(err => {
      localStorage.removeItem("token")
      logout()
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

    }).catch(err => console.log(err))

    setLoading(false)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    navigate('/')
  }

  useEffect(() => {
    checkLoggedIn()
    fetchProfile()

  }, [])

  if (!profileData) {
    return (
     <Loading/>
    )
  } else if (profileData) {
    console.log(profileData)

    return (
      <>
        <div className={styles.header}>
          <h1>Welcome to your profile page</h1>
          <h3>Redirect through these links 👍</h3>

          <div className={styles.text_container}>
            <Link to='/feed'>
              <div className={styles.button}>discover</div>
            </Link>


            <h3>|</h3>
            <Link to='/'>
              <div className={styles.button}>home</div>
            </Link>
            <h3>|</h3>

            <div className={styles.button} onClick={logout}>log out</div>

          </div>
        </div>
        <div className={styles.profile}>
          <img className={styles.picture} src={`http://localhost:5000/uploads/${profileData.photo}`} />
          <h2>{profileData.username}</h2>
          <p>{profileData.email}</p>
          <div className={styles.text_container}>
            <h3>Posts: 0</h3>
            <h3>Upvotes: 0</h3>
          </div>
        </div>
        <div>
        </div>
        <div>
         
        </div> <h1>Your Posts:</h1>
            <ProfilePosts />
          
      </>
    )
  }


}

export default Profile