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

// const routes = useRoutesWrapper();
return (
  // <>
  //   {routes}
  // </>    
  <AppContext.Provider value={{a:'abc',b: 'css'}}>
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