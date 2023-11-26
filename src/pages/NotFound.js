import React, { memo } from 'react'
const NotFound = memo(function () {
  return (
    <div className='notfound-wrapper'>
      <h1>
        <span>😑</span>
        <br/>
          Ничего не найдено
      </h1>
        <p>
          Данная страница отсутствует
        </p>
    </div>
  )
}

) 

export default NotFound
