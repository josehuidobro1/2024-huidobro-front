import { faAngleRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { set } from 'date-fns';
import React, { useEffect, useState } from 'react'

const Suggestions = ({suggestion, setSuggestion, foodAllergie, foodData, plateData, drinkData}) => {
    const [index, setIndex]=useState([])
    const [foodSuggested, setFoodSuggested]=useState(foodData?.filter(i=>!foodAllergie.includes(i.id)).concat(plateData?.mines?.filter(plate=>!plate.ingredients.map(i=>i.ingredientId).some(e=>foodAllergie.includes(e)))).concat(plateData.others?.filter(plate=>!plate.ingredients.map(i=>i.ingredientId).some(e=>foodAllergie.includes(e)))).concat(drinkData))

    const getFoodSuggested=()=>{
        const safeFoodAllergie = Array.isArray(foodAllergie) ? foodAllergie : [];
        const safeFoodData = Array.isArray(foodData) ? foodData : [];
        const safePlateDataMines = plateData?.mines && Array.isArray(plateData.mines) ? plateData.mines : [];
        const safePlateDataOthers = plateData?.others && Array.isArray(plateData.others) ? plateData.others : [];
        const safeDrinkData = Array.isArray(drinkData) ? drinkData : [];
        const data = safeFoodData.filter(i => !safeFoodAllergie.includes(i.id))
            .concat(
                safePlateDataMines.filter(plate => 
                    !plate.ingredients?.map(i => i.ingredientId).some(e => safeFoodAllergie.includes(e))
                )
            )
            .concat(
                safePlateDataOthers.filter(plate => 
                    !plate.ingredients?.map(i => i.ingredientId).some(e => safeFoodAllergie.includes(e))
                )
            )
            .concat(safeDrinkData);

        return data;
    }

    useEffect(()=>{
        if(suggestion){
            const data=getFoodSuggested()
            console.log('fata de sugeestions ',data)
            setFoodSuggested(data)
            setIndex(getRandomIndices(data.length, 3))
        }
    },[suggestion, foodAllergie, foodData, plateData, drinkData])

    const getRandomIndices = (max, count) => {
        const indices = new Set(); // Usamos un Set para evitar duplicados
        while (indices.size < count) {
          indices.add(Math.floor(Math.random() * max));
        }
        return Array.from(indices);
    };

    return (
    <div className='flex flex-col lg:flex-row w-2/3 sm:w-full justify-between items-center font-quicksand rounded-md lg:rounded-full px-1 py-1 bg-healthyDarkYellow/30 mt-2 '>
            <div className='w-4/5 sm:w-full lg:w-1/5 flex justify-center sm:justify-start'>
                <p className='font-quicksand font-bold bg-healthyDarkYellow px-2 py-1 text-center rounded-full text-white text-md '>Suggestions</p>
            </div>
            <div className='flex justify-between mt-1 sm:mt-0  items-center flex-col sm:flex-row w-full lg:w-4/5'>
                <div className='flex flex-col sm:flex-row justify-center sm:justify-start items-center  max-w-4/5 overflow-x-auto '>
                    {index.map(i=> (<p key={i} className='flex text-white bg-healthyDarkYellow/50 px-3 py-1 rounded-full mx-1 font-bold text-sm mb-1 sm:mb-0 whitespace-nowrap'>{foodSuggested[i].name}</p>))}
                </div>
                <div className='flex mt-1 sm:mt-0 items-center w-full sm:w-1/5 justify-center sm:justify-end '>
                    <FontAwesomeIcon onClick={()=>setIndex(getRandomIndices(foodSuggested.length, 3))} icon={faAngleRight} className='text-white bg-healthyDarkYellow shadow-md py-2 px-3 cursor-pointer text-lg rounded-full mx-1' />
                    <FontAwesomeIcon onClick={()=>setSuggestion(false)} icon={faXmark} className='text-white bg-healthyDarkYellow shadow-md py-2 px-3 text-lg rounded-full cursor-pointer '/>
                </div>
            </div>
    </div>
    )
}

export default Suggestions