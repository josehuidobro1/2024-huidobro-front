import React from 'react'

const ListItem = ({name, quantity, measure}) => {
  return (
    <div className='flex w-full items-center justify-between pb-1 border-2 border-b-healthyGray1/30 mt-1'>
        <div className='flex items-center justify-start'>
          <p className='text-md font-semibold w-8 text-center bg-healthyGray1 px-2 text-white rounded-sm mr-2 '>{quantity}</p>
          <p className='text-md text-healthyDarkGray1'>{name}</p>
        </div>
        <p className='text-xs text-healthyGray1 text-left'>({measure})</p>
    </div>
  )
}

export default ListItem