import React, { useEffect, useState } from "react";
import NavBar from '../../components/NavBar'
import categoryImg from '../../assets/categoryBg.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIceCream, faTrash, faPen, faPlus} from '@fortawesome/free-solid-svg-icons'; 
import CategoryItem from './components/CategoryItem';
import NewCategory from './components/NewCategory';
import { addNewFood, addUserFood, fetchAllFoods, fetchUserFoods, deleteUserFood } from "../../firebaseService";
import PopUpCat from "./components/PopUpCat";

function Category() {
    const [foodData, setFoodData] = useState([])
    const [addFood, setAddFood]=useState(false)
    const [newFood, setNewFood] = useState();
    const [selection, setSelection] = useState();
    const [addCategory, setAddCategory]=useState(false)

    const fetchFoods = async () => {
        try {
            const food = await fetchAllFoods();
            setFoodData(food);
        } catch (err) {
            console.log('Error al obtener los datos: ' + err.message);
        }
    };

    useEffect(()=>{
        fetchFoods();
        console.log("food dataaa: ", foodData)
    },[])

    useEffect(() => {
        console.log('cambio la comidaaaaaa')
        newFood && addNewFood(newFood).then(() => {
            setNewFood(null);
        })
        fetchFoods();
    }, [newFood]);

  return (
    <div className='h-screen w-full'>
        <NavBar/>
        <div className='w-full flex flex-row items-start justify-between h-screen'>
            {window.innerWidth > 768  && 
            <div className='w-1/4 lg:w-1/3 overflow-hidden  h-screen  flex items-center justify-start'>
                <img src={categoryImg} alt="Category image background"  className=' w-full h-full object-cover'/>
            </div>
            }
            <div className=' w-full md:w-3/4 lg:w-2/3 flex flex-col items-start justify-start mt-0 sm:mt-16 p-6 '>
                <h2 className='font-belleza bg-white w-full sticky sm:relative top-20 sm:top-0 text-2xl  text-left text-healthyDarkOrange '>Categories</h2>
                <div className='flex flex-col-reverse sm:flex-row justify-center sm:justify-between items-center sm:items-start mt-6 w-full'>
                    <div className='flex flex-col w-full sm:w-2/3 justify-start items-start '>

                        <CategoryItem setAddFood={setAddFood}/> 
                    </div>
                    <div className=' w-full sticky sm:relative top-28 sm:top-0 mb-3 sm:mb-0 sm:w-1/3 flex flex-col mx-4 bg-white py-3 sm:py-0 '>
                        <div onClick={()=>setAddCategory(!addCategory)} className='flex  items-center justify-center font-quicksand rounded-md border-2 border-healthyGreen shadow-sm p-1 lg:p-2 hover:cursor-pointer hover:mt-1'>
                            <FontAwesomeIcon icon={faPlus} className='text-xl text-healthyGreen mr-2'/>
                            <p className='font-quicksand  text-md lg:text-lg text-healthyGreen  font-semibold'>Add cattegory</p>
                        </div>
                        {addCategory && <NewCategory/>}
                    </div>
                </div>
            </div>
        </div>
        {addFood &&
            <PopUpCat foodData={foodData}/>
        }
    </div>
  )
}

export default Category