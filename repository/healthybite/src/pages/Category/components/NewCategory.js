import React, { useEffect, useState }  from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightAndDownLeftFromCenter} from '@fortawesome/free-solid-svg-icons'; 
import SaveButton from './SaveButton';
import Data from '../../Data'
import { createCategory, fetchAllFoods } from '../../../firebaseService';

function NewCategory({handleUpdate, setAddCategory, setAddFood}) {
    const [name, setName]=useState('')
    const [foods, setFoods]=useState([])
    const [selectedFoods, setSelectedFoods] = useState([]); 
    const iconOptions = Data.iconOptions
    const [iconSelected,setIconSelected]=useState(null)
    const [message, setMessage]=useState('')

    const handleIcon=(icon)=>{
        setIconSelected(icon)
    }

    const fetchFoods = async () => {
        try {
            const food = await fetchAllFoods();
            setFoods(food);
        } catch (err) {
            console.log('Error al obtener los datos: ' + err.message);
        }
    };

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
    

    useEffect(()=>{
        fetchFoods();
    },[])

    return (
    <div className='flex p-2 font-quicksand flex-col w-full bg-healthyGreen rounded-b-md justify-center shadow-lg'>
        {message &&
        <div className='w-full flex justify-center items-center mb-2'>
            <p className='py-1 px-4 rounded-2xl bg-healthyDarkOrange text-white font-quicksand font-bold text-sm text-center'>{message}</p>
        </div>}
        <div className='flex flex-row w-full items-center justify-between'>
            <p className='font-semibold text-white text-xs lg:text-sm mr-2 '>Name</p>
            <input value={name} onChange={(e)=>setName(e.target.value)} className='bg-white rounded-md text-darkGray text-sm p-1 w-full' />
        </div>
        <div className='flex flex-row w-full items-center justify-center mt-3'>
            <p className={`w-1/5 font-semibold text-white text-xs lg:text-sm mr-2 `}>Icon</p>
            <div className={`${ iconSelected ?  'w-3/5' : 'w-4/5' }  flex justify-end items-start `}>
                <div className='shadow-lg bg-white p-1 rounded-md mb-1 flex flex-row items-center justify-start overflow-x-auto'>
                    {iconOptions.map((item)=>
                        <FontAwesomeIcon onClick={()=>handleIcon(item)} icon={item.icon} className='text-xl text-healthyGray1 mt-2 mx-2 hover:cursor-pointer  hover:text-healthyDarkGray1' />)}
                </div>
            </div>
            {iconSelected && <FontAwesomeIcon icon={iconSelected.icon} className='w-1/5 text-white text-2xl'/>}
        </div>
        <div className='flex flex-col w-full mt-3 '>
            <div className='w-full flex flex-row items-center justify-between mb-2'>
                <p className='font-semibold text-white text-xs lg:text-sm mr-2 '>Food</p>
            </div>
            <div className='flex flex-col w-full p-2 bg-white rounded-md mt-1 max-h-44 overflow-y-auto'>
                {foods.map((food)=>(<div className='flex flex-row items-center w-full justify-start mb-2'>
                    <input type="checkbox" checked={selectedFoods.includes(food.id_Food)}  className='text-xl text-darkGray ' value={food.id_Food} onChange={() => handleFoodSelection(food.id_Food)} />
                    <p className='tetx-darkGray ml-2  text-xs lg:text-sm'>{food.name}</p>
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