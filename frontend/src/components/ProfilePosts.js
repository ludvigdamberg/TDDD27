import React, { useState, useEffect } from 'react'
import styles from '../styles/feed.module.css'
import { FaSearch } from "react-icons/fa";
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import Loading from './Loading';





const ProfilePosts = () => {


    const [posts, setPosts] = useState(null)
    const [searchFilter, setSearchFilter] = useState([]);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(true)

    const loadPosts = async () => {

        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        const author = decodedToken.userId;

        console.log(decodedToken.userId)

        await axios.get('http://localhost:5000/profilePosts', { headers: { author: `${author}` } },
        )
            .then((res) => {
                setPosts(res.data);

            }).catch(err => console.log(err))

        setLoading(false)
    }

    const deletePost = async (image, id) => {

        console.log(image, id)
        await axios.post('http://localhost:5000/deletePost', {
            id: id, image: image
        }
        ).then((res) => {
            console.log(res)
            alert("sucessfully deleted")
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        setLoading(true)
        loadPosts()
    }, [])

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        )
    } else
        return (
            <div className={styles.container}>
                <div>{posts.map((post) => {
                    return (
                        <div className={styles.wrapper}>
                            <div className={styles.posts_container} key={post._id}>
                               
                                    <img className={styles.post_img_container2} src={`http://localhost:5000/uploads/${post.photo}`} />
                               
                                <div>
                                    <h1>{post.name}</h1>
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

                                    <div className={styles.description}>Description: <p>{post.description}</p> </div>

                                </div>
                            </div>
                            <button className={styles.delete} onClick={() => deletePost(post.photo, post._id)}>delete</button>
                        </div>
                    )
                })}</div>
            </div>
        )
}

export default ProfilePosts