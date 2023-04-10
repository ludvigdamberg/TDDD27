import axios from 'axios'
import React, {useState, useEffect} from 'react'
import './styles.css'
import Paper from '@mui/material/Paper'
import Landing from './components/Landing'


function App() {
  const [posts,setPosts] = useState([])
  const [drinks,setDrinks] = useState([])
  const [loading,setLoading] = useState(false)
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [imageData,setImageData] = useState('')
 
    const createPost = () => {

      const formData = new FormData()

      formData.append('name',name)
      formData.append('description',description)
      formData.append('photo',imageData)

      axios.post("http://localhost:5000/save", 
      formData
      )
      .then((res) => {
       console.log(res.data)
      }).catch(err=> console.log(err))
      console.log(imageData)
    }

  const setPhoto = (e) => {
    e.preventDefault()
          
   setImageData(e.target.files[0])
    console.log(e.target.files[0])
    console.log(imageData)
  
  }
  
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
    <div>
   <input value={name} onChange={(e) => setName(e.target.value)} placeholder='name' type='text'/>
   <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder='description' type='text'/>
   <input type='file' onChange={(e) => setImageData(e.target.files[0])}/>
   <button onClick={createPost}>Upload</button>
    </div>
    <div>
      <h1>POSTS</h1>
      <div>{posts.map((post) => {
        return(
          <div className='post' key={post._id}>
           <Paper elevation={5}>
            <img className='img' src={`http://localhost:5000/uploads/${post.photo}`}/>
           
            <div>
            
               <h1>{post.name}</h1>
            <p>{post.description}</p> 
          
            </div>
              </Paper>
          </div>
        )
      })}</div>
    </div>
</>
  );
}

export default App;
