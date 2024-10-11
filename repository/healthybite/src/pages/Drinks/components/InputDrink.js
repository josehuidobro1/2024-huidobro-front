import React from 'react'

const InputDrink = ({name,measure,setValue, value, placeholderValue}) => {
    return (
    <div className='flex items-center justify-between w-full text-sm mt-2  text-healthyDarkGray1 font-quicksand'>
        <p className='w-2/3 font-semibold text-healthyGreen'>{name}</p>
        <div className='flex w-1/3 items-baseline justify-end'>
            <input type='number'  value={value} onChange={(e)=> e.target.value>0 && setValue(e.target.value)} className='bg-healthyGray p-1 w-2/3 text-right rounded-md focus:outline-none focus:ring  focus:ring-healthyGreen '/>
            <p className='text-xs ml-1 w-1/3'>{measure}</p>
        </div>
    </div>
    )
}

export default InputDrink