import React, { useEffect, useState } from 'react'


import Header from './Header'
import pizzas from '../assets/pizzas.json'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
function App() {
  const [pizzas,setPizzas] = useState([]);

  useEffect( ()=>{
    fetch('https://64d8ae005f9bf5b879ce729f.mockapi.io/items')
    .then(resp => resp.json())
    .then(data => setPizzas(data))
    // .finally(()=> setLoading(false))
    .catch(err => {
      alert(`Ошибка запроса к серверу: ${err.message}`)
    })
  }, [])
return (
  <div className="wrapper">
    <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home pizzas={pizzas}/>}/>
            <Route path='/cart' element="Cart" />
            <Route path='/about' element="About" />
            <Route path='*' element="NOT FOUND" />
          </Routes>
        </div>
      </div>
  </div>
  )
}

export default App
