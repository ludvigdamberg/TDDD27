import React from 'react'

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
            <img className={styles.img} src={`http://localhost:5000/uploads/${post.photo}`}/>
            <div>
               <h1>{post.name}</h1>
               <p>{post.description}</p> 
            </div>
             
          </div>
        )
      })}</div>
      </div>

  )
}

export default Posts