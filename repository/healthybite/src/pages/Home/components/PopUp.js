import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faXmark, faCircleXmark } from '@fortawesome/free-solid-svg-icons'; 
import FoodItem from './FoodItem';
import Search from './Search';
import messidepaul from '../../../assets/messidepaul.png'
import NewFood from './NewFood';
import { getProducts } from '../../../firebaseService';
import Menu from './Menu';

const PopUp = ({ setAddMeal, foodData, handleAddMeal, setNewFood, selection, setSelection }) => {
    const [searchFood, setSearchFood] = useState(foodData);
    const [addFood, setAddFood] = useState(false);
    const [openMenu, setOpenMenu]=useState(false)
    const [menu, setMenu]=useState([])
    const [idFoodMenu, setIdFoodMenu]=useState([])
    const [loading, setLoading]=useState(true)

    const fetchMenu=async()=>{
        try{
            const data= await getProducts()
            setMenu(data)
            setIdFoodMenu(data.map((item)=>item.id))
            setLoading(false)
        }catch(error){
            console.log("Error fetching products from Messi and DePaul APP")
        }
    }

    const handleOpenMenu=()=>{
        if (openMenu){
            setOpenMenu(false) 
        } else{
            setOpenMenu(true)
            fetchMenu()
        }
    }

    useEffect(()=>{
        setSearchFood(foodData)
    },[foodData])

    return (
        <div className="w-full h-screen absolute top-0 z-50 flex justify-center items-center bg-black/30">
            <div className={`w-11/12 sm:w-full flex flex-col justify-center shadow-lg items-center max-w-[600px] ${openMenu ? 'bg-messidepaul': 'bg-healthyGray'} rounded-2xl px-3 pt-2 pb-12 relative`}>
                <div className="w-full flex justify-between items-start mb-2">
                    <button onClick={handleOpenMenu} className={ `pl-1 pr-3 py-1 rounded-full  font-quicksand font-bold ${openMenu ? 'bg-white hover:bg-healthyGray text-messidepaul' : 'bg-messidepaul hover:bg-messidepaulDark text-white'} flex justify-start items-center w-2/5`}>
                        <img src={messidepaul} alt="logo icon" className='w-1/5'/>
                        <p className='ml-3'>{openMenu ? 'Close' : 'Open' } C&V menu</p>
                    </button>
                    <FontAwesomeIcon    
                        onClick={() => setAddMeal(false)} 
                        icon={faCircleXmark} 
                        className={`hover:cursor-pointer ${openMenu ? 'text-white hover:text-healthyGray' : 'text-darkGray/20  hover:text-darkGray/40'} text-3xl text-right`}
                    />
                </div>
                
                {openMenu ? <Menu foodData={foodData} menu={menu} loading={loading} idFoodMenu={idFoodMenu} handleAddMeal={handleAddMeal} setSelection={setSelection} selection={selection} />
                :
                <>
                {!addFood && (
                    <>
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
                        {!addFood && searchFood.length > 0 && (
                            <div className="bg-white/40 p-2 rounded-lg mt-4 w-full max-h-[350px] md:max-h-[500px] lg:max-h-[330px]  overflow-y-auto">
                                {searchFood.map((food, index) => (
                                    <FoodItem key={index} food={food} setSelection={setSelection} />
                                ))}
                            </div>
                        )}
                    </>
                )}
                {addFood && <NewFood setAddFood={setAddFood} setNewFood={setNewFood} />}
                </>}
                {selection && (
                    <div className="flex items-center justify-center w-full mt-2">
                        <div className="flex flex-row justify-center items-center font-quicksand text-darkGray text-sm bg-white/70 px-5 rounded-3xl py-2">
                            <p className="font-semibold">{selection.name}</p>
                            <div className="flex justify-end items-center ml-4">
                                <p>{selection.amount}</p>
                                <p className="ml-1">{selection.measure}</p>
                            </div>
                            <FontAwesomeIcon 
                                icon={faXmark} 
                                className="text-darkGray text-xl hover:cursor-pointer hover:text-healthyDarkGray1 ml-4" 
                                onClick={() => setSelection(null)} 
                            />
                        </div>
                    </div>
                )}
                {selection && (
                    <button 
                        onClick={handleAddMeal} 
                        className="absolute bottom-2 right-2 font-quicksand text-sm px-3 py-1 flex items-center rounded-xl bg-healthyOrange text-white font-bold hover:cursor-pointer hover:bg-healthyDarkOrange"
                    >
                        <FontAwesomeIcon icon={faCheck} className="text-white text-lg mr-2" />
                        Save changes
                    </button>
                )}
            </div>
        </div>
    );
};

export default PopUp;
