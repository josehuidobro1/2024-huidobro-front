import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus} from '@fortawesome/free-solid-svg-icons'; 
import FoodItem from './FoodItem';
import SaveButton from './SaveButton';
import {   faIceCream, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Data from '../../Data'


function EditCategory({setEditCategory, setAddFood}) {
    const iconOptions = Data.iconOptions
    const [dropIcons,setDropIcons]=useState(false)
    const [iconSelected,setIconSelected]=useState(faIceCream)

    const handleChanges=()=>{
        // GUARDAR CAMBIOS EN BASE DE DATOS
        setEditCategory(false)
    }

    const hangleIcon=(icon)=>{
        setIconSelected(icon)
        setDropIcons(false)
    }


  return (
    <div className='flex flex-col w-full bg-healthyOrange p-2 rounded-b-md font-quicksand'>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center justify-between w-2/3 '>
                    <p className='font-semibold text-sm text-white  text-center w-1/4'>Name</p>
                    <input className=' rounded-sm p-1  bg-white text-sm w-3/4 ' type='text' placeholder='Dessert' ></input>
                </div>
                <div className='flex flex-row items-center justify-between w-1/3 '>
                    <p className='font-semibold text-sm text-white  text-center w-1/2 lg:w-2/3'>Icon</p>
                    <div className='flex flex-row bg-white items-center justify-between rounded-sm py-1 px-2 w-1/2 lg:w-1/3'>
                        <FontAwesomeIcon className='text-healthyGray1 text-lg' icon={iconSelected} />
                        <FontAwesomeIcon onClick={()=>setDropIcons(!dropIcons)} className='text-healthyGray1 text-lg hover:cursor-pointer hover:text-healthyDarkGray1' icon={faCaretDown} />
                    </div>
                </div>
            </div>
            {dropIcons &&<div className='w-full flex justify-end items-start relative'>
                <div className='w-2/12 max-h-48 overflow-y-auto  absolute shadow-lg bg-white p-1 rounded-md mb-1 flex flex-col items-center justify-center overflow-x-auto'>
                    {iconOptions.map((item)=>
                        <FontAwesomeIcon onClick={()=>hangleIcon(item.icon)} icon={item.icon} className='text-xl text-healthyGray1 mt-2 hover:cursor-pointer  hover:text-healthyDarkGray1' />)}
                </div>
            </div>}
            <div className='flex flex-col sm:flex-row justify-around sm:justify-between w-full items-center sm:items-start mt-3'>
                <div className='flex flex-row sm:flex-col items-center justify-between sm:justify-around w-full sm:w-1/3 lg:w-1/4'>
                    <p className='font-semibold text-sm text-white  text-left sm:text-center w-full mb-2'>Food</p>
                    <div onClick={()=>setAddFood(true)} className='hover:cursor-pointer hover:mt-1 w-4/5 flex flex-row items-center justify-between  py-1 px-2 rounded-md border-2 border-white'>
                        <p className='font-semibold text-xs text-white '>Add food</p>
                        <FontAwesomeIcon icon={faSquarePlus} className='text-xl text-white ' />
                    </div>
                </div>
                <div className='flex flex-col bg-white rounded-sm mt-2 sm:mt-0 w-full sm:w-2/3 lg:w-3/4 items-start justify-center p-1 max-h-32 overflow-y-auto'>
                    <FoodItem name="Cake" />
                    <FoodItem name="Cookie" />
                    <FoodItem name="Ice cream" />
                    <FoodItem name="Mousse" />
                </div>
            </div>
            <div className='flex w-full justify-center items-center pt-4 pb-2'>
                <SaveButton onClick={handleChanges} label="Save changes"/>
            </div>
        </div>
  )
}

export default EditCategory