import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { AiOutlineCamera } from 'react-icons/ai'
import styles from '../styles/feed.module.css'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import { isLoggedIn } from '../functions/Functions'
import buttons from '../styles/buttons.module.css'

const Post = () => {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [ingredient, setIngredient] = useState("")
  const [imageData, setImageData] = useState("")
  const [picturePreview, setPicturePreview] = useState(null);
  const [recipe, setRecipe] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState()


  const checkLoggedIn = async () => {

    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      navigate('/login');
      return;
    }
    const response = await axios.get('http://localhost:5000/profile', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setIsLoggedIn(true);
    }).catch(err => {
      localStorage.removeItem("token")
      setIsLoggedIn(false)
      navigate('/login')
    })
  }

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


  }

  useEffect(() => {
    checkLoggedIn()
    get_profile()


  }, [])

  const add_ingredient = () => {

    setRecipe([...recipe, ingredient])



  }

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setImageData(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPicturePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const createPost = () => {

    const formData = new FormData()
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const author = decodedToken.userId;
    const profilePicture = profileData.photo
    const profileName = profileData.username
    console.log(profilePicture)
    console.log(profileName)


    formData.append('name', name)
    formData.append('recipe', recipe)
    formData.append('description', description)
    formData.append('author', author)
    formData.append('profilePicture', profilePicture)
    formData.append('profileName', profileName)
    formData.append('photo', imageData)




    axios.post("http://localhost:5000/post", formData)
      .then((res) => {
        console.log(res.data)
      }).catch(err => console.log(err))


  }


  return (
    <div className={styles.post_container}>
      <div className={styles.post_header}>
        <h1>Make your drink!</h1>
      </div>


      <div className={styles.input_fields}>
        <input className={styles.post_input1} onChange={(e) => setName(e.target.value)} placeholder='Title of your drink' type='text' />

        <input className={styles.post_input1} onChange={(e) => setIngredient(e.target.value)} placeholder='Ingredient' type='text' />
        <button className={buttons.button2} onClick={add_ingredient}>add ingredient</button>
        <div className={styles.tag_container}>
          <ul>{recipe.map((item, index) => (
            <li key={index} >{item}</li>
          ))}</ul>
        </div>
        <textarea className={styles.post_input2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder='How to make it...' type='text' cols='40' rows="5" />

       
          <label  className={buttons.button2} id="button">add image
            <input hidden type="file" id="button" onChange={(e) => handlePictureChange(e)}/>
          </label>
       
       
      </div>
          <button className={buttons.button2} onClick={createPost}>Upload</button>



    </div>
  )
}


export default Post