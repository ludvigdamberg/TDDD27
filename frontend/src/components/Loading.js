import React from 'react'
import styles from '../styles/loading.module.css'
const Loading = () => {
    return (
        <div className={styles.background}>
            <div className={styles.loadingspinner}>
                <div id={styles.square1}></div>
                <div id={styles.square2}></div>
                <div id={styles.square3}></div>
                <div id={styles.square4}></div>
                <div id={styles.square5}></div>
            </div>
        </div>
    )
}

export default Loading