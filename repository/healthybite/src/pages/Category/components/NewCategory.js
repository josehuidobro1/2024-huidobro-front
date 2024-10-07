import React, { useEffect, useState }  from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightAndDownLeftFromCenter} from '@fortawesome/free-solid-svg-icons'; 
import SaveButton from './SaveButton';
import Data from '../../Data';
import noodle from '../../../assets/icon.png'
import { createCategory, fetchAllFoods } from '../../../firebaseService';

function NewCategory({handleUpdate, setAddCategory, setAddFood, foods}) {
    const [name, setName]=useState('')
    const [selectedFoods, setSelectedFoods] = useState([]); 
    const iconOptions = Data.iconOptions
    const [iconSelected,setIconSelected]=useState(null)
    const [message, setMessage]=useState('')
    const [addIcon, setAddIcon]=useState(false)

    const handleIcon=(icon)=>{
        setIconSelected(icon)
    }



    const handleFoodSelection = (foodId) => {
        if (selectedFoods.includes(foodId)) {
            setSelectedFoods(selectedFoods.filter(id => id !== foodId)); 
        } else {
            setSelectedFoods([...selectedFoods, foodId]); 
        }
    };

    const handleCategory= async ()=>{
        console.log("Se quiere agregar categoriaaa")
        if (!name){
            setMessage("The category's name is missing")
            return
        }
        if(!iconSelected){
            setMessage("Please select an icon")
            return
        }
        if(selectedFoods.length==0){
            setMessage("Please select the food you want to include")
            return
        }
        if (name && iconSelected &&  selectedFoods.length>0){
            try{
                const data={
                    name: name,
                    icon: iconSelected.name,
                    foods: selectedFoods
                }
                await createCategory(data)
                setName('')
                setIconSelected(null)
                setSelectedFoods([])
                setMessage('')
                setAddCategory(false)
                handleUpdate()
                console.log('Categoria agregada con éxito')
            }catch(error){
                console.log("Error adding new category : ", error)
            }
        }
    }
    


    return (
    <div className='flex p-2 font-quicksand flex-col w-full bg-healthyGreen rounded-b-md justify-center shadow-lg'>
        {message &&
        <div className='w-full flex justify-center items-center mb-2'>
            <p className='py-1 px-4 rounded-2xl bg-healthyDarkOrange text-white font-quicksand font-bold text-sm text-center'>{message}</p>
        </div>}
        <div className='flex flex-row w-full items-center justify-between'>
            <div className={`flex flex-col justify-center ${ addIcon  ? 'w-3/4' : 'w-2/3'} `}>
                <input value={name} onChange={(e)=>setName(e.target.value)} placeholder='Category name' className='bg-white rounded-md text-center text-darkGray text-sm p-1 focus:outline-none  focus:ring-2 focus:ring-healthyGreen' />
                {addIcon && <div className='shadow-lg mt-1 bg-white p-1 rounded-md mb-1 flex flex-row items-center justify-start overflow-x-auto'>
                    {iconOptions.map((item, index)=>
                        <FontAwesomeIcon key={index} onClick={()=>handleIcon(item)} icon={item.icon} className='text-xl text-healthyGray1 mt-2 mx-2 hover:cursor-pointer  hover:text-healthyDarkGray1' />)}
                </div>}
            </div>
            
            {iconSelected ? <FontAwesomeIcon icon={iconSelected.icon} className='w-full text-white text-3xl py-2 mx-2 px-1 rounded-full border-2 border-white'/>
            : 
            <button onClick={()=>setAddIcon(true)} className={`${ addIcon ?'w-1/4' :'w-1/3'} mx-2 flex justify-center items-center py-2 px-1 rounded-full border-2 border-white hover:bg-white`}>
                <img src={noodle} alt="icon" className='w-10/12'  />
                <span className="absolute text-5xl font-semibold text-healthyDarkGreen p-4 opacity-0 hover:opacity-100">+</span>
            </button>}
        </div>
        <div className='flex flex-col w-full mt-3 '>
            <div className='w-full flex flex-row items-center justify-between mb-2'>
                <p className='font-semibold text-white text-xs lg:text-sm mr-2 '>Food</p>
            </div>
            <div className='flex flex-col w-full p-2 bg-white rounded-md mt-1 max-h-44 overflow-y-auto'>
                {foods.map((food, index)=>(<div key={index} className='flex flex-row items-center w-full justify-start mb-2'>
                    <input type="checkbox" checked={selectedFoods.includes(food.id)}  className='text-xl text-darkGray ' value={food.id} onChange={() => handleFoodSelection(food.id)} />
                    <div className='flex flex-col items-start ml-2'>
                        <p className='text-sm lg:text-md font-semibold text-darkGray'>{food.name}</p>
                        {food.bar && <p className='text-xs text-messidepaul  '>by C&V menu</p>}
                    </div>
                </div>))}
            </div>
            <div className='flex flex-row w-full justify-center items-center mt-2'>
                <SaveButton label="Save new category" handleChanges={handleCategory}/>
            </div> 
        </div>
    </div>
  )
}

export default NewCategory