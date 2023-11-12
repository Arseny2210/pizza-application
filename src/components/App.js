import React, { createContext, useEffect, useState} from 'react'

import NotFound from '../pages/NotFound';
import useRoutesWrapper from '../hooks/useRoutesWrapper'


import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Layout from './Layout';
import pizzas from '../assets/pizzas.json';
import { Routes, Route, useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPizzas, setPizzas } from '../store/slices/pizzasSlice';


export const AppContext = createContext()

function App() {
  const activeCategory =  useSelector((state)=>state.filter.category);
  const {type, isUp} = useSelector((state) => state.filter.sort)
  const pizzas = useSelector(state => state.pizzas.items)
  const search = useSelector((state )=> state.filter.search)

  const dispatch = useDispatch()


  let filteredPizzas = pizzas

  
  // const[search, setSearch] = useState('')

  // const store = { 
  //   pizzas, setPizzas,
  //   loading, setLoading, 
  //   setSearch
  // }
  
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   dispatch(fetchPizzas())
  // }, [])

  useEffect(() => {
    dispatch(fetchPizzas())

  }, [activeCategory, type, isUp, search])


return (
    <>
    <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='cart' element={<Cart />} />
        <Route path='*' element={<NotFound/>} />
        </Route>
    </Routes> 
    </>
  );
}

export default App