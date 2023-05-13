import React, {useRef, useEffect } from 'react'
import styles from '../styles/styles.module.css'
import { fadeInVertical, fadeInHorizontal, fadeInAndScale } from '../functions/animations';


const Landing = () => {

    const fadein = useRef(null);

    useEffect(() => {
        const element = fadein.current;
        if (element) {
          fadeInVertical(element);
        }
      }, []);


    return (
        <>
            <div className={styles.Header}>
                <div className={styles.text_container}>
                    <h1>Welcome to Liqour Buddy!</h1>
                    <p>A project by Ludvig Damberg and Ludvig Hillert for Linköping University. </p>
                    <p>Scroll down to see a checklist for our project and test the current features! Keep in mind that this is a project
                        under developement, some features might not work or have any response. 🍹🍻
                    </p>
                </div>
                <div className={styles.image_container}>
                    <img alt='' src='../../content/landing.jpg' />
                </div>
            </div>
         
        </>
    )
}

export default Landing