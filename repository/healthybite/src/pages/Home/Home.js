import React,{useEffect, useState} from "react";
import Data from "../Data";
import Input from "../../components/Input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faCheck, faMagnifyingGlass,faCirclePlus, faXmark, faCircleXmark } from '@fortawesome/free-solid-svg-icons'; 
import { getAuth,  } from 'firebase/auth';
import { getFirestore,collection, addDoc,getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import bgImage from '../../assets/imgHome.jpg'
import Calendar from "./components/Calendar";
import NavBar from "../../components/NavBar";
import { format } from 'date-fns';
import Calories from "./components/Calories";
import FoodConsumed from "./components/FoodConsumed";
import PopUp from "./components/PopUp";
import { auth, firestore } from '../../firebaseConfig';
import { addNewFood, addUserFood, fetchAllFoods, fetchUserFoods } from "../../firebaseService";




function Home() {
    const [foodData, setFoodData]=useState([]) // datos de tabla Food
    const [userFood, setUserFood]=useState([]) // datos de tabla UserFood
    const [date,setDate]=useState(format(new Date(), 'yyyy-MM-dd'))
    const [amount,setAmount]=useState()
    const [selection, setSelection]=useState()
    const [addMeal, setAddMeal]=useState(false)
    const [newFood, setNewFood]=useState()


    const fetchFoods = async () => {
        try {
            console.log(date)
            const userFood = await fetchUserFoods(date)
            const food= await fetchAllFoods();
            setFoodData(food)
            const userFoodDetails=userFood.map((item)=>{
                const foodDetails = food.find(element => element.id_Food === item.id_Food);
                return{
                    ...item,
                    name: foodDetails?.name || 'Unknown', // Verifica si se encontró la comida
                    measure: foodDetails?.measure || '',
                    amount: foodDetails?.measure_portion || null,
                    calories: foodDetails?.calories_portion || null
                }
            })
            setUserFood(userFoodDetails)
            
            
        } catch (err) {
            console.log('Error al obtener los datos: ' + err.message);
        }

    };

    useEffect(()=>{
        fetchFoods();
    },[date,selection]);

    const handleAddMeal=async()=>{
        try {
            await addUserFood(selection, date, amount)
            setAmount(null)
            setSelection(null)
            setAddMeal(false)
            console.log('Comida consumida agregada a UserFood > Firestore con éxito');
        } catch (error) {
            console.error('Error al agregar la comida consumida en UserFood > Firestore:', error);
        }
        
    }

    useEffect(()=>{
        newFood && addNewFood(newFood).then(()=>{
            setNewFood(null)
            fetchFoods();
        })
    },[newFood])

    return (
        <div className="h-screen w-full">
        <NavBar />
        <div className="flex flex-col lg:flex-row  justify-between items-center w-full lg:h-screen ">
            <div className="w-full sm:w-11/12 lg:w-9/12 sm:h-screen lg:h-full pt-8 sm:pt-24 flex flex-col sm:flex-row justify-start items-start px-8">
                <div className=" sticky top-0 w-full sm:w-1/4 pb-4 sm:pb-12  flex flex-col h-full justify-start sm:justify-between items-center">
                    <Calendar value={date} onChange={e=>setDate(format(new Date(e), "yyyy-MM-dd"))} />
                    <Calories userFood={userFood} />
                </div>
                <div className="w-full sm:w-3/4 flex flex-col items-center justify-start pl-0 sm:pl-12 ">
                    <div className="flex flex-row justify-between items-start w-full pb-4">
                        <p className="font-quicksand bg-healthyOrange/80  text-md text-white py-2 px-4 rounded-3xl font-semibold ">Food</p>
                        <p className="font-quicksand bg-healthyOrange/80  text-md text-white py-2 px-4 rounded-3xl font-semibold ">Calories</p>
                    </div>
                    <div className="flex flex-col w-full">
                        {userFood.map((usfood)=> <FoodConsumed usfood={usfood} />)}
                        <div className="flex w-full items-center justify-center bg-white sticky bottom-0">
                            <div onClick={()=>setAddMeal(true)} className="flex w-full mb-2 flex-row justify-start items-center py-2 px-4 mt-2 sm:mt-4 rounded-2xl font-semibold text-lg  text-darkGray bg-healthyGreen/30 font-quicksand hover:cursor-pointer hover:bg-healthyGreen/50">
                                <FontAwesomeIcon icon={faPlus} className="text-darkGray text-xl mr-3" />
                                <p>Add food</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {window.innerWidth > '1024' && (
                <div className="w-full  lg:w-4/12 lg:h-screen flex justify-start ">
                    <img src={bgImage} alt='Bakground image' className=" w-full h-full object-cover " />
                </div>
            )}
        </div>
        { addMeal &&
            <PopUp setAddMeal={setAddMeal} foodData={foodData} handleAddMeal={handleAddMeal} setNewFood={setNewFood} setSelection={setSelection} selection={selection}/>
        }
        </div>
    );
}

export default Home;
