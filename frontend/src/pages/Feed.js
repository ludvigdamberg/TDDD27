import React from 'react'
import styles from '../styles/feed.module.css'
import { useState, useEffect } from 'react'
import Posts from '../components/Posts'
import Post from '../components/Post'
import buttons from '../styles/buttons.module.css'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import axios from 'axios'


const Feed = () => {
    const [profileData, setProfileData] = useState()
    const [loading, setLoading] = useState(true)
    const [openPost, setOpenPost] = useState(false)

    const fetchProfile = async () => {


        const token = localStorage.getItem('token');
        console.log(token)

        axios.get('http://localhost:5000/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setProfileData(res.data);
            setLoading(false)
        }).catch(err => console.log(err))


    }

    useEffect(() => {

        fetchProfile()

    }, [])


    const handleOpenPost = () => {
        if (openPost == true) {
            setOpenPost(false)
        } else {
            setOpenPost(true)
        }
    }

    if (loading == false) {

        return (

            <div>
                <div className={styles.header}>

                    <div className={styles.header_photo}> <img className={styles.posts_header_img} src={`http://localhost:5000/uploads/${profileData.photo}`} /></div>
                    <div className={styles.header_text}> <h2 >Feed</h2></div>
                    <div className={styles.header_button}><button onClick={handleOpenPost} className={buttons.button3}>add post +
                    </button></div>
                </div>
                <div className={buttons.arrow}><Link to='/'><FaArrowLeft /></Link></div>
                <div> {openPost ? (
                    <Post/>
                ) : (
                   <></>
                )}</div>


                <div className={styles.container} >
                    <Posts />
                </div>
            </div>

        )
    } else {
        return (<div>loading</div>)
    }
}

export default Feed