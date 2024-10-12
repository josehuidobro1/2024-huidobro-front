import React, { useState } from 'react';
import FoodItem from './FoodItem';
import {createplate, createplateFood} from '../../../firebaseService'
const NewPlate = ({ foodData, setPlates }) => {
  const [plateName, setPlateName] = useState('');
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [message, setMessage] = useState(''); // State for success message
  const [reset, setReset] = useState(false); // State to trigger reset in FoodItem
  const [plateFoodIds, setPlateFoodIds] = useState([]); // State for storing plate food IDs

  // Function to handle adding/removing food items
  const handleFoodChange = (food, quantity ) => {
    if (quantity > 0) {
      const updatedFoods = selectedFoods.filter(f => f.id !== food.id);
      setSelectedFoods([...updatedFoods, { ...food, quantity }]);
    } else {
      const updatedFoods = selectedFoods.filter(f => f.id !== food.id);
      setSelectedFoods(updatedFoods);
    }
  };

  // Function to calculate total calories
  const calculateTotalCalories = () => {
    return selectedFoods.reduce((total, food) => {
      return total + (food.quantity * food.calories_portion) / food.measure_portion;
    }, 0);
  };
  const ingredientsArray = selectedFoods.map(food => ({
    ingredientId: food.id,
    quantity: food.quantity
}));
  const CreatePlateFoods = async () => {
    try {
      const plateFoodIdsArray = await Promise.all(
        selectedFoods.map(async (food) => {
          const id_platefood = await createplateFood({ 'food_id': food.id, 'amount': food.quantity });
          return id_platefood.message.id; // Extract the correct ID
        })
      );
  
      // Return the array of IDs to the caller
      console.log("Plate food IDs:", plateFoodIdsArray);
      return plateFoodIdsArray; // Return the array directly
  
    } catch (error) {
      console.error("Error creating plate foods:", error);
      return []; // Return an empty array in case of error
    }
  };
  
  const createPlate = async () => {
    if (!plateName){
        setMessage("The plate name is missing")
        return
    }
    if(selectedFoods.length==0){
        setMessage("Please select the food you want to include")
        return
    }
    if (plateName &&  selectedFoods.length>0){
        try{
            // const plateFoodIds = await CreatePlateFoods();
            const totalCalories = calculateTotalCalories();
            const data = {
                'name': plateName,
                'ingredients': ingredientsArray,
                'total_cal': totalCalories
            }
            setPlates(prev => prev.push ({name: plateName, ingredients:ingredientsArray, calories_portion:totalCalories  }) )
            createplate(data)
            setMessage('Your Plate is created!');
            window.location.reload();

        }
        catch (error) {
            console.error("Error creating plate foods:", error);
            return [];
        }
    }
  };
  
  const savePlate = async () => {
    
    await createPlate()
  
    
  
    setPlateName('');
    setSelectedFoods([]);
  
    setReset(true);
    setTimeout(() => setMessage(''), 3000);
  };
  
  
  // Handle reset in FoodItem components by turning reset off after it is triggered
  const handleResetComplete = () => {
    setReset(false);
  };

  return (
    <div className='bg-white border-2 flex flex-col justify-start items-center rounded-b-xl border-healthyGreen border-t-none w-full max-h-[300px] md:max-h-[550px] lg:max-h-[400px] overflow-y-auto'>
      <div className='flex md:sticky md:top-0 py-2 w-full justify-center items-center text-healthyDarkGreen bg-white'>
        <input
          className='text-sm font-semibold bg-healthyGray p-1 text-healthyDarkGreen focus:outline-none rounded-lg text-center w-10/12 focus:ring-healthyGreen'
          type='text'
          placeholder='Plate name'
          value={plateName}
          onChange={(e) => setPlateName(e.target.value)}
        />
      </div>

      {/* Success Message */}
      {message && <p className="text-green-600 font-semibold mt-2">{message}</p>}

      <div className='font-quicksand text-sm text-healthyGreen px-2 w-full'>
        {foodData.map((food) => (
          <FoodItem 
            key={food.id} 
            food={food} 
            onFoodAdd={handleFoodChange} 
            reset={reset} 
            onResetComplete={handleResetComplete}
          />
        ))}
      </div>
      <div className='flex justify-center items-center sticky mt-2 bottom-0 w-full py-2 cursor-pointer bg-healthyGreen'>
        <button className='font-quicksand text-white font-bold text-sm' onClick={savePlate}>
          Save changes
        </button>
      </div>
    </div>
  );
};

export default NewPlate;


