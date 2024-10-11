import React, { useEffect, useState } from 'react'
import InputDrink from './InputDrink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretDown, faPlus} from '@fortawesome/free-solid-svg-icons'; 

export const NewDrink = ({setNewDrink}) => {
    const [name, setName]=useState('')
    const [sugar, setSugar]=useState(0)
    const [caffeine, setCaffeine]=useState(0)
    const [calories, setCalories]=useState(0)
    const [measure, setMeasure]=useState('')
    const [typeOptions, setTypeOptions]=useState(false)
    const [typePersonalize, setTypePersonalize]=useState('')
    const [typeSelected, setTypeSelected]=useState(null)

    useEffect(()=>{
        setTypeOptions(false)
    },[typeSelected])

    const handleNewDrink=()=>{
        console.log("Add new frink")
        setNewDrink(false)
    }

    return (
    <div className='bg-white border-2 flex flex-col justify-start items-center rounded-b-xl border-healthyGreen border-t-none w-full  max-h-[300px] md:max-h-[550px]   lg:max-h-[400px] overflow-y-auto'>
        <div className='flex flex-col md:sticky md:top-0 py-2 w-full justify-center items-center text-healthyDarkGreen bg-white'>
            <input value={name} onChange={(e)=>setName(e.target.value)} className=' text-sm font-semibold bg-healthyGray p-1 text-healthyDarkGreen focus:outline-none rounded-lg text-center w-10/12 focus:ring  focus:ring-healthyGreen' text="text" placeholder='Drink name' />
            <div className='w-11/12 flex items-start mt-2 justify-between'>
                <p className='text-sm font-semibold text-healthyGreen'>Type of drink </p>
                <div className='w-2/3 flex flex-col  items-end '>
                    <div className='flex justify-end items-center w-11/12 '>
                        <p className={`bg-healthyGray px-2 py-1 ${typeOptions ? 'rounded-tl-md' :'rounded-l-md'} w-4/5 text-xs`}>{typeSelected ? typeSelected : 'Select...'}</p>
                        <button onClick={()=>setTypeOptions(!typeOptions)} className={`flex items-center justify-center bg-healthyGreen text-white text-sm font-semibold ${ typeOptions ? 'rounded-tr-md' :'rounded-r-md'} py-1 px-3 w-1/5`}><FontAwesomeIcon icon={faCaretDown}/></button>
                    </div>
                    {typeOptions &&
                        <div className='w-11/12 flex flex-col justify-end  '>
                            <button onClick={()=>setTypeSelected('Caffeine')} className='text-sm text-right bg-hbGreen hover:border-healthyGreen border-2 border-hbGreen text-healthyDarkGreen  mt-1 px-2 rounded-sm '>Caffeine</button>
                            <button onClick={()=>setTypeSelected('Hydrating')} className='text-sm text-right bg-hbGreen hover:border-healthyGreen border-2 border-hbGreen text-healthyDarkGreen  mt-1 px-2 rounded-sm '>Hydrating</button>
                            <button onClick={()=>setTypeSelected('Healthy')} className='text-sm text-right bg-hbGreen hover:border-healthyGreen border-2 border-hbGreen text-healthyDarkGreen  mt-1 px-2 rounded-sm '>Healthy</button>
                            <div className='flex w-full justify-between items-center mt-2'>
                                {typePersonalize && <button onClick={()=>setTypeSelected(typePersonalize)} className='w-1/5 bg-healthyGreen text-white text-sm text-center py-1 rounded-l-sm hover:bg-healthyDarkGreen '><FontAwesomeIcon icon={faPlus}/></button>}
                                <input type="text" placeholder='Other type' onChange={(e)=>{setTypePersonalize(e.target.value)}} className={`bg-healthyGray2 text-right text-sm py-1  px-2  text-healthyGreen  focus:outline-none   ${typePersonalize ? 'w-4/5 rounded-r-sm' : 'w-full rounded-sm'} `} />
                            </div>
                        </div>
                    }
                </div>
            </div>
            
            <div className='flex flex-col justify-center w-11/12  mx-2 mt-1'>
                <InputDrink name='Sugar' measure='gr' setValue={setSugar}  value={sugar} />
                <InputDrink name='Calories' measure='cal' setValue={setCalories} value={calories} />
                <InputDrink name='Caffeine' measure='mg' setValue={setCaffeine} value={caffeine} />
            </div>
        </div>
        <div className='flex justify-center items-center sticky mt-2 bottom-0 w-full py-2 cursor-pointer  bg-healthyGreen'>
            <button onClick={handleNewDrink} className='font-quicksand text-white font-bold text-sm'>Save changes</button>
        </div>
    </div>
    )
}
