import React, { useState, useEffect } from 'react'
import styles from '../styles/feed.module.css'
import { FaSearch } from "react-icons/fa";
import axios from 'axios'
import Loading from './Loading'
import jwt_decode from 'jwt-decode';
import buttons from '../styles/buttons.module.css'


const Posts = () => {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [drinks, setDrinks] = useState([])
  const [loads, setLoads] = useState(1)
  const [search, setSearch] = useState("")
  const [searchChange, setSearchChange] = useState()
  const [profileData, setProfileData] = useState()
  const [comment, setComment] = useState("")
  const [commentData, setCommentData] = useState([])
  const [showComments, setShowComments] = useState(false)

  const get_profile = () => {


    const token = localStorage.getItem('token');

    axios.get('http://localhost:5000/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setProfileData(res.data)

      })
      setTimeout(() => {
        setLoading(false)
      }, 1000)
  }

  const loadPosts = () => {


    console.log(loads)
    axios.get("http://localhost:5000/posts", { headers: { loads: loads, search: search } })
      .then((res) => {
        setPosts(res.data)
      })
    setLoads(loads + 1)
  }
  useEffect(() => {

    loadPosts()
    get_profile()
  }, [])




  const handleChange = (e) => {

    setSearch(e.target.value)
    setLoads(1)
  }

  const handleUpvote = (id) => {

    const token = localStorage.getItem('token')
    const decodedToken = jwt_decode(token);

    const author = decodedToken.userId;

    axios.put("http://localhost:5000/upvote", { upvote: author, post_id: id })
      .then((res) => {
        console.log(res.data)

      }).catch(err => console.log(err))

  }

  const handleComment = (id) => {

    axios.post("http://localhost:5000/comment", { profile_name: profileData.username, profile_picture: profileData.photo, comment: comment })
      .then((res) => {
        console.log(res.data._id)

        axios.put("http://localhost:5000/savecomment", { post_id: id, comment_id: res.data._id })
          .then((res) => {
            console.log(res.data)

          }).catch(err => console.log(err))

      }).catch(err => console.log(err))

  }


  const get_comments = (id) => {

    console.log(id)
    setLoading(true)

  

    axios.get("http://localhost:5000/getcomments", { headers: { postId: id } })
      .then((res) => {
        setCommentData(res.data) 
        setShowComments(true)
      })
      
     
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    
     
  }


  
  return (

    <div>
      <input className={styles.searchbar}
        type="text"
        placeholder="Filter your drinks by name..."
        onChange={(e) => handleChange(e)}
      />
      <button className={buttons.button2} onClick={loadPosts}>Search</button>
      <div>{posts.map((post, index) => {
        return (
          <div key={post._id}>
            <div className={styles.posts_header}>
              <img className={styles.posts_header_img} src={`http://localhost:5000/uploads/${post.profile_picture}`} />
              <p>{post.profile_name}</p>

              <button className={styles.upvote} onClick={() => handleUpvote(post._id)}>Upvotes: {post.upvotes.length}</button>

            </div>
            <div className={styles.posts_container} key={post._id}>

              <div className={styles.grid_container}>
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
                </div>
                <div>
                  <div className={styles.description}><h3>Description:</h3>{post.description} </div>
                </div>

              </div>


            </div>
            <div>
              <input type='text' className={styles.comment_input} onChange={(e) => setComment(e.target.value)} />
              <button onClick={() => handleComment(post._id)} className={styles.comment_button} >Comment</button>
              <div className={styles.comments}>
                {showComments ? (
                  <div >
                    <button className={buttons.button3} onClick={() => setShowComments(false)}>hide comments</button>

                    {loading ? (<></>) : commentData.map((comment) => {
                      if (post.comments.includes(comment._id)) {

                      return(
                      <>
                        <div className={styles.comment_header}>
                          <img className={styles.posts_header_img} src={`http://localhost:5000/uploads/${comment.profile_picture}`} />
                          <p>{comment.profile_name}</p>
                        </div>
                        <div className={styles.comment}>
                        <p>{comment.comment}</p>

                        </div>
                      </>
                    )}})}

                  </div>

                ) : (
                  <> <button className={buttons.button3} onClick={() => get_comments(post._id)}>show comments</button></>
                )}
              </div>
            </div>
          </div>
        )
      })}</div>
      <button onClick={loadPosts} className={buttons.button2} >Load 2 more</button>
    </div>

  )
}

export default Posts