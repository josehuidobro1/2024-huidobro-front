import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faPenToSquare, faCircleCheck} from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns';
import React, { useState } from "react";


const FoodConsumed = ({ usfood, handleDeleteMeal , handleEditFoodConsumed}) => {
    const [edit, setEdit]=useState(false)
    const [time, setTime]=useState(new Date(usfood.date_ingested))
    const [amount, setAmount]=useState(usfood.amount_eaten)

    const handleChange=()=>{
        if(amount >0 )
        {const updatedUsfood = {
            ...usfood,
            date_ingested: new Date(time),
            amount_eaten: Number(amount),
        };
        handleEditFoodConsumed(usfood.id, updatedUsfood)
        setEdit(false)}

    }

    return (
        <div className={`flex ${edit ? 'flex-col xs:flex-row ' : 'flex-row'} justify-between items-center w-full py-2 px-4 rounded-2xl bg-hbGreen font-quicksand my-1`}>
            <div className={`flex ${edit ?   'flex-row items-center w-1/2 xs:w-1/3 lg:w-1/2 justify-around xs:justify-center mb-2 xs:mb-0 ': 'flex-col items-start justify-center' }   `}>
                <p className="text-md text-darkGray font-semibold text-left">{usfood.name}</p>
                {edit ?
                    <div className='flex flex-row items-center justify-start xs:ml-3'>
                        <input value={amount} onChange={(e)=> setAmount(e.target.value)} type='number' placeholder={usfood.amount_eaten} className={`py-1 px-2 text-xs text-right text-darkGray rounded-lg w-5/12 max-w-[100px] focus:outline-none focus:ring focus:ring-healthyGreen ${(amount <1 | !amount) && 'ring ring-red-500'}`}/>
                        <p className="text-sm text-darkGray ml-2"> {usfood.measure}</p>
                    </div>
                :
                    <p className="text-xs text-darkGray w-full">{amount} {usfood.measure}</p>}
            </div>
            <div className='flex flex-row items-center justify-end w-1/2'>
                <div className= {`flex ${edit ?   'flex-col-reverse md:flex-row items-center': 'flex-col items-end'}  justify-end pr-2`}>
                    <p className={`text-md ${edit && 'mt-2 md:mt-0 md:mr-3'}`}>
                        {Math.ceil((usfood.calories_portion * usfood.amount_eaten) / usfood.measure_portion)} cal
                    </p>
                    {edit ? 
                        <input onChange={(e)=>setTime(e.target.value)} value={time} type='datetime-local' placeholder={time} className="py-1 px-3 rounded-xl text-sm text-darkGray text-quicksand focus:outline-none focus:ring focus:ring-healthyGreen w-full xs:w-1/2 " />
                    :
                        <p className="text-xs">{format(time, "HH:mm")}</p>
                    }
                </div>
                {edit ?
                    <FontAwesomeIcon onClick={handleChange} icon={faCircleCheck} className='text-healthyGreen hover:text-healthyDarkGreen cursor-pointer text-xl ml-2'/>
                :
                <div className='flex flex-col justify-center sm:flex-row sm:justify-end items-around sm:items-center  sm:ml-3'>
                    <FontAwesomeIcon onClick={()=>setEdit(true)} icon={faPenToSquare} className='text-md sm:text-xl text-darkGray cursor-pointer hover:text-healthyDarkGray1 mb-1 sm:mb-0'/>
                    <FontAwesomeIcon onClick={() => {handleDeleteMeal(usfood.id)}}  icon={faCircleXmark}  className="text-red-500 cursor-pointer text-md sm:text-xl hover:text-red-700 sm:ml-3"/>
                </div>}
            </div>
        </div>
    );
};


export default FoodConsumed
