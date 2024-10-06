import { faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Counter from '../../../components/Counter'

const FoodItem = ({food}) => {
    const [value, setValue]=useState(0)
  return (
    <div className='flex w-full justify-between items-center mt-1'>
        <p className='text-sm font-semibold w-2/3'>{food.name}</p>
        <div className='flex justify-end items-center'>
            <p className='text-xs '>{food.measure}</p>
            <Counter value={value} setValue={setValue} colour='bg-healthyGreen'/>
        </div>
    </div>
  )
}

export default FoodItem