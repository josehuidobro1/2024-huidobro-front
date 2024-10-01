import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import bgImage from '../../assets/imgHome.jpg'
import Calendar from "../../components/Calendar";
import NavBar from "../../components/NavBar";
import Calories from "./components/Calories";
import FoodConsumed from "./components/FoodConsumed";
import PopUp from "./components/PopUp";
import { addNewFood, addUserFood, fetchAllFoods, fetchUserFoods, deleteUserFood , fetchFoodByID, editUserFood, getCategories, getDefaultCategories,getProdByID} from "../../firebaseService";
import Filter from "./components/Filter";

function Home() {
    const [foodData, setFoodData] = useState([]); // datos de tabla Food
    const [userFood, setUserFood] = useState([]); // datos de tabla UserFood
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState();
    const [selection, setSelection] = useState();
    const [addMeal, setAddMeal] = useState(false);
    const [newFood, setNewFood] = useState();
    const [categories, setCategories]=useState([])
    const [filteredFood, setFilteredFood]=useState([])
    const [filterSelected, setFilterSelected]=useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(filterSelected) {
            console.log("Quiero veer las comidas ---> ", filteredFood)
            console.log('FILTROOOO --> ', filterSelected)
            const aplyingFilter=filteredFood.filter((item)=>filterSelected.foods.includes(item.id_Food))
            setFilteredFood(aplyingFilter)
            console.log("Aplicando el filtro: ", aplyingFilter)
        }else{
            setFilteredFood(userFood)
        }
    },[filterSelected])

    const fetchFoods = async () => {
        const loadData = async () => {
            try {
                // Validate the 'date' before using it
                if (isNaN(new Date(date).getTime())) {
                    throw new Error('Invalid date value');
                }
    
                // Fetch user foods and all foods
                const userFood = await fetchUserFoods(date);
                const food = await fetchAllFoods();
                setFoodData(food);
    
                // Fetch food details for each user food using Promise.all
                const userFoodDetails = await Promise.all(userFood.map(async (item) => {
                    let foodDetails;
    
                    // Try fetching from the 'food' table first
                    foodDetails = await fetchFoodByID(item.id_Food);
                    
                    // If no details are found in the 'food' table, try the 'menu' table
                    if (!foodDetails) {
                        foodDetails = await getProdByID(item.id_Food);
                        console.log(foodDetails.calories)
                    }
                    const calories = foodDetails?.calories_portion !== undefined 
                    ? Math.round(foodDetails?.calories_portion) 
                    : Math.round(foodDetails?.calories || 0);
    
                    // Return the item with details or set defaults if not found
                    return {
                        ...item,
                        name: foodDetails?.name || 'Unknown',
                        measure: foodDetails?.measure || 'Plate/s',
                        measure_portion: foodDetails?.measure_portion || 1,
                        calories_portion: calories
                    };
                }));
    
                // Set user food with the resolved details
                setUserFood(userFoodDetails);
                setFilteredFood(userFoodDetails);
                if (userFood) setLoading(false);
            } catch (err) {
                console.log('Error al obtener los datos: ' + err.message);
            }
        };
    
        loadData();
    };
    


    const fetchCategories = async () => {
        try {
            const cats = await getCategories();
            const defaultCats= await getDefaultCategories();
            setCategories(defaultCats.concat(cats));
        } catch (err) {
            console.log('Error al obtener las categorias: ' + err);
        }
    };
    

    useEffect(()=>{
        setLoading(true)
        fetchFoods();
        fetchCategories();
    },[date])


    const handleAddMeal = async () => {
        try {
            await addUserFood(selection, date, amount);
            setAmount(null);
            setSelection(null);
            setAddMeal(false);
            console.log('Comida consumida agregada a UserFood > Firestore con éxito');
            setLoading(true)
            fetchFoods()
        } catch (error) {
            console.error('Error al agregar la comida consumida en UserFood > Firestore:', error);
        }
    }

    useEffect(() => {
        newFood && addNewFood(newFood).then(() => {
            setNewFood(null);
            setLoading(true)
            fetchFoods();
        })
        
    }, [newFood]);
    const handleDeleteMeal = async (idDoc_user_food) => {
        try {
            await deleteUserFood(idDoc_user_food); // Delete from Firebase backend
            
            // Update the local state for both userFood and filteredFood
            setUserFood((prevUserFood) => prevUserFood.filter((food) => food.id !== idDoc_user_food)); 
            setFilteredFood((prevFilteredFood) => prevFilteredFood.filter((food) => food.id !== idDoc_user_food));
            
            console.log('Comida eliminada de UserFood > Firestore con éxito');
        } catch (err) {
            console.log('Error al eliminar la comida: ' + err.message);
        }
    };
    

    const handleEditFoodConsumed = async  (idDoc_user_food, data) => {
        try {
            await editUserFood(idDoc_user_food, data); 
            fetchFoods()
            console.log('Comida editada de UserFood > Firestore con éxito');
        } catch (err) {
            console.log('Error al editar la comida: ' + err.message);
        }
    };

    const selectDate=(date)=>{
        setLoading(true)
        fetchFoods()
        setDate(new Date(date))
    }

    return (
        <div className="h-screen w-full ">
            <NavBar />
            <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:h-screen">
                <div className="w-full sm:w-11/12 lg:w-9/12 sm:h-screen lg:h-full pt-8 sm:pt-24 flex flex-col sm:flex-row justify-start items-start px-8">
                    <div className="sticky top-0 w-full sm:w-1/4 pb-4 sm:pb-12 flex flex-col h-full justify-start sm:justify-between items-center">
                        <div className="flex flex-col justify-center items-center md:items-start w-4/5  sm:w-1/3 md:w-full " >
                            <Calendar value={date} onChange={e => selectDate(e)} />
                            <Filter categories={categories} filterSelected={filterSelected} setFilterSelected={setFilterSelected} />
                        </div>
                        <Calories userFood={userFood} />
                    </div>
                    <div className="w-full sm:w-3/4 flex flex-col items-center justify-start pl-0 sm:pl-12">
                        <div className="flex flex-col w-full">
                            {loading ?
                                (<div className="w-full flex items-center justify-start my-5 ">
                                    <h1 className="font-belleza text-healthyGreen text-3xl ">Loading...</h1>
                                </div>)
                            :
                            filteredFood.map((usfood) => (
                                <FoodConsumed
                                    key={usfood.id}
                                    usfood={usfood}
                                    handleDeleteMeal={handleDeleteMeal} // Pass the delete function here
                                    handleEditFoodConsumed={handleEditFoodConsumed}
                                />
                            ))}
                            <div className="flex w-full items-center justify-center bg-white sticky bottom-0">
                                <div onClick={() => setAddMeal(true)} className="flex w-full mb-2 flex-row justify-start items-center py-2 px-4 mt-2 sm:mt-4 rounded-2xl font-semibold text-lg text-darkGray bg-healthyGreen/30 font-quicksand hover:cursor-pointer hover:bg-healthyGreen/50">
                                    <FontAwesomeIcon icon={faPlus} className="text-darkGray text-xl mr-3" />
                                    <p>Add food</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {(window.innerWidth > '1024') && (
                    <div className="w-full lg:w-4/12 lg:h-screen flex justify-start">
                        <img src={bgImage} alt='Bakground image' className="w-full h-full object-cover" />
                    </div>
                )}
            </div>
            {addMeal &&
                <PopUp setAddMeal={setAddMeal} foodData={foodData} handleAddMeal={handleAddMeal} setNewFood={setNewFood} setSelection={setSelection} selection={selection} />
            }
        </div>
    );
}

export default Home;

