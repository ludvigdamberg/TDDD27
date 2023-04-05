import axios from 'axios'
import React, {useState, useEffect} from 'react'


function App() {

  const [drinks,setDrinks] = useState([])
  const [loading,setLoading] = useState(false)

  const loadData = () => {

    setLoading(true)
     axios.get("https://thecocktaildb.com/api/json/v1/1/search.php?s=a").then(res => {
      console.log(res.data.drinks)
      setDrinks(res.data.drinks)
      setLoading(false)
     }) 
    
  }
  

useEffect(() => {

  loadData()
  },[])


  return (
    <div className="App">
   
      <div>
       {drinks.map((item) => {
        return (
          <>
          <p>Name: {item.strDrink}</p>
          <img src={item.strDrinkThumb}/>
          </>
        )
       })}
      </div>
    </div>
  );
}

export default App;
