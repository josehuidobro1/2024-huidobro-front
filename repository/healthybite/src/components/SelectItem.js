import { Checkbox } from '@mui/material'
import React, { useState } from 'react'

const SelectItem = ({value,setSelectedFood, selectedFood, createAll,checkedNow}) => {

    const [checked, setChecked]=useState(checkedNow)
    
    const handleChange=(status) => {
      console.log('El status ',status)
      !status ? setSelectedFood([...selectedFood, value.id]) : setSelectedFood(selectedFood.filter(e=>e!==value.id))
      setChecked(!status);
    }
        
  return (
    <button onClick={()=>handleChange(checked)}  className={`flex justify-start items-center cursor-pointer py-1 ${createAll ? 'rounded-full border-2' :'w-full'} px-2  mb-1 mr-1 ${checked ? 'bg-healthyBlue border-healthyBlue': ' border-healthyGray1'}`}>
        <p className={`${checked ? 'text-white' :'text-healthyDarkGray1'} text-sm text-left  `}>{value.name}</p>
    </button>
  )
}

export default SelectItem