import React, { useState } from 'react'
import SelectItem from '../../../components/SelectItem';
import { createAllergy } from '../../../firebaseService';

const CreateAllergie = ({food,allergiesData, setAllergiesData}) => {
    const [selectedFood, setSelectedFood]=useState([])
    const [message, setMessage]=useState('')
    const [name, setName]=useState('')
    
    const handleCreation=async()=>{
        if(selectedFood.length===0){
            setMessage('You must select at least one item')
        }else if(name===''){
            setMessage('Add a name to the allergy')
        }
        if(selectedFood.length>0 && name!==''){
            setAllergiesData([...allergiesData,{name:name,foods_ids:selectedFood}])
            await createAllergy({name:name,foods_ids:selectedFood})
            setName('')
            setSelectedFood([])
            setMessage('ok')
            setTimeout(() => setMessage(""), 2500)
        }
    }

  return (
    <div className='flex flex-col w-full '>
        {message && <p className={`${message==='ok' ? 'text-healthyGreen' : 'text-healthyOrange'} text-left text-xs font-bold py-1`} >{message==='ok' ? 'The allergy was successfully created' : message}</p>}
        <div className='flex flex-col md:flex-row items-start w-full max-h-80 overfow-y-auto '>
            <div className='w-full md:w-2/5 flex flex-row md:flex-col justify-around md:justify-center items-center p-1  h-fit '>
                <input value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder="Allergy's name"  className=' bg-healthyGray  rounded-md md:w-full  text-healthyDarkGray1 px-1'/>
                <button onClick={handleCreation} className='bg-healthyBlue px-2 ml-1 md:ml-0 md:mt-2 py-1 rounded-md text-sm font-semibold text-white hover:bg-healthyDarkBlue text-center'>Create allergy</button>
            </div>
            <div className='flex flex-col justify-start items-start md:w-3/5 w-full px-1 '>
                <p className='text-healthyDarkGray1 py-1 font-bold '>Includes: </p>
                {food.map((item,index)=>(<SelectItem key={index} value={item} setSelectedFood={setSelectedFood} selectedFood={selectedFood} />))}
            </div>
        </div>
    </div>
  )
}

export default CreateAllergie