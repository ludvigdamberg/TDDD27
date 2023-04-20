import axios from 'axios'
import React, {useState, useEffect} from 'react'
import styles from './styles/styles.module.css'
import Landing from './components/Landing'
import Header from './components/Header'
import Posts from './components/Posts'
function App() {



  return (
<>
<Header/>
<Landing/>
<Posts/>

    
</>
  );
}

export default App;
