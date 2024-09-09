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

const firebaseConfig = {
    apiKey: "AIzaSyABXtMyR7Fi-xshZaVaelZMwkAldt4WB0M",
    authDomain: "healthybite-b2a20.firebaseapp.com",
    databaseURL: "https://healthybite-b2a20-default-rtdb.firebaseio.com",
    projectId: "healthybite-b2a20",
    storageBucket: "healthybite-b2a20.appspot.com",
    messagingSenderId: "1061070227538",
    appId: "1:1061070227538:web:7c622ae4edd5d0e68ff78b",
    measurementId: "G-K873CFX9CS"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore =getFirestore(app)


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
            const queryUserFood = await getDocs(collection(firestore, 'UserFood'));
            const userFood = queryUserFood.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
                }))
                .filter(doc => doc.id_User=== auth.currentUser.uid && format(new Date(doc.date_ingested.seconds * 1000), 'yyyy-MM-dd') === date);

            const queryFood = await getDocs(collection(firestore, 'Food'));
            const food= (queryFood.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
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
    },[]);

    const handleAddMeal=async()=>{
        try {
            await addDoc(collection(firestore, 'UserFood'), {
                id_user_food:uuidv4() ,
                id_Food:selection.id_food,
                id_User: auth.currentUser.uid,
                date_ingested: new Date(date),
                amount_eaten: Number(amount)
            });
            setAmount(null)
            setSelection(null)
            setAddMeal(false)
            console.log('Comida consumida agregada a UserFood > Firestore con éxito');
        } catch (error) {
            console.error('Error al agregar la comida consumida en UserFood > Firestore:', error);
        }
        
    }

    const handleNewFood= async()=>{
        console.log(newFood)
        try {
            // Agregar el nuevo alimento a la colección "Food" en Firestore
            await addDoc(collection(firestore, 'Food'), {
            name: newFood.name,
            id_Food:uuidv4() ,
            // Asegúrate de convertir a número si es necesario
            measure: newFood.measure, // Asegúrate de convertir a número si es necesario
            measure_portion: Number(newFood.amount), // Asegúrate de convertir a número si es necesario
            calories_portion: Number(newFood.calories), // Asegúrate de convertir a número si es necesario
            });
    
    
            console.log('Comida agregada a Firestore con éxito');
        } catch (error) {
        console.error('Error al agregar comida a Firestore:', error);
        }
        setNewFood(null)
    }

    useEffect(()=>{
        newFood && handleNewFood();

    },[newFood])

    return (
        <div className="h-screen w-full">
        <NavBar />
        <div className="flex flex-row  justify-between items-center w-full h-screen ">
            <div className="w-9/12 h-full pt-24 flex flex-row justify-start items-start px-8">
                <div className=" w-1/4 pb-12  flex flex-col h-full justify-between items-center">
                    <Calendar value={date} onChange={e=>setDate(format(new Date(e), "yyyy-MM-dd"))} />
                    <Calories userFood={userFood} />
                </div>
                <div className=" w-3/4 flex flex-col items-center justify-start pl-12 ">
                    <div className="flex flex-row justify-between items-start w-full pb-4">
                        <p className="font-quicksand bg-healthyOrange/80  text-md text-white py-2 px-4 rounded-3xl font-semibold ">Food</p>
                        <p className="font-quicksand bg-healthyOrange/80  text-md text-white py-2 px-4 rounded-3xl font-semibold ">Calories</p>
                    </div>
                    <div className="flex flex-col w-full">
                        {userFood.map((usfood)=> <FoodConsumed usfood={usfood} />)}
                        <div onClick={()=>setAddMeal(true)} className="flex w-full flex-row justify-start items-center py-2 px-4 mt-4 rounded-2xl font-semibold text-lg sticky bottom-0 text-darkGray bg-healthyGreen/30 font-quicksand hover:cursor-pointer hover:bg-healthyGreen/50">
                            <FontAwesomeIcon icon={faPlus} className="text-darkGray text-xl mr-3" />
                            <p>Add food</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-4/12 h-screen flex justify-start  ">
                <img src={bgImage} alt='Bakground image' className=" w-full h-full object-cover " />
            </div>
        </div>
        { addMeal &&
            <PopUp setAddMeal={setAddMeal} foodData={foodData} handleAddMeal={handleAddMeal} setNewFood={setNewFood} setSelection={setSelection} selection={selection}/>
        }
        </div>
    );
}

export default Home;
