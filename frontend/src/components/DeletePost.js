import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/feed.module.css'

const DeletePostButton = ({ postId }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/posts/${postId}`);
     
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      
    }
    console.log(postId);
  };

  return (<div className = {styles.deletePost}>
    <button  onClick={handleDeleteClick} disabled={isDeleting}>
      {isDeleting ? 'Deleting...' : 'Delete Post'}
    </button>
    </div>
  );
};

export default DeletePostButton;