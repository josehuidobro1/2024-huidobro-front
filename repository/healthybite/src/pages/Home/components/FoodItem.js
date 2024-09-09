import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus} from '@fortawesome/free-solid-svg-icons'; 

const FoodItem = ({food,setSelection}) => {
    const [amount,setAmount]=useState()
    return (
    <div key={food.id_Food} className="flex flex-row items-center justify-between font-quicksand bg-white/60 p-2 rounded-lg mb-2 ">
        <div className="flex flex-row justify-start items-center ">
            <FontAwesomeIcon onClick={()=>setSelection({id_food:food.id_Food, name:food.name, amount:amount,measure:food.measure})} icon={faCirclePlus} className="text-3xl text-darkGray mx-1 hover:text-healthyDarkGray1 hover:cursor-pointer"/>
            <p className="font-bold text-lg text-darkGray px-2">{food.name}</p>
        </div>
        <div className="flex flex-row items-center justify-end">
            <input className="font-quicksand text-md w-16 text-right outline-none border-none px-1 py-1 rounded-md bg-white mr-2 " placeholder="000" type="number" onChange={(e)=>setAmount(e.target.value)}  />
            <p>{food.measure}</p>
        </div>
    </div>
    )
}

export default FoodItem