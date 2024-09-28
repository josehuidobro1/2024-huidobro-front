import React, { useEffect, useState } from "react";
import NavBar from '../../components/NavBar'
import categoryImg from '../../assets/categoryBg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIceCream, faTrash, faPen, faPlus} from '@fortawesome/free-solid-svg-icons'; 
import CategoryItem from './components/CategoryItem';
import NewCategory from './components/NewCategory';
import { fetchAllFoods, getCategories} from "../../firebaseService";
import PopUpCat from "./components/PopUpCat";
import { auth } from "../../firebaseConfig";

function Category() {
    const [foodData, setFoodData] = useState([])
    const [addFood, setAddFood]=useState(false)
    const [newFood, setNewFood] = useState();
    const [selection, setSelection] = useState([]);
    const [addCategory, setAddCategory]=useState(false)
    const [categories, setCategories]=useState([])
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const cats = await getCategories();
                    setCategories(cats);
                } catch (err) {
                    console.log('Error al obtener las categorias: ' + err);
                }
            }else{
                console.log('No user is signed in');
            }
            setLoading(false);
        })
        return () => unsubscribe();
    };

    const fetchFoods =async()=>{
        try{
            const food = await fetchAllFoods()
            setFoodData(food)
        }catch(error){
            console.log("Error fetching foods in Category page: ", error)
        }
    }

    useEffect(()=>{
        fetchCategories ();
        fetchFoods();
    },[])

    const handleUpdate=()=>{
        fetchCategories()
    }


  return (
    <div className='h-screen w-full'>
        <NavBar/>
        {loading ?
            <div className="w-full flex items-center justify-center  h-screen">
                <h1 className="font-belleza text-healthyGreen text-3xl ">Loading...</h1>
            </div>
        :<div className='w-full flex flex-row items-start justify-between h-screen'>
            {window.innerWidth > 768  && 
            <div className='w-1/4 lg:w-1/3 overflow-hidden  h-screen  flex items-center justify-start'>
                <img src={categoryImg} alt="Category image background"  className=' w-full h-full object-cover'/>
            </div>
            }
            <div className=' w-full md:w-3/4 lg:w-2/3 flex flex-col items-start justify-start mt-0 sm:mt-16 p-6 '>
                <h2 className='font-belleza bg-white w-full sticky sm:relative top-20 sm:top-0 text-2xl  text-left text-healthyDarkOrange '>Categories</h2>
                <div className='flex flex-col-reverse sm:flex-row justify-center sm:justify-between items-center sm:items-start mt-6 w-full'>
                    <div className='flex flex-col w-full sm:w-2/3 justify-start items-start '>

                        {categories.map((item)=>(<CategoryItem handleUpdate={handleUpdate} key={item.id} category={item}  setAddFood={setAddFood} food={foodData} selection={selection}/>) )}
                    </div>
                    <div className=' w-full sticky sm:relative top-28 sm:top-0 mb-3 sm:mb-0 sm:w-1/3 flex flex-col mx-4 bg-white py-3 sm:py-0 '>
                        <div onClick={()=>setAddCategory(!addCategory)} className='flex  items-center justify-center font-quicksand rounded-md border-2 border-healthyGreen shadow-sm p-1 lg:p-2 hover:cursor-pointer '>
                            <FontAwesomeIcon icon={faPlus} className='text-xl text-healthyGreen mr-2'/>
                            <p className='font-quicksand  text-md lg:text-lg text-healthyGreen  font-semibold'>Add cattegory</p>
                        </div>
                        {addCategory && <NewCategory handleUpdate={handleUpdate} setAddCategory={setAddCategory} setAddFood={setAddFood}/>}
                    </div>
                </div>
            </div>
        </div>}
        {addFood &&
            <PopUpCat foodData={foodData} setAddFood={setAddFood} setSelection={setSelection} fetchFoods={fetchFoods}/>
        }
    </div>
  )
}

export default Category