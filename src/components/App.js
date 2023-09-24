import React, { createContext, useEffect, useState} from 'react'

import NotFound from '../pages/NotFound';
import useRoutesWrapper from '../hooks/useRoutesWrapper'


import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Layout from './Layout';
import pizzas from '../assets/pizzas.json';
import { Routes, Route, useRoutes } from 'react-router-dom';


  export const AppContext = createContext()

function App() {
  
  const [pizzas,setPizzas] = useState([]);
  let filteredPizzas = pizzas
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSort, setActiveSort] = useState({type: 0, isUp: true});
  const[search, setSearch] = useState('')
  const store = { 
  pizzas, setPizzas,
    loading,setLoading, 
    activeCategory, setActiveCategory,
    activeSort, setActiveSort,  
    setSearch
  }
  
  
  useEffect(() => {
    const category = activeCategory == 0 ? '' : activeCategory;
    const sort = ['rating', 'price', 'title'];
    const order = activeSort.isUp ? 'asc' : 'desc';
  
    Promise.all([
      fetch(`https://64d8ae0a5f9bf5b879ce72a8.mockapi.io/items?category=${category}&sortBy=${sort[activeSort.type]}&order=${order}`),
      fetch(`https://64d8ae0a5f9bf5b879ce72a8.mockapi.io/items?search=${search}`),
    ]).then(([sorted, searched]) => { 
      return Promise.all([sorted.json(),searched.json()])
    }).then(([sorted,searched])=> {
      // console.log(sorted,searched);
      const newData = sorted.filter(sortedItem => searched.some(searchedItem => sortedItem.id == searchedItem.id));
      setPizzas(newData)
    })

    // fetch(`https://64d8ae005f9bf5b879ce729f.mockapi.io/items?category=${category}&sortBy=${sort[activeSort.type]}&order=${order}&title=title&search=${search}`)
    // .then(resp => resp.json())
    // .then(data => setPizzas(data))
    .finally(()=> setLoading(false))
    .catch(err => {
      alert(`Ошибка запроса к серверу: ${err.message}`)
    })
  }, [activeCategory, activeSort, search])


return (
  // <>
  //   {routes}
  // </>    
  <AppContext.Provider value={store}>
    <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='cart' element={<Cart />} />
        <Route path='about' element="About" />
        <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes> 
    </AppContext.Provider>
    )
  }

  export default App