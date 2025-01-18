import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { editAllergie, editUserData } from '../../../firebaseService';
import SelectItem from './SelectItem';

const AllergieItem = ({food, id,userdata, allergies, setAllergies, allergiesData,setAllergiesData}) => {
    const [details, setDetails]=useState(false)
    const [edit, setEdit]=useState(false)
    const [message, setMessage]=useState('')
    const [selectedFood, setSelectedFood]=useState(allergiesData.find(i=>i.id===id).foods_ids)

    const handleEdit=async()=>{
        if (edit ){
            if(selectedFood.length===0){
                setMessage('You must select at least one')
            }else if(selectedFood!==allergiesData.find(i=>i.id===id).foods_ids){
                const allergieEdited={id:id,name:allergiesData.find(e=>e.id===id).name, foods_ids:selectedFood}
                setAllergiesData([...allergiesData.filter(i=>i.id!==id), allergieEdited])
                await editAllergie(allergieEdited)
                setEdit(false)
                setMessage('')
            }
            
        }else{
            setEdit(true)
            setMessage('')
        }
        
    }

    const deleteAllergie=async ()=>{
        const newList=allergies.filter(e=>e!==id)
        setAllergies(newList)
        await editUserData({...userdata,allergies:newList})
    }

  return (
    <div className='flex flex-col w-full sm:w-48 md:w-52 py-2 px-2 m-1 rounded-md bg-healthyGray1/70 ' >
        <div className='flex justify-between items-center pb-1'>
            <p className='text-md font-semibold text-white '>{allergiesData.find(e=>e.id===id).name}</p>
            <FontAwesomeIcon onClick={()=>setDetails(!details)} icon={details ? faAngleDown : faAngleRight} className='text-md font-semibold text-white cursor-pointer hover:mt-1 hover:shadow-sm' />
        </div>
        {details &&
        <div className='flex flex-col items-between justify-between'>
            <div className='flex flex-col justify-start items-start w-full text-sm bg-white/70 rounded-b-md max-h-40 pt-1  overflow-y-auto px-1'>
                {edit ? 
                food.map((item,index)=><SelectItem key={index} checkedNow={selectedFood.includes(item.id)} value={item} setSelectedFood={setSelectedFood} selectedFood={selectedFood}  />)
                :(food.filter(i=>selectedFood.includes(i.id))).map((item,index)=>(<p key={index} className=' pb-1 w-full text-healthyDarkGray1'>{item.name}</p>))}
            </div>
            {message && <p className='text-xs bg-healthyOrange text-white font-semibold my-1 px-2 rounded-md '>{message}</p>}
            <div className='flex w-full justify-end items-center pt-1'>
                <button onClick={handleEdit}  className='text-xs font-bold text-healthyGray1 bg-white px-2 rounded-full mr-2  hover:shadow-lg ' >{edit ? 'Save': 'Edit'}</button>
                <button onClick={deleteAllergie} className='text-xs font-bold text-healthyGray1 bg-white px-2 rounded-full   hover:shadow-lg '>Delete</button>
            </div>
        </div>
        }
    </div>
  )
}

export default AllergieItem