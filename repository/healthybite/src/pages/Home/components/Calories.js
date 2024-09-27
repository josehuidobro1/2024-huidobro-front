import React, { useState, useEffect } from 'react';
import { createTotCal, UpdateTotCal, fetchTotCalByDay } from "../../../firebaseService";

const Calories = ({ userFood }) => {
    const [addTotCal, setAddTotCal] = useState(null);

    const calculateCalories = () => {
        let calories = 0;
        userFood.forEach((food) => {
            calories += (food.calories_portion * food.amount_eaten) / food.measure_portion;
        });
        return Math.ceil(calories);
    };

    const createOrUpdateTotCalories = async (calories, selectedDate) => {
        try {
            const totCalByDay = await fetchTotCalByDay(selectedDate);

            if (totCalByDay.length === 0) {
                // If no total calories exist for the day, create a new entry
                const createdTotCal = await createTotCal(calories, selectedDate);
                if (createdTotCal) {
                    setAddTotCal(createdTotCal);
                }
            } else {
                // If a record exists, update it
                const existingTotCal = totCalByDay[0]; // Assuming there's only one entry per day
                await UpdateTotCal(existingTotCal.id, Number(calories));
                setAddTotCal(existingTotCal);
            }
        } catch (error) {
            console.error("Error creating/updating total calories:", error);
        }
    };

    useEffect(() => {
        if (userFood && userFood.length > 0) {
            const calories = calculateCalories();
            const date = userFood[0]?.date_ingested ? new Date(userFood[0].date_ingested) : new Date(); // Ensure date format is correct
            createOrUpdateTotCalories(calories, date);
        }
    }, [userFood]);

    return (
        <div className="mt-4 sm:mt-0 flex flex-row sm:flex-col justify-center items-center w-full">
            <p className="mr-4 sm:mr-0 font-quicksand text-darkGray text-xl text-center lg:text-left">Total calories</p>
            <p className="mr-2 sm:mr-0 font-quicksand text-darkGray text-4xl lg:text-6xl">{calculateCalories()}</p>
            <p className="font-quicksand text-darkGray text-md">calories</p>
        </div>
    );
};

export default Calories;