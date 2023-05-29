import React from 'react'
import styles from '../styles/feed.module.css'
import { useState, useEffect } from 'react'
import Posts from '../components/Posts'
import Post from '../components/Post'
import buttons from '../styles/buttons.module.css'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

const Feed = () => {
    const [profileData, setProfileData] = useState()
    const [loading, setLoading] = useState(true)
    const [openPost, setOpenPost] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();


    const logout = () => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        navigate('/')
    }

    const fetchProfile = async () => {


        const token = localStorage.getItem('token');
        console.log(token)

        axios.get('http://localhost:5000/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setProfileData(res.data);
        }).catch(err => console.log(err))

        setTimeout(() => {
            setLoading(false)
        }, 1000)


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


    useEffect(() => {
        checkLoggedIn()
        fetchProfile()

    }, [])


    const handleOpenPost = () => {
        if (openPost == true) {
            setOpenPost(false)
        } else {
            setOpenPost(true)
        }
    }

    if (loading === true) {
        return (
        <Loading />
        )

    }
    else {
        return (
            <div className={styles.feed}>
                <div className={styles.header}>

                    <div className={styles.header_photo}> <img className={styles.posts_header_img} src={`http://localhost:5000/uploads/${profileData.photo}`} /></div>
                    <div className={styles.header_text}> <h2 >Feed</h2></div>
                    <div className={styles.header_button}><button onClick={handleOpenPost} className={buttons.button3}>add post +
                    </button></div>
                </div>
                <div className={buttons.arrow}><Link to='/'><FaArrowLeft /> Home</Link></div>
                {openPost ? (
                    <div className={styles.body}> <Post /></div>
                ) : (
                    <></>
                )}


                <div className={styles.container} >
                    <Posts />
                </div>
            </div>

        )

    }

}

export default Feed