import React from 'react'

const Calories = ({userFood}) => {

    const calculateCalories=()=>{
        var calories=0
        userFood.forEach((food)=>{
            calories+=(food.calories*food.amount_eaten)/food.amount
        })
        return calories
    }

    return (
    <div className="flex flex-col  justify-center items-center">
        <p className="font-quicksand text-darkGray text-xl text-center lg:text-left ">Total calories</p>
        <p className="font-quicksand text-darkGray text-4xl lg:text-6xl  ">{calculateCalories().toFixed(2)}</p>
        <p className="font-quicksand text-darkGray text-md">calories</p>
    </div>
    )
}

export default Calories