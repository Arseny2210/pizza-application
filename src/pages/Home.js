import React, { useContext, useEffect, useState } from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from "../components/Skeleton"
import App, { AppContext } from '../components/App'


function Home() {
  const {pizzas, setPizzas, loading, activeCategory, activeSort} = useContext(AppContext)
  

  


  return (
    <>
            <div className="content__top">
            <Categories/>
            <Sort/>
            </div>
            <h2 className="content__title">
            Все пиццы
            </h2>
            <div className="content__items">
            {!loading ? 
              pizzas.map(pizza => (
                <PizzaBlock key={pizza.id} 
                {...pizza}
                />)) 
            : 
            <div>
            {
                [...new Array(10)].map(( _, ind )=>
                <Skeleton key={ind}/>)
            }
            </div>
            }
        </div>
    </>
  )
}

export default Home
