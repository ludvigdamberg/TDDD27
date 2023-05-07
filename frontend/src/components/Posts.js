import React, { useState, useEffect } from 'react'
import styles from '../styles/feed.module.css'
import { FaSearch } from "react-icons/fa";
import axios from 'axios'
import Loading from './Loading'
import jwt_decode from 'jwt-decode';
import buttons from '../styles/buttons.module.css'
const Posts = () => {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [drinks, setDrinks] = useState([])
  const [loads, setLoads] = useState(1)
  const [search, setSearch] = useState("")
  const [searchChange, setSearchChange] = useState()



  const loadPosts = () => {

    setLoading(true)

    console.log(loads)
    axios.get("http://localhost:5000/posts", { headers: { loads: loads, search: search } })
      .then((res) => {
        setPosts(res.data)
        setLoading(false)
      })
    setLoads(loads + 1)
  }
  useEffect(() => {

    loadPosts()

  }, [])


  const handleChange = (e) => {

    setSearch(e.target.value)
    setLoads(1)
    console.log(searchChange)
  }

  const handleUpvote = (id) => {

    const token = localStorage.getItem('token')
    const decodedToken = jwt_decode(token);

    const author = decodedToken.userId;
    console.log(id)

    axios.put("http://localhost:5000/upvote", { upvote: author, post_id: id })
      .then((res) => {
        console.log(res.data)

      }).catch(err => console.log(err))

  }


  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  } else
    console.log(posts)
  return (


    <div>
      <input className={styles.searchbar}
        type="text"
        placeholder="Filter your drinks by name..."
        onChange={(e) => handleChange(e)}
      />
      <button className={buttons.button2} onClick={loadPosts}>Search</button>
      <div>{posts.map((post) => {
        return (
          <>
            <div className={styles.posts_header}>
              <img className={styles.img} src={`http://localhost:5000/uploads/${post.profile_picture}`} />
              <p>{post.profile_name}</p>
                
              <button className={styles.upvote} onClick={() => handleUpvote(post._id)}>Upvotes: {post.upvotes.length}</button>
              
            </div>
            <div className={styles.posts_container} key={post._id}>
              <div className={styles.post_img_container}>
                <img className={styles.img} src={`http://localhost:5000/uploads/${post.photo}`} />
              </div>
              <div>
                <h2>{post.name}</h2>
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

                <div className={styles.description}><p>Description: {post.description}</p> </div>

              </div>


            </div>
          </>
        )
      })}</div>
      <button onClick={loadPosts} className={buttons.button2} >Load 2 more</button>
    </div>

  )
}

export default Posts