import React, { useState } from 'react'

function Categories() {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    const [active, setActive] = useState(0);
  return (
    <div className="categories">
        <ul>
        {
            categories.map((category, ind) =>(
                <li onClick={()=> setActive(ind)} key={ind} className={ind == active ? 'active' : ''}>{category}</li>
            ))
        }
        </ul>
    </div>
  )
}

export default Categories
