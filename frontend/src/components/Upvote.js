import React, { useState } from 'react';
import axios from 'axios'
import styles from '../styles/feed.module.css'
const Upvote = ({postId}) =>{
    const [count, setCount] = useState(0);
    const [upvotes, setUpvotes] = useState(0);


    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }

    if (count<0){
        setCount(0);
    }


   // const formData = new FormData()
  
        //formData.append('Upvotes',count);

        //axios.post("http://localhost:5000/save", 
       // formData
       // )
    return (
        <div className = {styles.upvote}>
            <button className={styles.upvote} onClick={increment}>
                🍺
            </button>
             <div>{count}</div>
           
           
        </div>
    )
}

export default Upvote;