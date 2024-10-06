import React, { useState } from 'react'
import FoodItem from './FoodItem'

const NewPlate = ({foodData}) => {

    const [value, setValue]=useState(0)

  return (
    <div className='bg-white border-2 flex flex-col justify-start items-center rounded-b-xl border-healthyGreen border-t-none w-full  max-h-[300px] md:max-h-[550px]   lg:max-h-[400px] overflow-y-auto'>
        <div className='flex  md:sticky md:top-0 py-2 w-full justify-center items-center text-healthyDarkGreen bg-white'>
            <input className=' text-sm font-semibold bg-healthyGray p-1 text-healthyDarkGreen focus:outline-none rounded-lg text-center w-10/12 focus:ring o focus:ring-healthyGreen' text="text" placeholder='Plate name' />
        </div>
        <div className='font-quicksand text-sm text-healthyGreen px-2 w-full '>
            {foodData.map((food)=>( <FoodItem food={food} />))}
        </div>
        <div className='flex justify-center items-center sticky mt-2 bottom-0 w-full py-2 cursor-pointer  bg-healthyGreen'>
            <button className='font-quicksand text-white font-bold text-sm'>Save changes</button>
        </div>
    </div>
  )
}

export default NewPlate