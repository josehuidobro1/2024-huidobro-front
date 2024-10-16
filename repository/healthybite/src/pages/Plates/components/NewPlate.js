import React, { useRef, useState } from 'react';
import FoodItem from './FoodItem';
import {createplate} from '../../../firebaseService'
import { uploadImageToStorage } from "../../../firebaseConfig";
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NewPlate = ({ foodData, setPlates, plates }) => {
  const [plateName, setPlateName] = useState('');
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [message, setMessage] = useState(''); // State for success message
  const [reset, setReset] = useState(false); // State to trigger reset in FoodItem
  const [plateFoodIds, setPlateFoodIds] = useState([]); // State for storing plate food IDs
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  // Function to handle adding/removing food items
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  
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
  
const createPlate = async () => {
  if (!plateName) {
    setMessage("The plate name is missing");
    return;
  }
  if (selectedFoods.length === 0) {
    setMessage("Please select the food you want to include");
    return;
  }

  try {
    let imageUrl = "";
    if (image) {
      // Upload the image and get the URL
      imageUrl = await uploadImageToStorage(image);
    }

    const totalCalories = calculateTotalCalories();
    const ingredientsArray = selectedFoods.map((food) => ({
      ingredientId: food.id,
      quantity: food.quantity,
    }));

    const data = {
      name: plateName,
      ingredients: ingredientsArray,
      total_cal: totalCalories,
      image: imageUrl, // Add the image URL to the plate data
    };

    // Update the UI without refreshing the page
    const newPlates=plates.concat({ name: plateName, ingredients: ingredientsArray, calories_portion: totalCalories, image: imageUrl })
    console.log('ASI QUEDARIA LOS NUEVOS PLATOS ', newPlates)
    setPlates(newPlates);

    await createplate(data);

    // Clear form inputs and display success message
    setMessage("Your Plate is created!");
    setPlateName("");
    setSelectedFoods([]);
    setImage(null); // Clear the selected image
    setReset(true);

    // Reset message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  } catch (error) {
    console.error("Error creating plate:", error);
    setMessage("An error occurred while creating the plate.");
  }
};

const savePlate = async () => {
  await createPlate();
  setReset(true); // Reset the form
};

  
  // Handle reset in FoodItem components by turning reset off after it is triggered
  const handleResetComplete = () => {
    setReset(false);
  };

  const handleIconClick = () => {
    fileInputRef.current.click(); // Abre el selector de archivos
  };

  return (
    <div className="bg-white border-2 flex flex-col justify-start items-center rounded-b-xl border-healthyGreen border-t-none w-full max-h-[300px] md:max-h-[550px] lg:max-h-[400px] overflow-y-auto">
      <div className="flex md:sticky md:top-0 py-2 w-full justify-center items-center text-healthyDarkGreen bg-white">
        <div className='flex w-full items-center justify-around'>
          <input
            className="text-sm font-semibold bg-healthyGray p-1 text-healthyDarkGreen focus:outline-none rounded-lg text-center w-10/12 focus:ring-healthyGreen"
            type="text"
            placeholder="Plate name"
            value={plateName}
            onChange={(e) => setPlateName(e.target.value)}
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className='hidden'
          />
          <button onClick={handleIconClick} className='text-healthyGreen hover:text-healthyDarkGreen p-2 shadow-sm'>
            <FontAwesomeIcon icon={faImage} className='text-2xl' /> {/* Cambia el tamaño según tus necesidades */}
          </button>
        </div>

          
        </div>
      {message && (
        <p className="text-white bg-healthyGreen px-2 py-1 rounded-full text-sm text-center font-semibold mt-2">{message}</p>
      )}

      <div className="font-quicksand text-sm text-healthyGreen px-2 w-full">
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
      <div className="flex justify-center items-center sticky mt-2 bottom-0 w-full py-2 cursor-pointer bg-healthyGreen">
        <button
          className="font-quicksand text-white font-bold text-sm"
          onClick={savePlate}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default NewPlate;


