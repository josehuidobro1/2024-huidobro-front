import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faCircleDown, faCheck } from '@fortawesome/free-solid-svg-icons'; 
import FoodItemMenu from './FoodItemMenu';
import MenuItem from './MenuItem';
import { editCalories } from '../../../firebaseService';

function Menu({ menu, loading, idFoodMenu, setSelection }) {
    const [addCalories, setAddCalories] = useState(false);
    const [calories, setCalories] = useState(0);
    const [amount, setAmount] = useState(0);
    const [menuCalories, setMenuCalories] = useState([]);
    const [menuWithoutCal, setMenuWithoutCal] = useState([]);
    const [newCalories, setNewCalories] = useState(null);

    const handleNewCalories = async () => {
        try {
            editCalories(newCalories.id, newCalories.calories);
            setNewCalories(null);
        } catch (error) {
            console.log("Error adding calories to food menu: ", error);
        }
    };

    useEffect(() => {
        if (newCalories) {
            setMenuCalories(prev => [newCalories, ...prev]);
            setMenuWithoutCal(prev => prev.filter(item => item.id !== newCalories.id));
            handleNewCalories();
        }
    }, [newCalories]);

    useEffect(() => {
        setMenuCalories(menu.filter(item => item.calories > 0)
            .sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1));
        setMenuWithoutCal(menu.filter(food => food.calories === 0)
            .sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1));
    }, [menu]);

    return (
        <div className='relative flex flex-col w-full p-3 bg-white/20 rounded-md font-quicksand font-semibold text-white text-md'>
            {loading ? (
                <div className='w-full flex justify-center items-center py-6'>
                    <h1 className='text-white font-belleza text-2xl'>Loading...</h1>
                </div>
            ) : (
                <div className='flex flex-col w-full'>
                    <div className='w-full flex flex-row items-center justify-between my-2'>
                        <p className='text-left text-sm font-bold w-6/12'>Menu</p>
                        <p className='text-right text-sm font-bold w-4/12 mr-2'>Portion</p>
                        <p className='text-right text-sm font-bold w-2/12'>Calories</p>
                    </div>
                    <div className="bg-white/40 p-2 rounded-lg mt-4 w-full max-h-[350px] md:max-h-[500px] lg:max-h-[330px] overflow-y-auto">
                        {menuCalories.map((item, index) => (
                            <FoodItemMenu key={index} food={item} setSelection={setSelection} />
                        ))}
                    </div>
                    <div className='flex w-full justify-center items-center flex-col mt-2'>
                        <div className='flex items-center justify-center'>
                            <button onClick={() => setAddCalories(!addCalories)} className='px-3 rounded-md py-1 bg-messidepaul hover:border-2 hover:border-white'>
                                <FontAwesomeIcon icon={faList} /> Set calories to menu food
                            </button>
                        </div>
                        {addCalories && (
                            <div className='w-full flex justify-start flex-col mt-4 bg-messidepaul p-2 rounded-md'>
                                <div className='sticky top-0 flex justify-between items-center font-bold text-sm underline-2 mb-2'>
                                    <p>Food name</p>
                                    <p>Calories per unit</p>
                                </div>
                                <div className='max-h-60 overflow-y-auto'>
                                    {menuWithoutCal.length > 0 ? (
                                        menuWithoutCal.map((item, index) => (
                                            <MenuItem key={index} item={item} setNewCalories={setNewCalories} />
                                        ))
                                    ) : (
                                        <p className='text-white/90 text-sm font-bold text-center w-full'>
                                            All menu items have set calories
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
                
            )}
            
        </div>
    );
}

export default Menu;
