import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBookmark} from '@fortawesome/free-solid-svg-icons'; 
import SaveButton from './SaveButton';

function NewCategory() {
  return (
    <div className='flex p-2 font-quicksand flex-col w-full bg-healthyGreen rounded-b-md justify-center shadow-lg'>
        <div className='flex flex-row w-full items-center justify-between'>
            <p className='font-semibold text-white text-xs lg:text-sm mr-2 '>Name</p>
            <input className='bg-white rounded-md text-darkGray text-sm p-1 w-full' />
        </div>
        <div className='flex flex-row w-full items-center justify-between mt-3'>
            <p className='font-semibold text-white text-xs lg:text-sm mr-2 '>Icon</p>
            <input className='bg-white rounded-md text-darkGray text-sm p-1 w-full' />
        </div>
        <div className='flex flex-col w-full mt-3 '>
            <div className='w-full flex flex-row items-center justify-between'>
                <p className='font-semibold text-white text-xs lg:text-sm mr-2 '>Food</p>
                <div className='flex flex-row w-full items-center bg-white p-1 rounded-3xl ml-2'>
                    <input className='bg-white w-full '></input>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='ml-2 text-white bg-healthyGreen py-1 px-1 text-md rounded-full' />
                </div>
                
            </div>
            <div className='flex flex-col w-full p-2 bg-white rounded-md mt-1 max-h-56 overflow-y-auto'>
                <div className='flex flex-row items-center w-full justify-start mb-2'>
                    <input type="checkbox" className='text-xl text-darkGray ' />
                    <p className='tetx-darkGray ml-2  text-xs lg:text-sm'>Pizza</p>
                </div>
            </div>
            <div className='flex flex-row w-full justify-center items-center mt-2'>
                <SaveButton label="Save new category" />
            </div> 
        </div>
    </div>
  )
}

export default NewCategory