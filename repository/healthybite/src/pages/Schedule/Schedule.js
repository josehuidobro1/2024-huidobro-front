import React, { useEffect, useState } from 'react'
import bgImage from '../../assets/schedule1.jpg'
import NavBar from '../../components/NavBar'
import Loading from '../../components/Loading'
import { deleteSchedule, fetchAllFoods, fetchUser, getPlatesNotUser, getPublicPlates, getSchedule, getUserDrinks, getUserPlates } from '../../firebaseService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faTrash } from '@fortawesome/free-solid-svg-icons'
import DateList from './components/DateList'
import PopUp from './components/PopUp'
import DeletePopUp from '../../components/DeletePopUp'

const Schedule = () => {
    const [loading, setLoading]=useState(true)
    const [clean, setClean]=useState(false)
    const [schedule, setSchedule]=useState()
    const [food, setFood]=useState([])
    const [plates, setPlates]=useState([])
    const [drinks, setDrinks]=useState([])
    const [list, setList]=useState(false)
    const dates=['monday', 'tuesday', 'wednesday','thursday','friday', 'saturday','sunday']

    const setter=(foodData, plates, drinksData, scheduleData )=>{
        setFood(foodData)
        setPlates(plates)
        setDrinks(drinksData)
        setSchedule(scheduleData || [])
        setLoading(false)
    }

    const getData=async()=>{
        const otherPlates= await getPlatesNotUser()
        const myPlates=await getUserPlates()
        const [schedule, drinksData, foodData ]=await Promise.all([getSchedule(),   getUserDrinks(), fetchAllFoods()])
        console.log('scheduleeeee ', schedule)
        foodData && otherPlates && setter(foodData, myPlates.concat(otherPlates),drinksData,schedule || [])
        
    }

    useEffect(()=>{
        setLoading(true)
        !schedule && getData()
    },[])

    const handleClean=async ()=>{
        if(schedule.length>0){
            setSchedule([])
            await deleteSchedule()}
        setClean(false)
    }

    return (
    <div className='h-screen sm:h-full  overflow-y-hidden'>
        <NavBar/>
        {loading ? 
            <Loading />
        :
        <div className='flex flex-col-reverse md:flex-row justify-start items-start bg-healthyGray2  w-full h-full sm:h-screen overflow-y-auto md:overflow-y-hidden'>
            {window.innerWidth > '768' &&
            <div className='w-full md:w-4/5 h-screen lg:w-1/4 flex justify-start '>
                <img src={bgImage} alt="Background image" className=' w-full object-cover h-full' />
            </div>
            }
            <div className='w-full h-full md:h-screen flex flex-col justify-start items-center px-2 sm:px-8 overflow-y-auto pb-0 sm:pb-8 '>
                <div className='flex flex-col lg:flex-row bg-healthyGray2 justify-between items-center sticky top-0 w-full pt-4 md:pt-24  pb-4 z-5 '>
                    <h1 className='font-belleza text-3xl sm:text-2xl text-left font-semibold text-healthyGreen'>Food Schedule</h1>
                    <div className='flex items-center justify-around lg:justify-end  w-full mt-2  sm:mt-4 lg:mt-0  '>
                        <div  onClick={()=>setClean(true)}  className='mr-3 flex w-1/3 lg:w-fit  items-center cursor-pointer justify-center px-3 sm:px-4 py-2 sm:py-3 rounded-sm  bg-healthyGray1 hover:bg-healthyDarkGray1 font-bold text-white  shadow-md'>
                            <FontAwesomeIcon icon={faTrash} className='mr-2' />
                            <p>Clear all</p>
                        </div>
                        <div onClick={()=>setList(true)} className='flex items-center w-2/3  lg:w-fit justify-center px-3 sm:px-4 py-2 sm:py-3 rounded-sm cursor-pointer bg-healthyGreen hover:bg-healthyDarkGreen shadow-md'>
                            <FontAwesomeIcon icon={faCartShopping} className='text-white text-md '/>
                            <p className='text-white text-md font-bold ml-3'>Shopping List</p>
                        </div>
                    </div>
                </div>
                <div className='flex w-full justify-start items-start sm:justify-center sm:items-stretch sm:align-middle  py-2  flex-wrap h-full pb-20 sm:pb-2 z-2 '>
                    { food && dates.map((day)=><DateList key={day} day={day} scheduleList={schedule || []} setSchedule={setSchedule} foodData={food} platesData={plates} drinksData={drinks} />)}
                </div>
            </div>
        </div>
        }
        {list && <PopUp setList={setList} schedule={schedule} foodData={food} drinksData={drinks} platesData={plates}/>}
        {clean && <DeletePopUp setCancel={setClean} handleDelete={handleClean} />}
    </div>
    )
}

export default Schedule