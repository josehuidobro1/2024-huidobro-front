import React from 'react'
import loader from '../assets/loader.gif'
function Loading({dashboard}) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
        {dashboard ?
        <div className='flex flex-col items-center justify-center w-10/12 sm:w-1/2 md:w-1/3 lg:w-1/4 '>
        <p className='font-bold text-center text-lg text-healthyGreen font-quicksand pb-5 w-full px-3 py-3'>This may take a while because your history is&nbsp;loading.</p>
        <img src={loader} alt='Loading...' className="w-full "/>
        </div>
        :<img src={loader} alt='Loading...' className="w-10/12 sm:w-1/2 md:w-1/3 lg:w-1/4 "/>}
    </div>
    
  )
}

export default Loading