import Landing from './components/Landing'
import Header from './components/Header'
import styles from './styles/styles.module.css'
import { fadeInVertical, fadeInHorizontal, fadeInAndScale } from './functions/animations';
import React, {useRef, useEffect } from 'react'

function App() {

  const fadein = useRef(null);


  useEffect(() => {
    const element = fadein.current;
    if (element) {
      fadeInVertical(element);
    }
  }, []);
  return (
    <>

      <div className={styles.background}>
        <div className={styles.content}>
          <div className={styles.header}>
            <Header />
          </div>
          <div className={styles.lander}>
            <h1 ref={fadein} className={styles.logo}>LIQOURBUDDY</h1>
          </div>

          
        </div>
      </div>
    </>
  );
}

export default App;
