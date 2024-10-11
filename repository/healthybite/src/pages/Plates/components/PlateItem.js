import React, { useEffect, useState } from 'react'
import { faBookmark, faCirclePlus, faEllipsisVertical, faUtensils } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Counter from '../../../components/Counter'
import EditFood from './EditFood'
import DeletePopUp from '../../../components/DeletePopUp'
import {deleteplate,updatePlate} from '../../../firebaseService'

export const PlateItem = ({ plate, foodData }) => {
    const [options, setOption] = useState(false)
    const [edit, setEdit] = useState(false)
    const [deleteItem, setDeleteItem] = useState(false)

    // Map the ingredients to corresponding food data
    const foodPlate = plate.ingredients.map((item) => {
        const foodItem = foodData.find((food) => food.id === item.ingredientId)
        return foodItem ? { ...foodItem, amount: item.quantity } : null
    }).filter(Boolean) // Remove null values if no match found

    useEffect(() => {
        console.log(foodPlate)
    }, [foodPlate])
    const updateData=async()=>{
    }
    
    const handleOptions = () => {
        edit && setEdit(false)
        setOption(!options)
    }

    const handleDelete = async() => {
        try{
            await deleteplate(plate.id)
        }catch(error){
            console.log("Error deleting category: ", error)
        }
    }
    

    return (
        <>
            {deleteItem ? 
                <DeletePopUp handleDelete={handleDelete} setCancel={setDeleteItem} />
                : 
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='z-5 flex w-full justify-between mt-2 bg-white p-1 items-center rounded-full shadow-md'>
                        <div className='flex items-center'>
                            <FontAwesomeIcon icon={faUtensils} className='border-4 border-healthyDarkOrange text-healthyDarkOrange py-2 px-2 text-2xl rounded-full' />
                            <div className='flex flex-col justify-center items-start'>
                                <p className='font-semibold text-healthyDarkOrange ml-3'>{plate.name}</p>
                                <p className='text-xs text-healthyDarkOrange ml-3'>
                                    {foodPlate.reduce((acc, item) => acc + (item.calories_portion * item.amount), 0)} calories
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            {options &&
                                <div className='flex items-center border-2 justify-center text-xs text-healthyOrange font-semibold border-healthyOrange px-2 rounded-full mr-3'>
                                    <p onClick={() => setEdit(!edit)} className='cursor-pointer hover:text-healthyDarkOrange'>Edit</p>
                                    <p onClick={() => setDeleteItem(true)} className='ml-1 border-l-2 border-l-healthyOrange pl-1 hover:text-healthyDarkOrange cursor-pointer'>Delete</p>
                                </div>
                            }
                            <FontAwesomeIcon onClick={handleOptions} icon={faEllipsisVertical} className='text-healthyDarkOrange cursor-pointer text-2xl mr-4' />
                        </div>
                    </div>
                    {edit && <div className='flex flex-col w-11/12 bg-healthyDarkOrange p-2 rounded-b-md'>
                        <div className='flex flex-row justify-between items-start'>
                            <div className='flex flex-col w-10/12'>
                                {foodPlate.map((item, index) => (<EditFood item={item} key={index} />))}
                            </div>
                            <FontAwesomeIcon icon={faCirclePlus} className='text-2xl w-1/12 text-white hover:text-healthyDarkOrange2 cursor-pointer' />
                        </div>
                        <div className='w-full flex justify-center items-center'>
                            <div className='hover:cursor-pointer bg-white shadow-md rounded-2xl px-2 lg:px-4 py-1 flex flex-row items-center justify-center mt-2 w-full lg:w-1/2'>
                                <FontAwesomeIcon icon={faBookmark} className='text-healthyOrange text-sm' />
                                <p className='font-semibold text-xs text-center text-healthyOrange ml-2'>Save changes</p>
                            </div>
                        </div>
                    </div>}
                </div>
            }
        </>
    )
}
