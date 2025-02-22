import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleMinus} from '@fortawesome/free-solid-svg-icons'; 


function FoodItem({food, setCatFoods,catFoods}) {
  const handleDeleteFood=()=>{
    setCatFoods(catFoods.filter((item)=>item!==food))
  }

  return (
    <div className='flex flex-row items-center justify-between  border-2 px-2 border-healthyGray rounded-full'>
        <p className='text-healthyGray1 text-sm text-left text-semibold pr-1  '>{food.name}</p>
        <FontAwesomeIcon onClick={handleDeleteFood} icon={faCircleMinus} className='text-healthyDarkGray text-md text-healthyGray hover:cursor-pointer  hover:text-healthyGray1 ' />
    </div>
  )
}

export default FoodItem