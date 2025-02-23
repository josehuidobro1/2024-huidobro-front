import React from 'react'
import NavBar from '../../components/NavBar'
import bgImage from '../../assets/bgImage.jpg'
import bgImageMobile from '../../assets/bgImageMobile.jpg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className=''>
        <NavBar />
        <div className='relative w-full justify-center items-center h-screen'>

            <div className='w-full h-full'>
                <img src={window.innerWidth < '1024' ? bgImageMobile  : bgImage}  className='w-full object-cover'/>
            </div>
            <div className='absolute top-0 left-0 w-full h-full text-healthyDarkGray1 text-center '>
                <div className='flex justify-center items-center w-full h-full flex-col'>
                    <h3 className='font-belleza text-4xl text-center font-semibold '>Error</h3>
                    <h4 className='font-belleza text-6xl font-bold my-4'>404</h4>
                    <div className='flex flex-col md:flex-row items-center '>
                        <p className='font-quicksand text-xl '>Page not found</p>
                        <Link to="/"  className='font-quicksand text-xl text-healthyGreen font-semibold underline-offset-1 cursor-pointer '>Go Back Home</Link>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default NotFound