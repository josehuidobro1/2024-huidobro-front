import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import bgImage from '../../assets/imgHome.jpg'
import Calendar from "../../components/Calendar";
import NavBar from "../../components/NavBar";
import Calories from "./components/Calories";
import FoodConsumed from "./components/FoodConsumed";
import PopUp from "./components/PopUp";
import { addNewFood, addUserFood, fetchAllFoods, fetchUserFoods, deleteUserFood , fetchFoodByID, editUserFood, getCategories, getDefaultCategories,getProdByID, getProducts,getBarCategory,updateCategoryDefault, getUserDrinks,getUserPlates, getDrinkByID, getPlateByID, getGroupedDrinkTypes} from "../../firebaseService";
import Filter from "./components/Filter";
import Loading from "../../components/Loading";


function Home() {
    const [foodData, setFoodData] = useState([]); // datos de tabla Food
    const [platesData, setPlatesData] = useState([]); // datos de tabla Plates
    const [drinksData, setDrinksData] = useState([]); // datos de tabla Drinks
    const [userFood, setUserFood] = useState([]); // datos de tabla UserFood
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState();
    const [selection, setSelection] = useState();
    const [addMeal, setAddMeal] = useState(false);
    const [newFood, setNewFood] = useState();
    const [categories, setCategories]=useState([])
    const [filteredFood, setFilteredFood]=useState([])
    const [filteredDrinks, setFilteredDrinks] = useState([]); // state for filtered drinks
    const [filterSelected, setFilterSelected]=useState(null)
    const [loading, setLoading] = useState(true);
    const [groupedDrinks, setGroupedDrinks] = useState([])

    useEffect(()=>{
        if(filterSelected) {
            const aplyingFilter=filteredFood.filter((item)=>filterSelected.foods.includes(item.id_Food))
            setFilteredFood(aplyingFilter)
        }else{
            setFilteredFood(userFood)
        }
    },[filterSelected])
    const getUserData = async()=> {
        setPlatesData(await  getUserPlates())
        setDrinksData (await getUserDrinks())
    }
    
    const handleChangesCat = async () => {
        try {
            // Get the foods and bar category
            const barFoods = await getProducts(); // Assuming this returns a list of foods
            const BarCat = await getBarCategory(); // Assuming this returns a category object
            
            if (!BarCat) {
                throw new Error('Bar category not found');
            }
    
            // Filter barFoods to include only the items that are not in BarCat.foods
            const filteredFoods = barFoods.filter(food => !BarCat.foods.includes(food.id)); // Assuming food.id is the unique identifier
    
            // Prepare the data for the update
            const data = {
                name: BarCat.name,
                id_User: 'default', 
                icon: BarCat.icon, // Fixed this to use BarCat.icon (instead of BarCat.name for both)
                foods: [...BarCat.foods, ...filteredFoods.map(food => food.id)] // Combine existing foods and new filtered foods
            };

            await updateCategoryDefault(data, BarCat.id);    
            console.log("Category updated successfully");
        } catch (error) {
            console.error("Error saving category changes by ID:", error);
        }
    };
    

    const fetchFoods = async () => {
        const loadData = async () => {
            try {
                // Validate the 'date' before using it
                if (isNaN(new Date(date).getTime())) {
                    throw new Error('Invalid date value');
                }
                const userFood = await fetchUserFoods(date);
                const food = await fetchAllFoods();
                setFoodData(food.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1));
                
                const userFoodDetails = await Promise.all(userFood.map(async (item) => {
                    let foodDetails;
    
                    // Try fetching from the 'food' table first
                    foodDetails = await fetchFoodByID(item.id_Food);

                    
                    // If no details are found in the 'food' table, try the 'menu' table
                    if (!foodDetails) {
                        foodDetails = await getPlateByID(item.id_Food);
                        console.log(foodDetails)
                        if(!foodDetails){
                            foodDetails = await getDrinkByID(item.id_Food);
                            if(!foodDetails){
                                foodDetails = await getProdByID(item.id_Food)
                            }
                        }


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
            const drinkCats = await getGroupedDrinkTypes();
            console.log(cats,defaultCats,drinkCats)
            await handleChangesCat()
            const combinedCats = [
                ...cats, 
                ...defaultCats,
                ...drinkCats
            ];
            setCategories(combinedCats);
        } catch (err) {
            console.log('Error al obtener las categorias: ' + err);
        }
    };
    

    useEffect(()=>{
        setLoading(true)
        fetchFoods();
        fetchCategories();
    },[date])
    useEffect(()=>{
        getUserData()
        console.log(drinksData, platesData)
    },[])


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
        <div className="h-screen w-full overflow-y-hidden">
            <NavBar />
            {loading ? <Loading />
            :
            <div className="flex flex-col lg:flex-row justify-between items-center w-full h-full lg:h-screen overflow-y-scroll md:overflow-y-hidden">
                <div className="w-11/12 lg:w-9/12 sm:h-screen lg:h-full pt-8 sm:pt-24 flex flex-col sm:flex-row justify-start items-start px-1 sm:px-4 lg:px-8 pb-32 xs:pb-0">
                    <div className="w-full sm:w-1/4 pb-4 sm:pb-12 flex flex-col h-full justify-start sm:justify-between items-center">
                        <div className="flex flex-col justify-center items-center md:items-start w-4/5  sm:w-full " >
                            <Calendar value={date} onChange={e => selectDate(e)} />
                            <Filter categories={categories} filterSelected={filterSelected} setFilterSelected={setFilterSelected} />
                        </div>
                        <Calories userFood={userFood} />
                    </div>
                    <div className="w-full sm:w-3/4 flex flex-col items-center justify-start pl-0 sm:pl-12 ">
                        <div className="flex flex-col w-full ">
                            {filteredFood.map((usfood) => (
                                <FoodConsumed
                                    key={usfood.id}
                                    usfood={usfood}
                                    handleDeleteMeal={handleDeleteMeal} // Pass the delete function here
                                    handleEditFoodConsumed={handleEditFoodConsumed}
                                />
                            ))}
                            
                        </div>
                    </div>
                    <div className="absolute bottom-0  right-0 flex  items-center justify-center ">
                        <div onClick={() => setAddMeal(true)} className="  hover:cursor-pointer bg-white rounded-tl-full p-3 flex justify-center items-center">
                            <FontAwesomeIcon icon={faPlus} className="text-white text-xl xs:text-2xl bg-healthyGreen hover:bg-healthyDarkGreen rounded-full p-3 xs:p-5  shadow-lg ml-3 xs:ml-4 mt-4 xs:mt-6 " />
                        </div>
                    </div>
                </div>
                
                {(window.innerWidth > '1024') && (
                    <div className="w-full lg:w-4/12 lg:h-screen flex justify-start">
                        <img src={bgImage} alt='Bakground image' className="w-full h-full object-cover" />
                    </div>
                )}
            </div>}
            {addMeal &&
                <PopUp newFood={newFood} setAddMeal={setAddMeal} foodData={foodData} handleAddMeal={handleAddMeal} setNewFood={setNewFood} setSelection={setSelection} selection={selection} platesData={platesData} drinksData={drinksData} />
            }
        </div>
    );
}

export default Home;

