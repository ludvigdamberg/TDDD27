import axios from 'axios'
import React, {useState, useEffect} from 'react'
import './styles.css'
import Landing from './components/Landing'
import Post from './components/Post'

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
<Landing/>
<Post/>
    <div className=''>
      <h1>POSTS</h1>
      <div className=''>{posts.map((post) => {
        return(
          <div className='posts-container' key={post._id}>
            <img className='img' src={`http://localhost:5000/uploads/${post.photo}`}/>
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
