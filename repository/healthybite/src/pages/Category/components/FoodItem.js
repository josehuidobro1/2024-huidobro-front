import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIceCream, faTrash, faPen, faSquarePlus, faCircleMinus} from '@fortawesome/free-solid-svg-icons'; 


function FoodItem({name}) {
  return (
    <div className='flex flex-row items-center justify-between p-2 w-full border-2 border-healthyGray rounded-sm'>
        <p className='text-healthyDarkGray1 text-sm text-left '>{name}</p>
        <FontAwesomeIcon icon={faCircleMinus} className='text-healthyDarkGray text-xl text-healthyDarkGray1 hover:cursor-pointer  hover:text-darkGray ' />
    </div>
  )
}

export default FoodItem