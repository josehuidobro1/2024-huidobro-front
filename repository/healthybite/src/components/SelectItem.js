import { Checkbox } from '@mui/material'
import React, { useState } from 'react'

const SelectItem = ({value,setSelectedFood, selectedFood, checkedNow}) => {

    const [checked, setChecked]=useState(checkedNow)
    
    const handleChange = (event) => {
        setChecked(event.target.checked);
        event.target.checked ? setSelectedFood([...selectedFood, value.id]) : setSelectedFood(selectedFood.filter(e=>e!==value.id))

    };
        
  return (
    <div className='flex justify-start items-center w-full pb-1'>
        <Checkbox checked={checked} onChange={handleChange}  inputProps={{ 'aria-label': 'controlled' }}  sx={{color: '#418FDE',margin: 0,padding: 0, '& .MuiSvgIcon-root': { fontSize: 20 } }} />
        <p className='text-healthyDarkGray1 text-sm ml-2 '>{value.name}</p>
    </div>
  )
}

export default SelectItem