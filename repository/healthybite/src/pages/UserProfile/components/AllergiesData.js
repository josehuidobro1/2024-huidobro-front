import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { editUserData } from '../../../firebaseService';

const AllergiesData = ({name,id, food,setAllergies, allergies,userData}) => {
    const [details, setDetails]=useState(false)

    const handleAllergie=async ()=>{
        const newList=[...allergies, id]
        await editUserData({...userData,allergies:newList})
        setAllergies(newList)


    }
  return (
    <div className='flex flex-col w-full sm:w-48 py-2 px-2 m-1 rounded-md bg-healthyGray1/70 ' >
        <div className='flex justify-between items-center pb-1'>
            <p className='text-md font-semibold text-white '>{name}</p>
            <div>
                <button onClick={handleAllergie} className='text-xs font-bold text-healthyGray1 bg-white px-2 rounded-full mr-2  hover:shadow-lg '>add</button>
                <FontAwesomeIcon onClick={()=>setDetails(!details)} icon={details ? faAngleDown : faAngleRight} className='text-md font-semibold text-white cursor-pointer hover:mt-1 hover:shadow-sm' />
            </div>
        </div>
        {details &&
        <div className='flex flex-col justify-start items-start w-full text-sm bg-white/70 rounded-b-md max-h-40 pt-1  overflow-y-auto px-1'>
            {food.map((item,index)=>(<p key={index} className=' pb-1 w-full text-healthyDarkGray1'>{item}</p>))}
        </div>}
    </div>
  )
}

export default AllergiesData