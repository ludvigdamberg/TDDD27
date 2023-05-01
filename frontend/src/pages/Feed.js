import React from 'react'
import styles from '../styles/feed.module.css'
import {useState, useEffect} from 'react'
import Posts from '../components/Posts'
import Post from '../components/Post'




const Feed = () => {


return(

    <div>
    <Post/>
    <div className = {styles.container} >
    <Posts/>
    </div>
    </div>
   
)

}

export default Feed