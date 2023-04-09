import axios from 'axios'
import React, {useState, useEffect} from 'react'


function App() {

  const [drinks,setDrinks] = useState([])
  const [loading,setLoading] = useState(false)
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const formData = new FormData()
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
  
  const handleImage = (e) => {
    e.preventDefault()
    
    formData.append("photo",e.target.files[0])

}
const handleChange = (e) => {
  e.preventDefault()
  
  const formData = new FormData()
  formData.append("photo",e.target.files[0])

  axios.post("http://localhost:5000/api/save",{name: name, description: description, formData})
  .then((res) => {
      console.log(res.data)
  })
  .catch((err) => console.log(err))
}


  return (
    <div>
   <input value={name} onChange={(e) => setName(e.target.value)} placeholder='name' type='text'/>
   <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder='description' type='text'/>
   
  <input type='file' onChange={(e) => setImageData(e.target.files[0])}/>

  <button onClick={createPost}>Upload</button>
    </div>
  );
}

export default App;
