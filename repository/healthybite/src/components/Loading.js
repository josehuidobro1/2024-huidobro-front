import React from 'react'
import loader from '../assets/loader.gif'
function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <img src={loader} alt='Loading...' className="w-10/12 "/>
    </div>
  )
}

export default Loading