import React, { useState } from 'react'

const Item = ({schedule, item, setSelectedFood, selectedFood}) => {
    const [food, setFood] = useState(() => {
        const foundFood = selectedFood?.find(e => e.food_id === item.id);
        return foundFood || { food_id: item.id, quantity: 0 };
    });
    
    const handleQuantity=(number)=>{
        let newList=[]

        if(selectedFood?.length >0 ){
            newList=[...selectedFood.filter(i=>i.food_id!==food.food_id),{food_id:item.id , quantity: Number(number)}]
        }else{
            newList= [{food_id: item.id , quantity:Number(number)}]
        }
        console.log(newList)
        setFood({...food, quantity:number})
        setSelectedFood(newList)
    }
  return (
    <div className='flex w-full justify-between items-center pt-1 px-1 font-quicksand'>
        <input className='bg-healthyGray  mr-1 text-center text-healthyDarkGray1 rounded-sm text-sm font-semibold w-1/3 h-fit' type="number" placeholder='0' value={food && food.quantity} onChange={(e)=>e.target.value>=0 && handleQuantity(e.target.value)} />
        <p  className='w-2/3 text-left text-xs text-healthyDarkGray1'>{item.name}</p>
    </div>
  )
}

export default Item