import React, { createContext, useEffect, useState} from 'react'

import NotFound from '../pages/NotFound';
import useRoutesWrapper from '../hooks/useRoutesWrapper'


import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Layout from './Layout';
import pizzas from '../assets/pizzas.json';
import { Routes, Route, useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPizzas } from '../store/slices/pizzasSlice';


export const AppContext = createContext()

function App() {
  const activeCategory =  useSelector((state)=>state.filter.category);
  const {type, isUp} = useSelector((state) => state.filter.sort)
  const pizzas = useSelector(state => state.pizzas.items)
  const dispatch = useDispatch()

  let filteredPizzas = pizzas
  const [loading, setLoading] = useState(true)
  
  const[search, setSearch] = useState('')


  const store = { 
    pizzas, setPizzas,
    loading, setLoading, 
    setSearch
  }
  
  
  useEffect(() => {
    const category = activeCategory == 0 ? '' : activeCategory;
    const sort = ['rating', 'price', 'title'];
    const order = isUp ? 'asc' : 'desc';
  
    Promise.all([
      fetch(`https://64d8ae0a5f9bf5b879ce72a8.mockapi.io/items?category=${category}&sortBy=${sort[type]}&order=${order}`),
      fetch(`https://64d8ae0a5f9bf5b879ce72a8.mockapi.io/items?search=${search}`),
    ]).then(([sorted, searched]) => { 
      return Promise.all([sorted.json(),searched.json()])
    }).then(([sorted,searched])=> {
      const newData = sorted.filter(sortedItem => searched.some(searchedItem => sortedItem.id == searchedItem.id));
      dispatch(setPizzas(newData))
    })
    .finally(()=> setLoading(false))
    .catch(err => {
      alert(`Ошибка запроса к серверу: ${err.message}`)
    })
  }, [activeCategory, type, isUp, search])


return (
  <AppContext.Provider value={store}>
    <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='cart' element={<Cart />} />
        <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes> 
    </AppContext.Provider>
    )
  }

  export default App