import React, { useEffect, useState }  from 'react'
import Search from '../../Home/components/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons'; 

export default function PopUpCat({foodData}) {

    const [searchFood, setSearchFood] = useState(foodData);
    const [addFood, setAddFood] = useState(false);

    useEffect(()=>{
        setSearchFood(foodData)
    },[foodData])

  return (
    <div className='w-full h-screen absolute z-15 bg-black/60 top-0 flex items-center justify-center'>
        <div className='flex flex-col w-1/3 p-2 bg-healthyGray rounded-xl font-quicksand'>
            <div className="flex flex-row w-full">
                <Search foodData={foodData} setSearchFood={setSearchFood} />
                <div 
                    onClick={() => setAddFood(true)} 
                    className="flex w-2/12 sm:w-4/12 flex-row ml-3 justify-center items-center py-2 px-4 rounded-2xl font-semibold text-md text-darkGray font-quicksand hover:cursor-pointer bg-white/70 hover:bg-white/90"
                >
                    <FontAwesomeIcon icon={faPlus} className="text-darkGray text-lg sm:text-xl" />
                    {window.innerWidth > '650' && <p className="ml-2 text-center"></p>}
                </div>
            </div>
            <div className='flex flex-col justify-center w-full bg-white rounded-md  '>
                {searchFood.map((food)=>{
                    <div className='w-full rounded-sm p-2'>
                        <p>{food.name}</p>
                    </div>
                })}
            </div>
        </div>
    </div>
  )
}
