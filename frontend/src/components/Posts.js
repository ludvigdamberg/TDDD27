import React, { useState, useEffect } from 'react'
import styles from '../styles/feed.module.css'
import { FaSearch } from "react-icons/fa";
import axios from 'axios'
import Upvote from './Upvote'
import Loading from './Loading'
const Posts = () => {

  const [posts, setPosts] = useState([])
  const [searchFilter, setSearchFilter] = useState([]);
  const [loading, setLoading] = useState(false)
  const [drinks, setDrinks] = useState([])

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

  }, [])


  if (loading) {
    return (
        <div>
            <Loading/>
        </div>
    )
} else
    console.log(posts)
return (


    <div>
      <input className={styles.searchbar}
        type="text"
        placeholder="Filter your drinks by name..." 
        />

      <div>{posts.map((post) => {
        return (
          <div className={styles.posts_container} key={post._id}>
            <div className={styles.post_img_container}>
              <img className={styles.img} src={`http://localhost:5000/uploads/${post.photo}`} />
            </div>
            <div>
              <h1>{post.name}</h1>
              <div >
                <h3>Recipe:</h3>
                <div className={styles.tag_container}>
                <ul>
                  {post.recipe[0].split(',').map((ingredient, index) => (
                    <li key={index}>
                      {ingredient}
                    </li>
                  ))}
                </ul>
                </div>
              </div>

              <div className={styles.description}>Description: <p>{post.description}</p> </div>

            </div>
            <Upvote />
          </div>
        )
      })}</div>
    </div>

  )
}

export default Posts