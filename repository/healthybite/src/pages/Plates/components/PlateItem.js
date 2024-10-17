import React, { useEffect, useState } from 'react'
import { faBookmark, faCirclePlus, faEllipsisVertical, faUtensils } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Counter from '../../../components/Counter'
import EditFood from './EditFood'
import DeletePopUp from '../../../components/DeletePopUp'
import {deleteplate,updatePlate} from '../../../firebaseService'

export const PlateItem = ({ plate, foodData, handleupdatePlates,setSuccessMessage , setAddFood,selection, setPlate}) => {
    const [options, setOption] = useState(false)
    const [edit, setEdit] = useState(false)
    const [deleteItem, setDeleteItem] = useState(false)
    const [clickable, setClickable] = useState(true);
    const [ingredientsUpdate, setIngredientsUpdate] = useState(
        plate.ingredients.map((item) => ({ ...item })) // Clone ingredients
    );
    const [foodPlate, setFoodPlate]=useState(ingredientsUpdate.map((item) => {
        const foodItem = foodData.find((food) => food.id === item.ingredientId);
        return foodItem ? { ...foodItem, amount: item.quantity } : null;
    }).filter(Boolean))
    
    const handleRemoveIngredient = (index) => {
        const updatedIngredients = ingredientsUpdate.filter((_, idx) => idx !== index);
        setIngredientsUpdate(updatedIngredients);
    };

    useEffect(()=>{
        if(plate && foodData.length>0 && plate.ingredients.length>0){
            const newFoodData=plate.ingredients.map((item)=>{
                const foodItem = foodData.find((food) => food.id === item.ingredientId);
                return foodItem && { ...foodItem, amount: item.quantity } ;
            })
            
            setFoodPlate(newFoodData)}
        
    },[selection])
    useEffect(() => {
        if (plate && plate.ingredients && foodData.length > 0) {
            const newFoodData = plate.ingredients.map((item) => {
                const foodItem = foodData.find((food) => food.id === item.ingredientId);
                return foodItem && { ...foodItem, amount: item.quantity };
            }).filter(Boolean);
            
            setFoodPlate(newFoodData);
        }
    }, [plate, foodData, selection]);
    
    useEffect(() => {
        const updatedFoodPlate = ingredientsUpdate.map((item) => {
            const foodItem = foodData.find((food) => food.id === item.ingredientId);
            return foodItem ? { ...foodItem, amount: item.quantity } : null;
        }).filter(Boolean);
        
        setFoodPlate(updatedFoodPlate);
    }, [ingredientsUpdate, foodData]);
    

    const handleUpdateIngredient = (index, newQuantity) => {
        const updatedIngredients = ingredientsUpdate.map((ingredient, idx) => 
            idx === index ? { ...ingredient, quantity: newQuantity } : ingredient
        );
        setIngredientsUpdate(updatedIngredients);
    };

    const updateData=async()=>{
        const updatedPlate = {
            ...plate,
            image: plate.image,
            ingredients: ingredientsUpdate,
            calories_portion: foodPlate.reduce((acc, item) => acc + (item.calories_portion * item.amount), 0), // Updated ingredients with new quantities
        };
        try {
            await updatePlate(updatedPlate,plate.id ); // Assuming updatePlate is your Firebase update function
            setSuccessMessage('Plate updated successfully!'); // Set success message
            setTimeout(() => setSuccessMessage(''), 1000); // Clear message after 3 seconds
            setEdit(false)
        } catch (error) {
            console.error('Error updating plate:', error);
        }
    }
    
    const handleOptions = () => {
        edit && setEdit(false)
        setOption(!options)
    }

    const handleDelete = async() => {
        try{
            await deleteplate(plate.id)
            handleupdatePlates()
            setDeleteItem(false)

        }catch(error){
            console.log("Error deleting category: ", error)
        }
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
    
    const handleAddFood=()=>{
        console.log('EL PLATO SELECCIONADO ',plate)
        setPlate(plate)
        setAddFood(true)
    }

    return (
        <>
            {deleteItem ? 
                <DeletePopUp handleDelete={handleSingleClick} setCancel={setDeleteItem} />
                : 
                <div className='w-full flex flex-col justify-center items-center'>

                    <div className='z-5 flex w-full justify-between mt-2 bg-white p-1 items-center rounded-full shadow-md'>
                    <div className='flex items-center'>
                            {plate.image ? (
                            <img 
                                src={plate.image} 
                                alt={plate.name} 
                                className='w-12 h-12 object-cover border-2 border-healthyDarkOrange rounded-full'
                            />
                            ) : (
                                <FontAwesomeIcon icon={faUtensils} className='border-2 border-healthyDarkOrange text-healthyDarkOrange py-2 px-2 text-2xl rounded-full' />

                            )}
                            <div className='flex flex-col justify-center items-start ml-3'>
                            <p className='font-semibold text-healthyDarkOrange'>{plate.name}</p>
                            <p className='text-xs text-healthyDarkOrange'>
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
                                {foodPlate.map((item, index) => (
                                    <EditFood
                                        item={item}
                                        key={index}
                                        onQuantityChange={(newQuantity) => handleUpdateIngredient(index, newQuantity)}
                                        onRemove={() => handleRemoveIngredient(index)}
                                    />
                                ))}
                            </div>
                            <FontAwesomeIcon onClick={handleAddFood} icon={faCirclePlus} className='text-2xl w-1/12 text-white hover:text-healthyDarkOrange2 cursor-pointer' />
                        </div>
                        <div className='w-full flex justify-center items-center'>
                            <div onClick={updateData} className='hover:cursor-pointer bg-white shadow-md rounded-2xl px-2 lg:px-4 py-1 flex flex-row items-center justify-center mt-2 w-full lg:w-1/2'>
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
