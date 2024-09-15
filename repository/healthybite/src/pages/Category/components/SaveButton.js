import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBookmark} from '@fortawesome/free-solid-svg-icons'; 


function SaveButton({label}) {
  return (
    <div className='bg-darkGray hover:cursor-pointer hover:mt-1 hover:bg-healthyDarkGray1 shadow-md  rounded-2xl px-2 lg:px-4 py-2 flex flex-row items-center justify-center'>
        <FontAwesomeIcon icon={faBookmark} className='text-white tetx-xl ' />
        <p className='font-semibold text-xs lg:text-sm text-center  text-white ml-2'>{label}</p>
    </div>
  )
}

export default SaveButton