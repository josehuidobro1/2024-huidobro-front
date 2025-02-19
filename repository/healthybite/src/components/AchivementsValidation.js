import { addGoal } from "../firebaseService"
export const plateAchivements = (user_id, amountOfPlates) => {
    // Allow clearing the input
    if (amountOfPlates>=1){
        console.log("Amount of Plates >= 1 platesAchievement en AchivementValidation.js")
        addGoal(user_id, 3)
    }
    if (amountOfPlates>=5){
        console.log("Amount of Plates >= 5 platesAchievement en AchivementValidation.js")
        addGoal(user_id, 4)
    }
    if (amountOfPlates>=10){
        console.log("Amount of Plates >= 10 platesAchievement en AchivementValidation.js")
        addGoal(user_id, 5)
    }

};

export const drinkAchievments = (user_id, amountOfDrinks)=>{
    if (amountOfDrinks>=1){
        console.log("Amount of Drinks >= 1 platesAchievement en AchivementValidation.js")
        addGoal(user_id, 6)
    }
    if (amountOfDrinks>=5){
        console.log("Amount of Drinks >= 5 platesAchievement en AchivementValidation.js")
        addGoal(user_id, 7)
    }
    if (amountOfDrinks>=10){
        console.log("Amount of Drinks >= 10 platesAchievement en AchivementValidation.js")
        addGoal(user_id, 8)
    }
}