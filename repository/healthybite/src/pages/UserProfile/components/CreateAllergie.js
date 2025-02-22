import React, { useEffect, useState } from 'react'
import SelectItem from '../../../components/SelectItem';
import { createAllergy } from '../../../firebaseService';

const CreateAllergie = ({food,allergiesData, setAllergiesData}) => {
    const [selectedFood, setSelectedFood]=useState([])
    const [message, setMessage]=useState('')
    const [name, setName]=useState('')
    const [foodSearch, setFoodSearch]=useState(food)

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
        <div className='flex flex-col  items-start w-full max-h-80 overfow-y-auto '>
            <div className='w-full flex flex-col sm:flex-row  justify-between items-center p-1  h-fit '>
                <input value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder="Allergy's name"  className=' bg-healthyGray  rounded-md w-full md:w-3/5  text-healthyDarkGray1 px-1'/>
                <button onClick={handleCreation} className='bg-healthyBlue px-2 ml-1 md:ml-0 mt-2 py-1 rounded-md text-sm font-semibold text-white hover:bg-healthyDarkBlue text-center w-full md:w-1/5  '>Create allergy</button>
            </div>
            <div className='flex flex-col justify-start items-start  w-full px-1 '>
                <div className='flex items-center justify-center sm:justify-between flex-col w-full sm:flex-row'>
                    <p className='text-healthyDarkGray1 py-1 font-bold w-full sm:w-fit '>Includes: </p>
                    <div className='w-full sm:w-fit flex items-center rounded-sm  text-healthyDarkGray1 font-semibold font-quicksand text-sm md:w-48'>
                        <input className='decoration-none ring-offset-0 bg-healthyGray1/30 ring-0  rounded-lg p-1 w-full' type='text' placeholder='Search' onChange={(e)=>e.target.value==='' ? setFoodSearch(food) : setFoodSearch(food.filter(item=>(item.name.toLowerCase().includes((e.target.value).toLowerCase())))) } />
                    </div>
                </div>
                <div className='flex flex-wrap items-start justify-center p-2 rounded-md bg-healthyGray1/10 w-full '>
                    {foodSearch.length>0 ?
                    foodSearch.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1).map((item,index)=>(<SelectItem key={index} value={item} setSelectedFood={setSelectedFood} selectedFood={selectedFood} createAll={true} checkedNow={false} />))
                    :
                    <p className='w-full text-center font-bold texet-sm text-healthyGray1/50 '>We do not found the food you are looking&nbsp;for</p>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateAllergie