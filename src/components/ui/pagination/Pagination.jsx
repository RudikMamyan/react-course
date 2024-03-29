import React from 'react'
import { getPagesArray } from '../../../utils/pages'

export const Pagination = ({changePage, page, totalPages}) => {
    let pagesArray = getPagesArray(totalPages) 

  return (
    <div className="page__wrapper">
    {
      pagesArray.map(p => 
        <span 
          key={p} 
          className={page === p ? 'page page__current' : 'page'}
          onClick={() => changePage(p)}
        >
            {p}
        </span>
      )
    }
    </div>
  )
}
