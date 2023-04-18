import axios from 'axios'
import React, {useState, useEffect} from 'react'
import styles from './styles/styles.module.css'
import Landing from './components/Landing'
import Post from './components/Post'
import Header from './components/Header'
function App() {

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
<>
<Header/>
<Landing/>
<Post/>
    <div>
      <h1>POSTS</h1>
      <div>{posts.map((post) => {
        return(
          <div className={styles.posts_container} key={post._id}>
            <img className={styles.img} src={`http://localhost:5000/uploads/${post.photo}`}/>
            <div>
               <h1>{post.name}</h1>
               <p>{post.description}</p> 
            </div>
             
          </div>
        )
      })}</div>
    </div>
   
</>
  );
}

export default App;
