import { faBookmark, faCaretDown, faCaretRight, faEllipsisVertical, faPlus, faWineBottle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import DeletePopUp from '../../../components/DeletePopUp'

const DrinkItem = ({drink}) => {
    const optTimes=['Caffeine', 'Hydrating', 'Healthy', 'Alcohol']

    const [deleteItem, setDeleteItem]=useState(false)
    const [edit, setEdit]=useState(false)
    const [options, setOption]=useState(false)
    const [typeOptions, setTypeOptions]=useState(false)
    const [typePersonalize, setTypePersonalize]=useState('')
    const [typeSelected, setTypeSelected]=useState(drink.type)
    const [index, setIndex]=useState(optTimes.findIndex(item=>item===drink.type))
    const [clickable, setClickable] = useState(true);

    

    useEffect(()=>{
        setTypeOptions(false)
    },[typeSelected])


    const handleOptions=()=>{
        edit && setEdit(false)
        setOption(!options)
    }

    const handleDelete=()=>{
        console.log("Aca se debe eliminar la bebida")
    }
    const handleSingleClick = () => {
        if (clickable) {
            setClickable(false); 
            handleDelete()
            setTimeout(() => {
                setClickable(true); 
            }, 1000); 
        }
    };


    return (
        <>
    {deleteItem ?
    <DeletePopUp handleDelete={handleSingleClick} setCancel={setDeleteItem}/>
    :
    <div className='w-full lg:w-11/12 flex flex-col justify-center items-center  '>
        <div className='z-5 flex w-full justify-between mt-2 bg-white p-1  items-center rounded-full shadow-md'>
            <div className='flex items-center'>
                <FontAwesomeIcon icon={faWineBottle} className='border-4 border-healthyDarkOrange text-healthyDarkOrange py-2 px-2 text-2xl rounded-full' />
                <div className='flex flex-col justify-center items-start'>
                    <p className='font-semibold text-healthyDarkOrange ml-3'>{drink.name}</p>
                </div>
            </div>
            <div className='flex items-center'>
                {options &&
                <div className='flex items-center border-2 justify-center text-xs text-healthyOrange font-semibold border-healthyOrange px-2 rounded-full mr-3 '>
                    <p onClick={()=>setEdit(!edit)} className='cursor-pointer hover:text-healthyDarkOrange'>Edit</p>
                    <p onClick={()=>setDeleteItem(true)} className='ml-1 border-l-2 border-l-healthyOrange pl-1 hover:text-healthyDarkOrange cursor-pointer'>Delete</p>
                </div>}
                <FontAwesomeIcon onClick={handleOptions} icon={faEllipsisVertical} className='text-healthyDarkOrange cursor-pointer text-2xl mr-4'/>
            </div>
        </div>
        {edit && <div className='flex flex-col w-11/12 bg-healthyDarkOrange p-2 rounded-b-md  justify-center items-center '>           
            <div className='flex w-full  flex-wrap justify-center'>
                <div className='flex justify-center items-center m-1'>
                    <p className='text-white font-bold text-sm'>Drink name</p>
                    <input type="text" placeholder={drink.name} className='bg-white focus:outline-none  px-2 py-1 w-32 ml-2 text-right o rounded-full text-sm text-darkGray' />
                </div>

                <div className='flex justify-center items-center m-1'>
                    <p className='text-white font-bold text-sm'>Caffeine</p>
                    <input type="number" placeholder={drink.caffeine} className='bg-white focus:outline-none  px-2 py-1 w-20 ml-2 text-right o rounded-full text-sm text-darkGray' />
                </div>
                <div className='flex justify-center items-center m-1'>
                    <p className='text-white font-bold text-sm'>Sugar</p>
                    <input type="number" placeholder={drink.sugar} className='bg-white focus:outline-none  px-2 py-1 w-20 ml-2 text-right o rounded-full text-sm text-darkGray' />
                </div>
                <div className='flex justify-center items-center m-1'>
                    <p className='text-white font-bold text-sm'>Calories</p>
                    <input type="number" placeholder={drink.calories} className='bg-white focus:outline-none  px-2 py-1 w-20 ml-2 text-right o rounded-full text-sm text-darkGray' />
                </div>
                <div className='flex justify-center items-center m-1'>
                    <p className='text-white font-bold text-sm'>Type of calories</p>
                    <div className='flex items-center justify-start '>
                        <p  className='bg-white focus:outline-none  px-2 py-1 w-20 ml-2 text-right  rounded-l-full text-sm text-healthyDarkGray1'>{optTimes[index]}</p>
                        <FontAwesomeIcon onClick={()=> index===(optTimes.length-1) ? setIndex(0) : setIndex(index+1)} icon={faCaretRight} className='text-white cursor-pointer bg-healthyOrange p-1 px-2 text-xl hover:bg-healthyOrange/70 rounded-r-full'/>
                    </div>
                </div>
                <div onClick={()=>setEdit(false)} className=' hover:cursor-pointer bg-healthyOrange shadow-md py-1 rounded-full mx-3 my-1 flex flex-row items-center justify-center w-36 '>
                    <FontAwesomeIcon icon={faBookmark} className='text-white text-sm ' />
                    <p className='font-semibold text-xs  text-center  text-white ml-2'>Save changes</p>
                </div>
            </div>
        </div>}
    </div>
    }</>)
}

export default DrinkItem