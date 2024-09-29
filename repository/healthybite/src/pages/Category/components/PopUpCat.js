import React, { useEffect, useState }  from 'react'
import Search from '../../Home/components/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSquareCheck, faSquare} from '@fortawesome/free-solid-svg-icons'; 
import NewFood from '../../Home/components/NewFood';

export default function PopUpCat({foodData, setAddFood, setSelection, fetchFoods}) {

    const [searchFood, setSearchFood] = useState(foodData);
    const [selectedFoods, setSelectedFoods] = useState([]); 
    const [newFood, setNewFood]=useState(null)
    const [createFood, setCreateFood]=useState(false)

    const handleFoodSelection = (food) => {
        if (selectedFoods.includes(food)) {
            setSelectedFoods(selectedFoods.filter(item => item !== food)); 
            
        } else {
            setSelectedFoods([...selectedFoods, food]); 
        }
    };

    const handleAddFood= ()=>{
        setSelection(selectedFoods)
        setAddFood(false)
        fetchFoods()
        
    }


    useEffect(()=>{
        createFood && setSelectedFoods(searchFood.unshift(createFood))
        setCreateFood(false)
    },[createFood])


  return (
    <div className='w-full h-screen absolute z-15 bg-black/60 top-0 flex items-center justify-center'>
        <div className='flex flex-col w-1/2 h-2/3 overflow-y-scroll px-2 pb-2 bg-healthyDarkGreen rounded-xl font-quicksand'>
            <div className='sticky top-0 bg-healthyDarkGreen'>
            <div className='flex w-full justify-around items-center'>
                <button onClick={handleAddFood} className='bg-healthyGreen py-1 my-2  px-3 rounded-md text-white font-semibold font-quicksand text-center w-1/2 ' >Add food</button>
                <button onClick={()=>setAddFood(false)} className='bg-healthyOrange py-1 my-2  px-3 rounded-md text-white font-semibold font-quicksand text-center w-1/2 ml-2 '>Cancel</button>
            </div>
            <div className="flex flex-row w-full justify-center  z-5 bg-healthyDarkGreen py-2">
                <Search foodData={foodData} setSearchFood={setSearchFood} />
            </div>
            </div>
            {createFood ?
            <NewFood setAddFood={setNewFood} setNewFood={setCreateFood}/> 
            :
            <div className='flex flex-col justify-center w-full bg-white rounded-md my-3  '>
                {searchFood.map((food)=>(
                    <div className='flex  font-quicksand font-semibold flex-row justify-start items-center w-full px-2 my-1'>
                        <FontAwesomeIcon className='text-healthyDarkGreen text-xl ' icon={selectedFoods.includes(food.id) ? faSquareCheck : faSquare } onClick={()=>handleFoodSelection(food)} value={food.id}/>
                        <p className='ml-2  text-md  text-healthyDarkGreen'>{food.name}</p>
                    </div>
                ))}
            </div>}
        </div>
    </div>
  )
}