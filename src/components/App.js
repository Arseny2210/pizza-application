import React, { useEffect, useState} from 'react'

import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Layout from './Layout';
import pizzas from '../assets/pizzas.json';
import { Routes, Route, useRoutes } from 'react-router-dom';

import useRoutesWrapper from '../hooks/useRoutesWrapper'
import NotFound from '../pages/NotFound';
function App() {

const routes = useRoutesWrapper();
return (
  // <>
  //   {routes}
  // </>    

  <Routes>
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path='cart' element={<Cart />} />
      <Route path='about' element="About" />
      <Route path='*' element={<NotFound/>} />
    </Route>
  </Routes> 
    )
  }
  export default App
  