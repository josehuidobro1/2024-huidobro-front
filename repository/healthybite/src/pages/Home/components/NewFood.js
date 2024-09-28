import React, { useState } from 'react';
import Input from '../../../components/Input';
import {handleInputChange} from '../../inputValidation';

const NewFood = ({ setAddFood, setNewFood}) => {
    const [inValidation, setInValidation] = useState(false);
    const [name, setName] = useState('');
    const [measure, setMeasure] = useState('');
    const [amount, setAmount] = useState(null);
    const [calories, setCalories] = useState('');


    const validateInputs = () => {
        return (
            name !== '' &&
            measure !== '' 
        );
    };
    
    const handleAmountChange= (e) => {
        const value = Number(e.target.value);
        if (!isNaN(value) && value >= 0 && value<=1000) {
            setAmount(value);
        }
        handleInputChange(parseInt(e.target.value), 0, 500, setAmount);
    }

    const handleCaloriesChange= (e) => {
        handleInputChange(parseInt(e.target.value), 0, 500, setCalories);
    }

    const save = () => {
        if (validateInputs()) {
            setInValidation(false);
            setNewFood({ name, measure, amount, calories });
            setName('');
            setMeasure('');
            setAmount('');
            setCalories('');
            setAddFood(false);
        } else {
            setInValidation(true);
        }
    };

    return (
        <div className='w-full h-full flex flex-col'>
            <h2 className='text-2xl font-semibold mb-4'>CREATE NEW FOOD</h2>
            <div className='flex-1 flex flex-col'>
                <div className='flex-1 p-2 rounded-md w-full flex flex-col'>
                    <div className='flex flex-col w-full mb-2'>
                        <Input
                            required={inValidation && name === ''}
                            label='Name'
                            placeholder='Chicken'
                            value={name}
                            inputType='text'
                            onChange={e => setName(e.target.value)}
                        />
                        {inValidation && name === '' && <p className='text-red-500 text-xs'>Name is required.</p>}
                    </div>
                    <div className='flex flex-col w-full mb-2'>
                        <Input
                            required={inValidation && measure === ''}
                            label='Measure'
                            placeholder='gr'
                            value={measure}
                            inputType='text'
                            onChange={e => setMeasure(e.target.value)}
                        />
                        {inValidation && measure === '' && <p className='text-red-500 text-xs'>Measure is required.</p>}
                    </div>
                    <div className='flex flex-col font-quicksand font-semibold text-darkGray text-sm w-full mb-2'>
                        <p className='text-sm font-bold text-darkGray'>Amount</p>
                        {inValidation && <p className="font-quicksand mt-2 md:mt-0 text-xs md:text-sm text-healthyDarkOrange font-semibold">This field is required</p>}
                        <input 
                            className={`focus:outline-none focus:ring focus:ring-healthyGreen decoration-none bg-white p-1 md:p-2 rounded-md md:rounded-xl font-quicksand my-1 text-sm md:text-md ${inValidation ? 'ring ring-healthyDarkOrange' : '' }`}  
                            placeholder="250" 
                            type="number" 
                            value={amount} 
                            onChange={handleAmountChange} 
                        />
                    
                        {inValidation && amount <= 0 && <p className='text-red-500 text-xs'>Amount must be a positive number.</p>}
                    </div>
                    <div className='flex flex-col w-full mb-2'>
                        <Input
                            required={inValidation && calories <= 0}
                            label="Calories"
                            placeholder="448"
                            value={calories}
                            inputType='number'
                            onChange={handleCaloriesChange}
                        />
                        {inValidation && calories <= 0 && <p className='text-red-500 text-xs'>Calories must be a positive number.</p>}
                    </div>
                </div>
                <div className='flex justify-end gap-2 p-2'>
                    <button 
                        onClick={save} 
                        className='bg-healthyGreen px-3 py-1 hover:cursor-pointer hover:bg-healthyDarkGreen rounded-md text-white font-semibold'
                    >
                        Save
                    </button>
                    <button 
                        onClick={() => setAddFood(false)} 
                        className='bg-healthyOrange px-3 py-1 hover:cursor-pointer hover:bg-healthyDarkOrange rounded-md text-white font-semibold'
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewFood;



