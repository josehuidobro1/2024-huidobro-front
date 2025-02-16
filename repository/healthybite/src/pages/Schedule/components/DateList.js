import React, { useEffect, useState } from 'react'
import SelectItem from '../../../components/SelectItem'
import { createSchedule, editSchedule, editUserData } from '../../../firebaseService'
import Item from './Item'

const DateList = ({day,scheduleList,foodData ,setSchedule, platesData, drinksData}) => {
    if(day==='monday'){
        console.log('schedule list ', scheduleList)
    }
    const [schedule, setSched]=useState((scheduleList.length>0 && scheduleList.find(item=>item.day==day)) || null)
    const [edit,setEdit]=useState(false)
    const [selectedFood, setSelectedFood]=useState(scheduleList.length>0 && scheduleList.find(item=>item.day==day) ? scheduleList.find(item=>item.day==day).foodList: [])
    const [view, setView]=useState(0)

    useEffect(()=>{
        setSched((scheduleList.length>0 && scheduleList.find(item=>item.day==day)) || null)
    },[scheduleList])

    const handleEdit=async()=>{
        if(edit && selectedFood.length>0){
            const data={day:day, foodList:selectedFood}
            schedule ? await editSchedule(schedule.id, data) : await createSchedule(data)
            setSched(data)
            console.log('Scheduleee ', schedule)
            console.log('Scheduleee now ', data)
            const schedulEdited= scheduleList.includes(item=>item.day==day) && schedule ? scheduleList.map(item=>item.day===schedule.day ? {...item,foodList:selectedFood} : item) : [...scheduleList,{...data}]
            console.log('ScheduleEdited ', schedulEdited)
            setSchedule(schedulEdited)
        }
        setEdit(!edit)
    }

  return (
    <div className='flex flex-row font-quicksand   sm:flex-col w-full md:w-48 lg:w-44 sm:mx-1 mt-1  sm:mt-2 sm:items-center  sm:justify-start sm:p-1 rounded-md bg-white/70 sm:bg-healthyGreen/20'>
        <div className='flex flex-col items-stretch justify-around bg-healthyGreen/40 sm:bg-healthyGreen/20 sm:justify-center sm:flex-col w-1/3 sm:w-full '>
            <div className='w-full flex justify-center items-center sm:bg-healthyGreen/40 p-1 sm:p-0'>
                <p className='font-bold w-full text-center text-md  px-2 py-1 rounded-md mb-0 sm:mb-1 text-white '>{day.charAt(0).toUpperCase() + day.slice(1)}</p>
            </div>
            <div className='flex justify-around items-center pb-2  sm:py-1 w-full sm:bg-healthyGreen/20 '>
                <button onClick={handleEdit} className='px-2 rounded-full text-xs font-bold text-white bg-healthyGray1 hover:bg-healthyDarkGray1 shadow-sm'>{edit ? 'Save' : schedule ? 'Edit' : 'Add'}</button>
            </div>
        </div>
        <div className='flex flex-col overflow-y-auto w-2/3  sm:w-full h-full sm:max-h-56 md:max-h-72  justify-start sm:bg-white/70 p-1  rounded-sm  sm:mt-1 flex-wrap sm:flex-nowrap'>
            {edit ?
                <div className='flex flex-col w-full '>
                    <button onClick={()=>setView( view===1 ? 0 : 1)} className='bg-healthyGray1 rounded-sm font-semibold text-sm text-white hover:bg-healthyDarkGray1 ext-center py-1 mt-1 '>Food</button>
                    
                    {view===1 && foodData && foodData.length>0 && <div className='max-h-24 sm:h-full overflow-y-auto'> {foodData.map((item,index)=>
                        <Item key={index} selectedFood={selectedFood} item={item} setSelectedFood={setSelectedFood} schedule={schedule}/>
                    )}</div>}
                    <button onClick={()=>setView( view===2 ? 0 : 2)} className='bg-healthyGray1 rounded-sm font-semibold text-sm text-white hover:bg-healthyDarkGray1 text-center py-1 mt-1'>Plates</button>
                    
                    {view===2 && platesData && platesData.length>0 && <div className='max-h-24 sm:h-full overflow-y-auto'>{ platesData.map((item,index)=>
                        <Item key={index} selectedFood={selectedFood} item={item} setSelectedFood={setSelectedFood} schedule={schedule}/>
                    )}</div>}
                    <button onClick={()=>setView( view===3 ? 0 : 3)} className='bg-healthyGray1 rounded-sm font-semibold text-sm text-white hover:bg-healthyDarkGray1 text-center py-1 mt-1'>Drinks</button>
                    
                    {view===3 && drinksData && drinksData.length>0 && <div className='max-h-24 sm:h-full overflow-y-auto'>{ drinksData.map((item,index)=>
                        <Item key={index} selectedFood={selectedFood} item={item} setSelectedFood={setSelectedFood} schedule={schedule}/>
                    )}</div>}
                </div>
                :
                schedule ?
                schedule.foodList.map((item,index)=>(
                <div key={index} className='flex items-center w-full pt-1 font-quicksand text-sm text-healthyDarkGray1  '>
                    <div className='bg-healthyGreen/20 px-1 w-1/4 sm:w-4/12 text-center flex h-hull items-baseline justify-center  rounded-md mr-1'>
                        <p className='font-semibold mr-1 '>{item.quantity} </p>
                        <span className='text-xs font-light sm:font-extralight'>{platesData.find(e=>e.id===item.food_id) ? 'plate/s' : foodData.find(e=>e.id===item.food_id)?.measure || drinksData.find(e=>e.id===item.food_id)?.measure }</span>
                    </div>
                    <p className='text-xs w-3/4 sm:w-8/12 '>{foodData.find(e=>e.id===item.food_id)?.name || platesData.find(e=>e.id===item.food_id)?.name || drinksData.find(e=>e.id===item.food_id)?.name }</p>
                </div>))
                :
                <p className='text-center text-xs font-semibold text-healthyGray1 py-2 '>Click "Add" to plan your meals for the&nbsp;day</p>
                

            }
        </div>
    </div>
  )
}

export default DateList