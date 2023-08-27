import React, { useEffect, useState} from 'react'

import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Layout from './Layout';
import pizzas from '../assets/pizzas.json';
import { Routes, Route, useRoutes } from 'react-router-dom';

import useRoutesWrapper from '../hooks/useRoutesWrapper'
function App() {
  const [pizzas,setPizzas] = useState([]);
  const [loading, setLoading] = useState(true)
  
  useEffect( ()=>{
    fetch('https://64d8ae005f9bf5b879ce729f.mockapi.io/items')
    .then(resp => resp.json())
    .then(data => setPizzas(data))
    .finally(()=> setLoading(false))
    .catch(err => {
      alert(`Ошибка запроса к серверу: ${err.message}`)
    })
  }, [])

const routes = useRoutesWrapper();

return (
  // <Layout>
  //   {/*{routes} */}
  // </Layout>    

  <Routes>
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home pizzas={pizzas} loading={loading}/>}/>
      <Route path='cart' element={<Cart />} />
      <Route path='about' element="About" />
      <Route path='*' element="NOT FOUND" />
    </Route>
  </Routes> 
    )
  }
  export default App
  