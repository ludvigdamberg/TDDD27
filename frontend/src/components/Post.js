import React from 'react'
import { Paper } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import {AiOutlineCamera} from 'react-icons/ai'


const Post = () => {
  
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

      const paper = {
        height: '30vh',
        width: '50vw',
    
      }
    return (
    <div className='post-container'>
        <input className='post-input1' value={name} onChange={(e) => setName(e.target.value)} placeholder='name' type='text'/>
        <p>Add a picture here 👉👉:</p>
        <label className='pick-file' htmlFor="file_picker">
            <AiOutlineCamera/>
            <input hidden type='file' name='file_picker' id='file_picker' onChange={(e) => setImageData(e.target.files[0])}/>
        </label>
        
         <input className='post-input2' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='description' type='text'/>
         <button onClick={createPost}>Upload</button>
        
    </div>
  )
}


export default Post