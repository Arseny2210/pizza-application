import React, { useEffect, useState } from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from "../components/Skeleton"



function Home() {
  const [pizzas,setPizzas] = useState([]);
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {

    const category = activeCategory == 0 ? '' : activeCategory;

    fetch(`https://64d8ae005f9bf5b879ce729f.mockapi.io/items?category=${category}`)
    .then(resp => resp.json())
    .then(data => setPizzas(data))
    .finally(()=> setLoading(false))
    .catch(err => {
      alert(`Ошибка запроса к серверу: ${err.message}`)
    })
  }, [activeCategory])
  return (
    <>
            <div className="content__top">
            <Categories 
            active={activeCategory}
            setActive={(ind)=>setActiveCategory(ind)} 
            setPizzas={setPizzas} 
            setLoading={setLoading}/>
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
