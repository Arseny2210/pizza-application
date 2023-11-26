import React, { Suspense, createContext, lazy, useEffect, useState} from 'react'

import useRoutesWrapper from '../hooks/useRoutesWrapper'

import Home from '../pages/Home';
import Layout from './Layout';
import pizzas from '../assets/pizzas.json';
import { Routes, Route, useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPizzas, setPizzas } from '../store/slices/pizzasSlice';

import Loader from './Loader.js'

const Pizza = lazy(() => import('../pages/Pizza.js'));
const Cart = lazy (()=> import('../pages/Cart.js'));
const NotFound = lazy(() => import('../pages/NotFound.js'))

export const AppContext = createContext();

function App() {
  const activeCategory =  useSelector((state)=>state.filter.category);
  const {type, isUp} = useSelector((state) => state.filter.sort)
  const pizzas = useSelector(state => state.pizzas.items)
  const search = useSelector((state )=> state.filter.search)

  const dispatch = useDispatch()

  let filteredPizzas = pizzas

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchPizzas())
  }, [activeCategory, type, isUp, search])

return (
    <>
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
            <Route path='cart' element={<Cart />} />
              {/* :id -подставляет id элемента. */} 
            <Route path='pizzas/:id' element={<Pizza />}/>
            <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes> 
    </Suspense>
    </>
  );
}

export default App