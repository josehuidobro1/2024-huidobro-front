import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIceCream, faTrash, faPen} from '@fortawesome/free-solid-svg-icons'; 

import EditCategory from './EditCategory';


function CategoryItem({setAddFood}) {

    const [editCategory, setEditCategory]=useState(false)
  return (
    <div className='flex flex-col w-full '>
        <div className='w-full bg-healthyDarkOrange shadow-md p-2 rounded-md flex flex-row justify-between items-center font-quicksand'>
            <div className='flex flex-row items-center justify-start'>
                <FontAwesomeIcon icon={faIceCream} className='text-white text-3xl '/> 
                <p className='text-white font-semibold ml-2 text-md'>Dessert</p>
            </div>
            <div className='flex flex-row justify-end items-center'>
                <div className='bg-white hover:bg-healthyGray hover:cursor-pointer rounded-full py-1 px-2 '>
                    <FontAwesomeIcon  icon={faTrash} className='text-md text-healthyDarkOrange'/>
                </div>
                <div onClick={()=>setEditCategory(!editCategory)} className='bg-white hover:bg-healthyGray hover:cursor-pointer rounded-full py-1 px-2 ml-2 '>
                    <FontAwesomeIcon   icon={faPen} className='text-md text-healthyDarkOrange'/>
                </div>
            </div>
        </div>
        {editCategory && <EditCategory setAddFood={setAddFood} setEditCategory={setEditCategory}/>}
    </div>
  )
}

export default CategoryItem