import React,{ useState, useEffect } from 'react'
import styles from '../styles/styles.module.css'
import axios from 'axios'
import Upvote from './Upvote'
const Posts = () => {

  const [posts,setPosts] = useState([])
  const [loading,setLoading] = useState(false)
  const [drinks,setDrinks] = useState([])

  const loadPosts = () => {

    axios.get("http://localhost:5000/posts")
    .then((res) => {
      console.log(res.data)
      setPosts(res.data)
    })
  }
    useEffect(() => {
  
      loadPosts()
  
  
    },[])

  return (


    <div>
    <div>{posts.map((post) => {
        return(
            <div className={styles.posts_container} key={post._id}>
            <div className={styles.post_img_container}>
            <img className={styles.img} src={`http://localhost:5000/uploads/${post.photo}`}/>
            </div>
            <div>
               <h1>{post.name}</h1>
               <p>Recipe: {post.recipe}</p> 
               <p>Descrption: {post.description}</p> 
              
            </div>
           <Upvote/>     
          </div>
        )
      })}</div>
      </div>

  )
}

export default Posts