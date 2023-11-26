import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import PizzaBlock from '../components/PizzaBlock'
const Pizza = memo (function () {
  const pizzas = useSelector(state => state.pizzas.items);
  const {id} = useParams();

  const pizza = pizzas.find(item => item.id == id);
  return (
    pizzas.length > 0 &&
    <>
    <div style={{display: 'flex', justifyContent:'center'}}>
      <PizzaBlock {...pizza} isTitleClickable = {false}/>
      </div>
      <Link to="/" className="button button--outline button--add go-back-btn">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round"
            strikeLinejoin="round" />
          </svg>
        <span>Вернуться назад</span>
      </Link>
    </>
  )
}

)


export default Pizza