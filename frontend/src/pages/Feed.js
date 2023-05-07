import React from 'react'
import styles from '../styles/feed.module.css'
import { useState, useEffect } from 'react'
import Posts from '../components/Posts'
import Post from '../components/Post'
import buttons from '../styles/buttons.module.css'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom'



const Feed = () => {


    return (

        <div>
            <div className={styles.header}>
            <div className={buttons.arrow}><Link to='/'><FaArrowLeft /></Link></div>
            </div>
            <Post />
            <div className={styles.container} >
                <Posts />
            </div>
        </div>

    )

}

export default Feed