import React from 'react'
import {useState, useRef, useEffect} from 'react'
import styles from '../styles/styles.module.css'
import Posts from '../components/Posts'
import Post from '../components/Post'
const Feed = () => {

return(
    <div>
        <Post/>
        <Posts/>
    </div>
)

}

export default Feed