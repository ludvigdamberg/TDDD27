import React from 'react'
import { Paper } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import {AiOutlineCamera} from 'react-icons/ai'
import styles from '../styles/styles.module.css'

const Post = () => {
  
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [recipe,setRecipe] = useState("")
    const [imageData,setImageData] = useState('')
  

    
    const createPost = () => {

        const formData = new FormData()
  
        formData.append('name',name)
        formData.append('description',description)
        formData.append('recipe',recipe)
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
    <div className={styles.post_container}>
      <h1>Make your drink!</h1>
        <input className={styles.post_input1} value={name} onChange={(e) => setName(e.target.value)} placeholder='Title of your drink' type='text'/>
        <textarea className={styles.post_input2} value={recipe} onChange={(e) => setRecipe(e.target.value)} placeholder='Recipe:' type='text'/>
        <textarea className={styles.post_input2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder='How to make it...' type='text' cols = '40' rows="5"/>

        <div className={styles.addpicture}>
        <p >Add a picture here 👉👉:</p>
        <label className={styles.pick_file} htmlFor={styles.file_picker}>
            <AiOutlineCamera/>
            <input hidden type="file" name={styles.file_picker} id={styles.file_picker} onChange={(e) => setImageData(e.target.files[0])}/>
        </label>
        </div>
        <button onClick={createPost}>Upload</button>

        
        
    </div>
  )
}


export default Post