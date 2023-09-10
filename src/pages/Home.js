import React, { useContext, useEffect, useState } from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from "../components/Skeleton"
import App, { AppContext } from '../components/App'


function Home() {
  const [pizzas,setPizzas] = useState([]);
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSort, setActiveSort] = useState({type: 0, isUp: true});

  useEffect(() => {
    const category = activeCategory == 0 ? '' : activeCategory;

    const sort = ['rating', 'price', 'title'];
    const order = activeSort.isUp ? 'asc' : 'desc';
    fetch(`https://64d8ae005f9bf5b879ce729f.mockapi.io/items?category=${category}&sortBy=${sort[activeSort.type]}&order=${order}`)
    .then(resp => resp.json())
    .then(data => setPizzas(data))
    .finally(()=> setLoading(false))
    .catch(err => {
      alert(`Ошибка запроса к серверу: ${err.message}`)
    })
  }, [activeCategory, activeSort])


  return (
    <>
            <div className="content__top">
            <Categories 
            active={activeCategory}
            setActive={(ind)=>setActiveCategory(ind)} 
            setPizzas={setPizzas} 
            setLoading={setLoading}/>
            <Sort 
            active={activeSort} 
            setActive={(obj) => setActiveSort(obj)}
            />
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
