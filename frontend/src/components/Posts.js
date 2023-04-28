import React,{ useState, useEffect } from 'react'
import styles from '../styles/feed.module.css'
import{FaSearch } from "react-icons/fa";
import axios from 'axios'
import Upvote from './Upvote'

const Posts = () => {

  const [posts,setPosts] = useState([])
  const [searchFilter, setSearchFilter] = useState([]);
  const [result, setResult] = useState("");
  const [loading,setLoading] = useState(false)
  const [drinks,setDrinks] = useState([])

  const loadPosts = () => {

    axios.get("http://localhost:5000/posts")
    .then((res) => {
      console.log(res.data)
      setPosts(res.data)
      setSearchFilter(res.data);
    })
  }
    useEffect(() => {
  
      loadPosts()
  
  
    },[])

    useEffect(() =>{
      const results = searchFilter.filter(resp =>
         resp.name.toLowerCase().includes(result)
      );
      setPosts(results)
    },[result])

    const handleChange = (e) => {
      setResult(e.target.value);
    }
    

  return (


    <div>
      <input className = {styles.searchbar}
     value = {result}
     type = "text"
     placeholder = "Filter your drinks by name..."
     
     onChange ={handleChange}/>

    <div>{posts.map((post) => {
        return(
            <div className={styles.posts_container} key={post._id}>
            <div className={styles.post_img_container}>
            <img className={styles.img} src={`http://localhost:5000/uploads/${post.photo}`}/>
            </div>
            <div>
               <h1>{post.name}</h1>
               <div className = {styles.recipe}>Recipe: <li> {post.recipe}</li> </div>
               
               <div className = {styles.description}>Description: <p>{post.description}</p> </div>
              
            </div>
               <Upvote/> 
          </div>
        )
      })}</div>
      </div>

  )
}

export default Posts