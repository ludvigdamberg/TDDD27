import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/profile.module.css'
import Post from '../components/Post'
import ProfilePosts from '../components/ProfilePosts'
import Loading from '../components/Loading';
import { FaArrowLeft } from 'react-icons/fa';
import buttons from '../styles/buttons.module.css'
import jwt_decode from 'jwt-decode';
const Profile = () => {

  const [profileData, setProfileData] = useState()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null)

  const loadPosts = async () => {

    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const author = decodedToken.userId;

    console.log(decodedToken.userId)

    await axios.get('http://localhost:5000/profilePosts', { headers: { author: `${author}` } },
    )
        .then((res) => {
            setPosts(res.data);

        }).catch(err => console.log(err))

    setLoading(false)
}


  
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
    loadPosts()

  }, [])

  if (!profileData) {
    return (
      <Loading />
    )
  } else if (profileData) {
    console.log(profileData)

    return (
      <>
        <div className={styles.header}>
          <h1>Profile Page</h1>

          <div className={styles.text_container}>
            <Link style={{ textDecoration: 'none' }} to='/feed'>
              <div className={buttons.button}>discover</div>
            </Link>



            <Link style={{ textDecoration: 'none' }} to='/'>
              <div className={buttons.button}>home</div>
            </Link>


            <div className={buttons.button} onClick={logout}>log out</div>

          </div>
        </div>
        <div className={buttons.arrow}><Link to='/'><FaArrowLeft /> Home</Link></div>
        <div className={styles.profile}>
          <img className={styles.picture} src={`http://localhost:5000/uploads/${profileData.photo}`} />
          <div className={styles.info_container}>
            <div className={styles.info_slot}>
              <div> <h1>{posts.length}</h1></div>
              <div> <h3>Posts</h3></div>
            </div>
            <div className={styles.info_slot}>
              <div> <h1>0</h1></div>
              <div> <h3>Upvotes</h3></div>
            </div>
          </div>
        </div>
        <div className={styles.profile2}>
          <h2>{profileData.username}</h2>
          <p>{profileData.email}</p>
        </div>


        <div>
        </div>
        <div>

        </div>
        <div className={styles.your}> <h1>Your posts</h1></div>
        <ProfilePosts />

      </>
    )
  }


}

export default Profile