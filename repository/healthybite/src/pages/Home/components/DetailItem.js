import React from 'react'

const DetailItem = ({name,ammount,measure, unit, carb}) => {
  return (
    <div className={`flex justify-center ${carb ? 'grow  sm:min-w-12 sm:max-w-20': 'min-w-16'}  flex-col items-center text-white text-sm`}>
        <p className='font-semibold '>{name}</p>
        <p>{Math.ceil(ammount / measure)} {unit}</p>
    </div>
  )
}

export default DetailItem