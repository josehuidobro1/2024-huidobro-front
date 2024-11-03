import React, { useState } from 'react';
import Input from '../../../components/Input';
import {handleInputChange} from '../../inputValidation';

const NewFood = ({ setAddFood, setNewFood}) => {
    const [inValidation, setInValidation] = useState(false);
    const [name, setName] = useState('');
    const [measure, setMeasure] = useState('');
    const [amount, setAmount] = useState(null);
    const [calories, setCalories] = useState('');
    const [sodium, setSodium] = useState('');
    const [carbohydrate, setCarbohydrate] = useState('');
    const [fat, setFat] = useState('');
    const [protein, setProtein]=useState('')


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
            setNewFood({ name, measure, amount, calories, sodium, carbohydrate, fat, protein });
            setName('');
            setMeasure('');
            setAmount('');
            setCalories('');
            setSodium('');
            setCarbohydrate('');
            setFat('');
            setProtein('')
            setAddFood(false);
        } else {
            setInValidation(true);
        }
    };

    return (
        <div className='w-full h-full flex flex-col'>
            <h2 className='text-2xl font-semibold mb-4'>CREATE NEW FOOD</h2>
            <div className='flex-1 flex flex-col'>
                <div className='flex flex-col md:flex-row w-full items-start justify-start sm:h-full max-h-84 overflow-y-scroll'>
                    <div className='flex-1 pb-0 px-2 sm:p-2 rounded-md w-full md:w-1/2 flex flex-col '>
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
                            <p className='text-sm font-bold text-darkGray'>Portion</p>
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
                        <div className='flex flex-col w-full mb-2 sm:mb-0'>
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
                    <div className='flex-1 pt-0 px-2 sm:p-2 rounded-md w-full md:w-1/2 flex flex-col justify-start '>
                        <div className='flex flex-col w-full mb-2'>
                            <Input
                                required={inValidation && sodium <= 0}
                                label="Sodium"
                                placeholder="448"
                                value={sodium}
                                inputType='number'
                                onChange={(e)=> handleInputChange(parseInt(e.target.value), 0, 500, setSodium)}
                            />
                            {inValidation && sodium <= 0 && <p className='text-red-500 text-xs'>Sodium must be a positive number.</p>}
                        </div>
                        <div className='flex flex-col w-full '>
                            <Input
                                required={inValidation && carbohydrate <= 0}
                                label="Carbohydrate"
                                placeholder="448"
                                value={carbohydrate}
                                inputType='number'
                                onChange={(e)=> handleInputChange(parseInt(e.target.value), 0, 500, setCarbohydrate)}
                            />
                            {inValidation && carbohydrate <= 0 && <p className='text-red-500 text-xs'>Carbohydrate must be a positive number.</p>}
                        </div>
                        <div className='flex flex-col w-full '>
                            <Input
                                required={inValidation && fat <= 0}
                                label="Fat"
                                placeholder="448"
                                value={fat}
                                inputType='number'
                                onChange={(e)=> handleInputChange(parseInt(e.target.value), 0, 500, setFat)}
                            />
                            {inValidation && fat <= 0 && <p className='text-red-500 text-xs'>Fat must be a positive number.</p>}
                        </div>
                        <div className='flex flex-col w-full '>
                            <Input
                                required={inValidation && protein <= 0}
                                label="Protein"
                                placeholder="448"
                                value={protein}
                                inputType='number'
                                onChange={(e)=> handleInputChange(parseInt(e.target.value), 0, 500, setProtein)}
                            />
                            {inValidation && protein <= 0 && <p className='text-red-500 text-xs'>Protein must be a positive number.</p>}
                        </div>
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



