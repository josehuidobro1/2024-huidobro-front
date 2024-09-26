import React, { useState } from 'react';
import Input from '../../../components/Input';
import {handleInputChange} from '../../inputValidation';

const NewFood = ({ setAddFood, setNewFood}) => {
    const [inValidation, setInValidation] = useState(false);
    const [name, setName] = useState('');
    const [measure, setMeasure] = useState('');
    const [amount, setAmount] = useState('');
    const [calories, setCalories] = useState('');


    const validateInputs = () => {
        return (
            name !== '' &&
            measure !== '' 
        );
    };
    
    const handleAmountChange= (e) => {
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
                    <div className='flex flex-col w-full mb-2'>
                        <Input
                            required={inValidation && amount <= 0}
                            label="Amount"
                            placeholder='250'
                            value={amount}
                            inputType='number'
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



