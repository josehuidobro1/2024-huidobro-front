import React from 'react'
import NavBar from '../../components/NavBar'
import bgImage from '../../assets/bgImage.jpg'
import bgImageMobile from '../../assets/bgImageMobile.jpg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='relative w-full justify-center items-center '>
        <NavBar/>
        <div className='w-full h-screen'>
            <img src={window.innerWidth < '1024' ? bgImageMobile  : bgImage}  className='h-full md:w-full object-cover'/>
        </div>
        <div className='absolute top-0 left-0 w-full   h-full text-healthyDarkGray1 text-center '>
            <div className='w-full flex items-center justify-center h-full'>
                <div className='flex justify-center items-center w-full md:w-1/3 h-full flex-col'>
                    <h3 className='font-belleza text-4xl text-center font-semibold '>Error</h3>
                    <h4 className='font-belleza text-8xl font-bold mt-2 mb-4'>404</h4>
                    <div className='flex flex-col  items-center md:w-2/3 '>
                        <p className='font-quicksand text-xl '>Page not found</p>
                        <Link to="/home"  className='font-quicksand text-xl text-healthyGreen font-semibold underline-offset-1 cursor-pointer '>Go Back Home</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default NotFound