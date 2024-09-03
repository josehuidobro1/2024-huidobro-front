import React,{useState} from "react";
import Data from "../Data";
import Input from "../../components/Input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus,faCircleXmark,faImage } from '@fortawesome/free-solid-svg-icons'; 

function Food() {
    const foodData=Data.food
    const [newFood, setNewFood]=useState(false)
    const [name,setName]=useState('')
    const [measure, setMeasure]=useState('')
    const [amount,setAmount]=useState(0)
    const [calories,setCalories]=useState(0)

    const handleNewFood=()=>{
        Data.food.push({name:name, measure:measure, amount:amount, calories:calories})
        setNewFood(false)
    }

    return (
        <div className="bg-darkGray flex w-full justify-center items-center">
            <div className="flex  flex-col bg-darkGray max-w-[1280px] justify-center items-start mt-12 mx-12">
                <div className="flex flex-col py-20 w-full items-between w-full ">
                    <div className="flex flex-row justify-between items-end">
                        <div className="flex flex-row items-end">
                            <h1 className="font-belleza text-5xl text-white">Healthy Bite</h1>
                            <p className="font-quicksand text-xl  text-white font-base pl-8">Food database</p>
                        </div>
                        <p onClick={()=>setNewFood(true)} className="font-quicksand text-lg text-white bg-healthyOrange hover:bg-healthyDarkOrange p-2 px-6 rounded-md font-bold cursor-pointer">ADD NEW FOOD</p>
                    </div>
                    <div className="flex flex-wrap  items-center justify-between  mt-16 ">
                    {
                        foodData.map(e=>
                        <div className="mb-3 w-96 h-32 my-2   rounded-md flex  shadow-md bg-white flex flex-row items-center justify-between ">
                            <div className="w-1/3 overflow-hidden rounded-l-md">
                                <img src={e.image} alt={e.name} className="object-cover w-full h-full "/>
                            </div>
                            <div className="flex flex-col w-2/3 h-full p-2 justify-between items-between">
                                <p className="text-darkGray font-quicksand font-semibold text-md">{e.name}</p>
                                <div className="flex flex-col justify-center items-end">
                                    <p className="font-quicksand text-darkGray text-sm ">{e.amount} {e.measure}</p>
                                    <p className="font-quicksand font-semibold ml-2 bg-healthyDarkGreen py-1 px-2 rounded-md  text-white">{e.calories} cal</p>
                                </div>
                            </div>
                        </div>)
                    }
                    </div>
                </div>
            </div>
            {newFood && (
            <div className="z-20 fixed inset-0 flex items-center jutify-center top-0 bg-black bg-opacity-60 w-full ">

                <div className="bg-healthyGray z-30 flex flex-col items-center justify-center p-4 rounded-md  w-80  ">
                    <div className="flex flex-row justify-between items-end w-full mb-3">
                        <p className="font-belleza font-bold text-xl text-healthyOrange">New food</p>
                        <div className="flex flex-row justify-end items-center">
                            <FontAwesomeIcon onClick={handleNewFood} icon={faCirclePlus} className='text-healthyGreen cursor-pointer hover:text-healthyDarkGreen bg-white rounded-full' size='2xl'/>
                            <FontAwesomeIcon onClick={()=>setNewFood(false)} icon={faCircleXmark} className='text-healthyGray1 cursor-pointer hover:text-healthyDarkGray1 bg-white rounded-full ml-3'   size='2xl'/>
                        </div>
                    </div>
                    <Input label='Name' placeholder='Chicken' value={name} inputType='text' onChange={e=>setName(e)}/>
                    <Input label='Measure' placeholder='gr' value={measure} inputType='text' onChange={e=>setMeasure(e)}/>
                    <Input label="Amount" placeholder='250' value={amount} inputType='number' onChange={e=>setAmount(e)}/>
                    <Input label="Calories" placeholder="448" value={calories} inputType='number' onChange={e=>setCalories(e)}/>
                    <div className="w-full flex flex-row justify-center items-center p-2 rounded-lg my-3  bg-healthyGray1 cursor-pointer hover:bg-healthyDarkGray1  hover:text-healthyGray1">
                        <FontAwesomeIcon icon={faImage} size='lg' className="mr-3 text-darkGray" />
                        <p className="text-center text-darkGray  font-quicksand text-sm font-bold">Add image</p>
                    </div>
                </div>
                
            </div>)}
        </div>
    );
}

export default Food;
