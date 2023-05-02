import React from 'react'
import styles from '../styles/footer.module.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.footer_section}>
            <h2>Social Media</h2>
        </div>
        <div className={styles.footer_section}>
        <h2>Links</h2>
        
        

        </div>
        <div className={styles.footer_section}>
        <h2>Credits</h2>

        </div>
    </div>
  )
}

export default Footer