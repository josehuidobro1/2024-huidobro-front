import React, { useState, useEffect } from 'react';
import Counter from '../../../components/Counter';

const FoodItem = ({ food, onFoodAdd, reset, onResetComplete }) => {
  const [value, setValue] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  // Trigger reset of the component when reset prop changes to true
  useEffect(() => {
    if (reset) {
      setValue(0);
      setIsAdded(false);
      setErrorMessage(''); // Clear the error message on reset
      onResetComplete(); // Notify parent component that reset is complete
    }
  }, [reset, onResetComplete]);

  const handleAddClick = () => {
    if (value === 0) {
      setErrorMessage('Please select a value greater than 0 before adding.');
      return;
    }

    setIsAdded(!isAdded);
    onFoodAdd(food, isAdded ? 0 : value);
    setErrorMessage(''); // Clear error message on successful add
  };

  return (
    <div className='flex flex-col w-full mt-1'>
      <div className='flex justify-between items-center'>
        <p className='text-sm font-semibold w-2/3'>{food.name}</p>
        <div className='flex justify-end items-center'>
          <p className='text-xs'>{food.measure}</p>
          <Counter value={value} setValue={setValue} colour='bg-healthyGreen' />
          <button
            className={`ml-2 px-2 py-1 text-xs ${isAdded ? 'bg-healthyGreen bg-opacity-10' : 'bg-gray-200'} rounded`}
            onClick={handleAddClick}
          >
            {isAdded ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p> // Display the error message
      )}
    </div>
  );
};

export default FoodItem;





