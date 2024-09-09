import React,{useEffect, useState} from "react";
import Data from "../Data";
import Input from "../../components/Input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus,faCircleXmark,faImage } from '@fortawesome/free-solid-svg-icons'; 
import { getAuth,  } from 'firebase/auth';
import { getFirestore,collection, addDoc,getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';

function Food() {
    const [foodData, setFoodData]=useState()
    const [newFood, setNewFood]=useState(false)
    const [name,setName]=useState('')
    const [measure, setMeasure]=useState('')
    const [amount,setAmount]=useState(0)
    const [calories,setCalories]=useState(0)
    const [image, setImage]=useState('')
    const [imagePreview, setImagePreview]=useState(null)
    const [inValidation,setInValidation]=useState(false)
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

    
    const fetchFoods = async () => {
        const firestore = getFirestore();
        const querySnapshot = await getDocs(collection(firestore, 'Food'));
      
            const foods = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        setFoodData(foods)
        console.log(foods)

    }

    fetchFoods()


    const handleNewFood= async()=>{
        setInValidation(true)
        console.log(auth.currentUser)
        console.log(name,measure,amount,calories)
        try {
            // Agregar el nuevo alimento a la colección "Food" en Firestore
            await addDoc(collection(firestore, 'Food'), {
              name: name,
              id_Food:uuidv4() ,
               // Asegúrate de convertir a número si es necesario
              measure: measure, // Asegúrate de convertir a número si es necesario
              measure_portion: Number(amount), // Asegúrate de convertir a número si es necesario
              calories_portion: Number(calories), // Asegúrate de convertir a número si es necesario
            });
      
            // Limpiar los campos del formulario
            setName('');
            setMeasure('');
            setAmount('');
            setCalories('');
      
            console.log('Comida agregada a Firestore con éxito');
          } catch (error) {
            console.error('Error al agregar comida a Firestore:', error);
          }
          setNewFood(false)
    }

    const handleImage=(e)=>{
        const file = e.target.files[0];
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file)
    }

    const handleClose=()=>{
        setNewFood(false)
        setInValidation(false)
        setName('')
        setMeasure('')
        setAmount('')
        setCalories('')
        setImage(null)
    }

    return (
        <div className="bg-healthyGray flex w-full justify-center items-center">
            <div className="flex  flex-col  max-w-[1280px] justify-center items-start xs:mt-12 mx-12">
                <div className="flex flex-col py-12 mt:py-20 w-full items-between w-full">
                    <div className="flex flex-col md:flex-row   md:justify-between items-center md:items-end ">
                        <div className="flex flex-col xs:flex-row items-center justify-around xs:items-end">
                            <h1 className="font-belleza text-4xl sm:text-5xl text-darkGray">Healthy Bite</h1>
                            <p className="font-quicksand text-xl  text-darkGray font-base pt-4 xs:pt-0 pl-0 sm:pl-8">Food database</p>
                        </div>
                        <p onClick={()=>setNewFood(true)} className="font-quicksand text-lg text-white bg-healthyOrange hover:bg-healthyDarkOrange p-2 px-6 rounded-md font-bold cursor-pointer mt-6 md:mt-0">ADD NEW FOOD</p>
                        <p onClick={()=>auth.signOut()} className="font-quicksand text-lg text-white bg-healthyOrange hover:bg-healthyDarkOrange p-2 px-6 rounded-md font-bold cursor-pointer mt-6 md:mt-0">Sign Out</p>

                    </div>
                    <div className="flex flex-wrap  items-center justify-evenly mt-8 md:mt-16 ">
                    {
                        foodData.length==0 ?
                        <p>Arraaay vacio</p>:
                        foodData.map(e=>
                        <div className="mb-3 w-full lg:min-w-[200px] lg:max-w-[300px] md:min-w-[100px] md:w-5/12 xs:min-w-[180px] xs:w-2/5 h-[100px] xs:h-[100px] md:h-[120px] lg:h-[130px] my-2   rounded-md flex  shadow-md bg-white flex flex-row items-center justify-between ">
                            <div className="  w-1/2 !overflow-hidden rounded-l-md h-[100px] xs:h-[100px] md:h-[120px] lg:h-[130px]">
                                {e.image ?
                                <img src={e.image} alt={e.name} className="object-cover w-full h-full  "/>
                                :
                                
                                <FontAwesomeIcon icon={faImage} className="text-healthyGray1 w-2/3 h-full pl-2"/>
                                }
                            
                            </div>
                            <div className="flex flex-col w-2/3  w-1/2 sm:w-2/3 h-full p-2 justify-between items-between">
                                <p className="text-darkGray font-quicksand font-semibold xs:text-sm md:text-md">{e.name}</p>
                                <div className="flex flex-col justify-center items-end">
                                    <p className="font-quicksand text-darkGray text-sm xs:text-xs sm:text-sm ">{e.amount} {e.measure}</p>
                                    <p className="font-quicksand font-semibold ml-2 bg-healthyDarkGreen py-1 text-sm xs:text-xs sm:text-sm px-2 rounded-md  text-white">{e.calories} cal</p>
                                </div>
                            </div>
                        </div>)
                    }
                    </div>
                </div>
            </div>
            {newFood && (
            <div className="z-20 fixed inset-0 flex items-center jutify-center top-0 bg-black bg-opacity-60">
                <div className="flex justify-center items-center w-full px-4">
                    <div className="bg-healthyGray z-30 flex flex-col items-center justify-center p-4 rounded-md  w-80  ">
                        <div className="flex flex-row justify-between items-end w-full mb-3">
                            <p className="font-belleza font-bold text-xl text-healthyOrange">New food</p>
                            <div className="flex flex-row justify-end items-center">
                                <FontAwesomeIcon onClick={handleNewFood} icon={faCirclePlus} className='text-healthyGreen cursor-pointer hover:text-healthyDarkGreen bg-white rounded-full' size='2xl'/>
                                <FontAwesomeIcon onClick={handleClose} icon={faCircleXmark} className='text-healthyGray1 cursor-pointer hover:text-healthyDarkGray1 bg-white rounded-full ml-3'   size='2xl'/>
                            </div>
                        </div>
                        <Input required={inValidation && name==''} label='Name' placeholder='Chicken' value={name} inputType='text' onChange={e=>setName(e.target.value)}/>
                        <Input required={inValidation && measure==''} label='Measure' placeholder='gr' value={measure} inputType='text' onChange={e=>setMeasure(e.target.value)}/>
                        <Input required={inValidation && amount==''} label="Amount" placeholder='250' value={amount} inputType='number' onChange={e=>setAmount(e.target.value)}/>
                        <Input required={inValidation && calories==''} label="Calories" placeholder="448" value={calories} inputType='number' onChange={e=>setCalories(e.target.value)}/>
                        <input  type='file' accept="image/*"  onChange={handleImage} id="imageInput"   className="w-full  my-3 text-center text-darkGray  font-quicksand text-sm font-semibold "/>
                    </div>
                </div>
            </div>)}
        </div>
    );
}

export default Food;
