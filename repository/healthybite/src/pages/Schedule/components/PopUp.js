import { faCartShopping, faCopy, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'

const PopUp = ({schedule,setList, foodData, platesData, drinksData}) => {
    const [copy,setCopy]=useState(false)
    const [message, setMessage]=useState('')

    const [foodList, setFoodList ] = useState(()=>schedule.reduce((acc, curr) => {
        console.log('schedule list pop up ',schedule)
        curr.foodList.forEach(food => {

            const plate = platesData.find(plate => plate.id === food.food_id);
            if (plate) {
                plate.ingredients.forEach(ingredient => {
                const existingIngredient = acc.find(item => item.food_id === ingredient.ingredientId);
                const requiredQuantity = ingredient.quantity * food.quantity; // Calcular cantidad necesaria
                if (existingIngredient) {
                    existingIngredient.quantity += requiredQuantity;
                } else {
                    acc.push({ food_id: ingredient.ingredientId, quantity: requiredQuantity  });
                }
                });
            }else{
                const existingFood = acc.find(item => item.food_id === food.food_id); //recorre una or una la food de cada dia
                if (existingFood) {
                    existingFood.quantity += food.quantity; // si en los dias ya habia existido esa comida se suma
                } else {
                    acc.push({ food_id: food.food_id, quantity: food.quantity }); 
                }
            }
        });
        return acc;
    }, []))

    useEffect(()=>{
        if(copy && foodList){
            const content= `Shopping List\n${foodList.map((item)=>`${item.quantity} ${foodData.find(i=>i.id===item.food_id)?.measure || drinksData.find(i=>i.id===item.food_id)?.measure}  ${foodData.find(i=>i.id===item.food_id)?.name || drinksData.find(i=>i.id===item.food_id)?.name}`).join('\n')}`
            navigator.clipboard
            .writeText(content)
            .then(() => {
                setMessage('Content copied to clipboard!')
                setTimeout(() => {
                    setMessage('')
                }, 2500); 
            })
                .catch(err => {
                console.error('Error al copiar: ', err);
            });
            setCopy(false)
        }
    },[copy])


  return (
    <div className="w-full h-screen absolute top-0 z-10 flex font-quicksand justify-center items-center bg-black/50">
        <div className="w-11/12 sm:w-full flex flex-col text-md font-quicksand text-darkGray font-semibold justify-center shadow-lg items-center max-w-[400px] bg-healthyGray rounded-lg p-3  relative">
            <div className='flex items-center justify-between w-full p-1'>
                <div className='flex items-center justify-start text-healthyGreen'>
                    <FontAwesomeIcon className='mr-2 text-lg ' icon={faCartShopping} />
                    <p className='text-xl text-center font-bold'>Shopping List</p>
                </div>
                <div className='flex justify-end items-center '>
                    <button onClick={()=>setCopy(true)} className='px-2 py-1 rounded-md text-white bg-healthyGray1 hover:bg-healthyDarkGray1 text-center mr-3 shadow-sm '><FontAwesomeIcon icon={faCopy} className='text-lg text-white' /></button>
                    <FontAwesomeIcon onClick={()=>setList(false)} className='cursor-pointer text-healthyGray1 text-xl rounded-full hover:text-healthyDarkGray1  ' icon={faXmark} />
                </div>
            </div>
            <div className='w-full flex flex-col items-center justify-start mt-2 max-h-[300px] overflow-y-auto'>
                {message && <p className='px-2 bg-healthyGreen/70 font-semibold text-left text-xs text-white rounded-full py-1'>{message}</p>}
                {foodList.length>0 ? 
                foodList.map((item,index)=>(<ListItem key={index} name={foodData.find(i=>i.id===item.food_id)?.name || drinksData.find(i=>i.id===item.food_id)?.name} quantity={item.quantity} measure={foodData.find(i=>i.id===item.food_id)?.measure || drinksData.find(i=>i.id===item.food_id)?.measure}/>))
                :
                <p className='font-quicksand font-semibold text-healthyGray2 text-sm text-center py-2 px-1'>Meals are not&nbsp;planned</p>
                }
            </div>
        </div>
    </div>
  )
}

export default PopUp