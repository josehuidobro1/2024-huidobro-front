import React, { useState, useEffect, useContext } from 'react';
import { createTotCal, UpdateTotCal, fetchTotCalByDay } from "../../../firebaseService";
import { UserContext } from '../../../App';

const Calories = ({ userFood }) => {
    const {user_id} =useContext(UserContext)
    const [addTotCal, setAddTotCal] = useState(null);
    const [totals, setTotals] = useState({
        calories: 0,
        carbs: 0,
        fat: 0,
        sodium: 0,
        protein: 0,
    });

    const calculateTotals = () => {
        let calories = 0, carbs = 0, fat = 0, sodium = 0, protein = 0;

        userFood.forEach((food) => {
            const portionFactor = food.amount_eaten / food.measure_portion;
            calories += food.calories_portion * portionFactor;
            carbs += food.carbohydrates_portion * portionFactor;
            fat += food.fats_portion * portionFactor;
            sodium += food.sodium_portion * portionFactor;
            protein += food.protein_portion * portionFactor;
        });

        setTotals({
            calories: Math.ceil(calories),
            carbs: Math.ceil(carbs),
            fat: Math.ceil(fat),
            sodium: Math.ceil(sodium),
            protein: Math.ceil(protein),
        });
    };

    const createOrUpdateTotCalories = async (totals, selectedDate) => {
        try {
            const totCalByDay = await fetchTotCalByDay(user_id, selectedDate);    
            const dataToSend = {
                ...totals,
            };
            if (totCalByDay.length === 0) {
                const createdTotCal = await createTotCal(user_id, dataToSend, selectedDate);
                if (createdTotCal) {
                    setAddTotCal(createdTotCal);
                }
            } else {
                const existingTotCal = totCalByDay[0];
                await UpdateTotCal(user_id, existingTotCal.id, dataToSend,selectedDate );
                setAddTotCal(existingTotCal);
            }
        } catch (error) {
            console.error("Error creating/updating totals:", error);
        }
    };
    

    useEffect(() => {
        if (userFood && userFood.length > 0) {
            calculateTotals();
        }
    }, [userFood]);
    
    useEffect(() => {
        if (userFood && userFood.length > 0 && totals.calories > 0) {
            const date = userFood[0]?.date_ingested ? new Date(userFood[0].date_ingested) : new Date();
            createOrUpdateTotCalories(totals, date);
        }
    }, [totals, userFood]);
    
    const formatCalories = (calories) => {
        if (calories >= 1_000_000) {
            return `${(calories / 1_000_000).toFixed(1)}M`; 
        } else if (calories >= 1_000) {
            return `${(calories / 1_000).toFixed(1)}K`; 
        }
        return calories; 
    };

    return (
        <div className="flex flex-row sm:flex-col justify-center items-center w-full">
            <p className="mr-4 sm:mr-0 font-quicksand text-darkGray text-md sm:text-xl text-center lg:text-left">Total calories</p>
            <p className="mr-2 sm:mr-0 font-quicksand text-darkGray text-xl font-semibold sm:text-4xl lg:text-6xl">{formatCalories(totals.calories)}</p>
        </div>
    );
};

export default Calories;
