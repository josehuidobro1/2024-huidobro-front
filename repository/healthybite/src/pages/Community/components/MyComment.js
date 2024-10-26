import React from 'react'

const MyComment = ({text}) => {
  return (
    <div className='flex w-full justify-end items-center p-1 '>
        <div className='py-1 px-2 rounded-full flex justify-between items-center text-left text-sm font-semibold text-healthyOrange bg-healthyOrange/30 shadow-sm'>
            <p>{text}</p>
            
        </div>
    </div>
  )
}

export default MyComment