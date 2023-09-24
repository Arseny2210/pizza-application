import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { AppContext } from './App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../store/slices/filterSlice';

function Categories() {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
    
    const activeCategory = useSelector((state)=> state.filter.category)

    const dispatch = useDispatch();
    // const {activeCategory, setActiveCategory} = useContext(AppContext);
    // useEffect(()=> {
    //   fetch(`https://64d8ae005f9bf5b879ce729f.mockapi.io/items?category=${active}`)
    // .then(resp => resp.json())
    // .then(data => setPizzas(data))
    // .finally(()=> setLoading(false))
    // .catch(err => {
    //   alert(`Ошибка запроса к серверу: ${err.message}`)
    // })
    // },[active])
  return (
    <div className="categories">
        <ul>
        {
            categories.map((category, ind) =>(
                <li onClick={()=> dispatch(setCategory(ind))} key={ind} className={ind == activeCategory ? 'active' : ''}>{category}</li>
            ))
        }
        </ul>
    </div>
  )
}

export default Categories
