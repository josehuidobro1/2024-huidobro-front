import { addGoal } from "../firebaseService"
export const plateAchivements = (amountOfPlates) => {
    // Allow clearing the input
    if (amountOfPlates>=1){
        console.log("Amount of Plates >= 1 platesAchievement en AchivementValidation.js")
        addGoal(3)
    }
    if (amountOfPlates>=5){
        console.log("Amount of Plates >= 5 platesAchievement en AchivementValidation.js")
        addGoal(4)
    }
    if (amountOfPlates>=10){
        console.log("Amount of Plates >= 10 platesAchievement en AchivementValidation.js")
        addGoal(5)
    }

};
export const drinkAchievments = (amountOfDrinks)=>{
    if (amountOfDrinks>=1){
        console.log("Amount of Drinks >= 1 platesAchievement en AchivementValidation.js")
        addGoal(6)
    }
    if (amountOfDrinks>=5){
        console.log("Amount of Drinks >= 5 platesAchievement en AchivementValidation.js")
        addGoal(7)
    }
    if (amountOfDrinks>=10){
        console.log("Amount of Drinks >= 10 platesAchievement en AchivementValidation.js")
        addGoal(8)
    }
}