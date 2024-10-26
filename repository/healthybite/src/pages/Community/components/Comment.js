import { faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Comment = ({text}) => {
  return (
    <div className='flex w-full justify-start items-center p-1 '>
        <div className='py-1 px-2 rounded-full flex justify-between items-center text-left text-sm font-semibold text-healthyGreen bg-hbGreen shadow-sm'>
            <p>{text}</p>
            
        </div>
    </div>
  )
}

export default Comment