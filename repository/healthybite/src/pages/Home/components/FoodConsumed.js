import React from 'react'
import { format } from 'date-fns';

const FoodConsumed = ({usfood}) => {
    return (
        <div  className="flex justify-between items-center w-full py-1 px-4 rounded-2xl bg-hbGreen font-quicksand my-1">
            <div className="flex flex-col items-center justify-center ">
                <p className="text-md text-darkGray font-semibold">{usfood.name}</p>
                <p className="text-xs text-darkGray">{usfood.amount_eaten} {usfood.measure}</p>
            </div>
            <div className="flex flex-col items-end justify-center">
                <p className="text-md">{(usfood.calories*usfood.amount_eaten)/usfood.amount} cal</p>
                <p className="text-xs">{format(usfood.date_ingested * 1000,"HH:MM")}</p>
            </div>
        </div>
    )
}

export default FoodConsumed