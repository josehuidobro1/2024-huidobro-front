
import { convertFieldResponseIntoMuiTextFieldProps } from "@mui/x-date-pickers/internals";
import { auth, firestore } from "../src/firebaseConfig";
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import axios from "axios";

export const fetchUser=async()=>{
    try {
        const response = await axios.get(`https://two024-ranchoaparte-back.onrender.com/User/${auth.currentUser.uid}`);
        
        return response.data; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        return null; // Return null or handle the error as needed
    }
}

export const editUserData=async(data)=>{
    try {
        const response = await axios.put(`https://two024-ranchoaparte-back.onrender.com/update_user/${auth.currentUser.uid}`, data);
        
        return response.data; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error editing user data by ID:', error);
        return null; // Return null or handle the error as needed
    }
}

export const deleteUserAc=async()=>{
    try {
        await axios.delete(`https://two024-ranchoaparte-back.onrender.com/delete-user/${auth.currentUser.uid}`); // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        return null; // Return null or handle the error as needed
    }
}

export const fetchUserFoods = async (date) => {
    const userFood = await userFoodMeals(); // Wait for the promise to resolve
    if (!userFood) return []; // Handle if there's no data

    // Filter the food based on the provided date
    const filteredFood = userFood.filter(doc => {
        let ingestedDate;
        if (doc.date_ingested.seconds) {
            ingestedDate = new Date(doc.date_ingested.seconds * 1000); // Convert timestamp to Date
        } else {
            ingestedDate = new Date(doc.date_ingested); // If it's a string, it will handle conversion
        }

        return (
            ingestedDate.getDate() === date.getDate() &&
            ingestedDate.getMonth() === date.getMonth() &&
            ingestedDate.getFullYear() === date.getFullYear()
        );
    });

    console.log("Filtered User Foods by date:", filteredFood);
    return filteredFood;
};


export const fetchFoodByID = async (foodId) => {
    try {
        const response = await axios.get(`https://two024-ranchoaparte-back.onrender.com/Foods/${foodId}`);
        return response.data.message.food; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        return null; // Return null or handle the error as needed
    }
};
const userFoodMeals = async()=>{
    try {
        const response = await axios.get(`https://two024-ranchoaparte-back.onrender.com/mealUserDay/${auth.currentUser.uid}`);
        return response.data.message.foods; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        return null; // Return null or handle the error as needed
    }
}



export const fetchAllFoods = async () => {
    try {
        const response = await axios.get('https://two024-ranchoaparte-back.onrender.com/Foods/');
        console.log(response.data.message.food)
        return response.data.message.food; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching foods:', error);
        return []; // Return an empty array or handle the error as needed
    }
};


export const addUserFood = async (selection, date, amount) => {
    try {
        console.log(selection)
        const response = await fetch("https://two024-ranchoaparte-back.onrender.com/UserFood_log", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( {
                "id_User": auth.currentUser.uid,
                "id_Food": selection.id_food,
                "date_ingested": date.toISOString(),
                "amount_eaten": Number(selection.amount),
            }),
            
        });
        console.log(auth.currentUser.uid,selection.id_food,date.toISOString(),Number(selection.amount))
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Something went wrong");
        }

        console.log("Food added successfully:", data);
    } catch (error) {
        console.error("Error adding food:", error);
    }
};

export const addNewFood = async (newFood) => {
    try {
        const response = await fetch("https://two024-ranchoaparte-back.onrender.com/Food_log", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( {
                "name": newFood.name,
                "calories_portion": Number(newFood.calories),
                "measure": newFood.measure,
                "measure_portion": Number(newFood.amount)
            }),
            
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Something went wrong");
        }

        console.log("Food added successfully:", data);
    } catch (error) {
        console.error("Error adding food:", error);
    }
};

export const deleteUserFood = async (doc_id) => {

    try {
        console.log(doc_id)
        await axios.delete(`https://two024-ranchoaparte-back.onrender.com/DeleteMealUser/${doc_id}`); // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        return null; // Return null or handle the error as needed
    }
};


export const editUserFood = async (doc_id,data) => {

    try {
        console.log(doc_id,data)
        await axios.put(`https://two024-ranchoaparte-back.onrender.com/UpdateUserFood/${doc_id}`,data); // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        return null; // Return null or handle the error as needed
    }
};

export const getCategories = async()=>{
    const uid=auth.currentUser.uid
    try {
        const response = await axios.get(`https://two024-ranchoaparte-back.onrender.com/GetCategoryUser/${uid}`);
        return response.data.message.categories; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching categories :', error);
        return null; // Return null or handle the error as needed
    }
}

export const getDefaultCategories = async () => {
    const uid = auth.currentUser.uid;
    try {
        const response = await axios.get(`https://two024-ranchoaparte-back.onrender.com/GetCategoryUser/default`);
        return response.data.message.categories; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching default categories:', error);
        return null; // Return null or handle the error as needed
    }
};

export const getBarCategory = async () => {
    try {
        const defaultCategories = await getDefaultCategories();
        console.log('Default Categories:', defaultCategories); // Log all categories

        if (defaultCategories) {
            const barCategory = defaultCategories.find(cat => cat.name === "C&V bar");
            console.log('Found Bar Category:', barCategory); // Log if the category is found
            return barCategory ? barCategory : null; // Return the category or null if not found
        }
        return null;
    } catch (error) {
        console.error('Error fetching bar category:', error);
        return null; // Return null or handle the error as needed
    }
};



export const createCategory =async (data)=>{
    const uid=auth.currentUser.uid
    try{
        const response = await axios.post(`https://two024-ranchoaparte-back.onrender.com/CreateCategory/`, {...data,id_User: uid });
        return response.data
    }catch(error){
        console.error('Error adding new category: ', error);
        return null;
    }
}

export const updateCategory=async(data,category_id)=>{
    try{
        const response = await axios.put(`https://two024-ranchoaparte-back.onrender.com/UpdateCategory/${category_id}`,{...data,id_User: auth.currentUser.uid });
        return response.data
    }catch(error){
        console.error('Error updating category by id: ', error);
        return null;
    }
}
export const updateCategoryDefault=async(data,category_id)=>{
    try{
        const response = await axios.put(`https://two024-ranchoaparte-back.onrender.com/UpdateCategory/${category_id}`,{...data,id_User: 'default' });
        return response.data
    }catch(error){
        console.error('Error updating category by id: ', error);
        return null;
    }
}

export const deleteCategory=async(category_id)=>{
    try {
        await axios.delete(`https://two024-ranchoaparte-back.onrender.com/DeleteCategory/${category_id}`); 
    } catch (error) {
        console.error('Error deleting category by ID:', error);
        return null; 
    }
}

export const createTotCal = async (totCal, date) => {
    try {
        const validDate = date instanceof Date && !isNaN(date) ? date.toISOString() : new Date().toISOString(); // Fallback to current date if invalid

        const response = await fetch("https://two024-ranchoaparte-back.onrender.com/CreateTotCaloriesUser/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id_user": auth.currentUser.uid,
                "day": validDate, // Using the valid date here
                "totCal": totCal,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Something went wrong");
            
        }
        

        console.log("Calories entry added successfully:", data);
        return data;
    } catch (error) {
        console.error("Error adding calories entry:", error);
        return null;
    }
};

export const UpdateTotCal=async(totcal_id,newTotCal)=>{
    try {
        console.log("HOLA?",totcal_id,newTotCal)
        await axios.put(`https://two024-ranchoaparte-back.onrender.com/UpdateTotCaloriesUser/${totcal_id}`,{ calUpdate: newTotCal }); 
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        return null; // Return null or handle the error as needed
    }
}
export const fetchTotCalByDay = async (date) => {
    const userTotCal = await getTotCalUser(); // Wait for the promise to resolve
    
    if (!userTotCal) return []; // Handle if there's no data

    // Filter the food based on the provided date
    const filteredTotcal = userTotCal.filter(doc => {
        let ingestedDate;
        if (doc.day.seconds) {
            ingestedDate = new Date(doc.day.seconds * 1000); // Convert timestamp to Date
        } else {
            ingestedDate = new Date(doc.day); // If it's a string, it will handle conversion
        }

        return (
            ingestedDate.getDate() === date.getDate() &&
            ingestedDate.getMonth() === date.getMonth() &&
            ingestedDate.getFullYear() === date.getFullYear()
        );
    });

    console.log("Filtered User cals by date:", filteredTotcal);
    return filteredTotcal;
};

export const getCaloriesByCategories=async (date)=>{
    try{
        const userMeals= (await fetchUserFoods(date))
        const barFood= await getProducts();
        const foods= await  fetchAllFoods()
        const categories = (await getCategories()).concat(await getDefaultCategories());
        const result=[]
        // food consumed with its calories counted
        userMeals.forEach((item)=>{
            let calories
            let fooddetail=(foods.find((food)=>food.id===item.id_Food))
            if(fooddetail){
                calories={
                    id_Food: item.id_Food,
                    calories: Number((item.amount_eaten*fooddetail.calories_portion)/fooddetail.measure_portion)
                }
            }else{ //that food is i C&V menu
                fooddetail = barFood.find((food)=>food.id===item.id_Food)
                calories={
                    id_Food: item.id_Food,
                    calories: Number(item.amount_eaten*fooddetail.calories)
                }
            }

            result.push(calories)
        })
        const totalCal = result.reduce((acc,value)=>acc+value.calories, 0) 
        // divide calories by categories
        const getCalories=[]
        categories.forEach((cat)=>{
            let cals=0
            result.filter(food=>cat.foods.includes(food.id_Food)).forEach((item)=>{
                cals+=Number(item.calories)
            })
            getCalories.push({label:cat.name, value:cals})
        })
        const caloriesInCat = getCalories.reduce((acc,value)=>acc+value.value, 0) 
        caloriesInCat<totalCal && getCalories.push({label:'Others',value:totalCal-caloriesInCat})

        return getCalories
    }catch(error){
        console.log('Error fetching calories by categories: ', error)
    }
}

export const getTotCalUser=async()=>{
    const uid=auth.currentUser.uid
    if(uid){try {
        console.log(uid)
        const response = await axios.get(`https://two024-ranchoaparte-back.onrender.com/GetTotCalUser/${uid}`);
        return response.data.message.totCals; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching categories :', error);
        return null; // Return null or handle the error as needed
    }}else{
        console.log('no se encuentra el usuario')
    }
}

export const resetPassword = async (oobCode, newPassword) => {
    try {
        await verifyPasswordResetCode(auth, oobCode);
        await confirmPasswordReset(auth, oobCode, newPassword);
        return true;
    } catch (error) {
        console.error('Error resetting password:', error.message, error.code); // Add error message and code
        return false;
    }
};

// APP MESIIDEPAUL

export const getProducts=async()=>{
    const response = await axios.get('https://candvbar-back.onrender.com/products');
    const foods=response.data.products
    return foods;
}

export const editCalories=async(id,calories)=>{
    await axios.put(`https://candvbar-back.onrender.com/add-calories/${id}/${calories}`); 

}
export const getProdByID= async(prod_id)=>{
    const response = await axios.get(`https://candvbar-back.onrender.com/products/${prod_id}`);
    const food=response.data.product
    return food
}

// things that need to be deployed
export const createplate = async (selection) => {
    try {
        console.log(selection)
        const response = await fetch("http://127.0.0.1:8000/CreatePlate/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( {
                "id_User": auth.currentUser.uid,
                "ingredients": selection.ingredients,
                "name": selection.name,
                "calories_portion": selection.total_cal,
                "image": selection.image
            }),
            
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Something went wrong");
            
        }
        

        console.log("plate entry added successfully:", data);
        return data;
    } catch (error) {
        console.error("Error adding plate entry:", error);
        return null;
    }
};

export const getUserPlates = async () => {
    const user = auth.currentUser;
    if (!user) {
        console.error("User is not authenticated");
        return null;
    }
    const uid = user.uid;
    try {
        const response = await axios.get(`http://127.0.0.1:8000/GetPlatesUser/${uid}`);
        return response.data.message.Plates; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching plates :', error);
        return null; // Return null or handle the error as needed
    }
};
export const updatePlate=async(data,plate_id)=>{
    try{
        const response = await axios.put(`http://127.0.0.1:8000/UpdatePlate/${plate_id}`,{...data,id_User: auth.currentUser.uid });
        return response.data
    }catch(error){
        console.error('Error updating plate by id: ', error);
        return null;
    }
}
export const deleteplate=async(plate_id)=>{
    try {
        await axios.delete(`http://127.0.0.1:8000/DeletePlate/${plate_id}`); 
    } catch (error) {
        console.error('Error deleting plate by ID:', error);
        return null; 
    }
}
export const fechDrinkTypes = async () =>{
    const user = auth.currentUser;
    if (!user) {
        console.error("User is not authenticated");
        return null;
    }
    const uid = user.uid;
    try {
        const response = await axios.get(`http://127.0.0.1:8000/getUserDrinkType/${uid}`);
        return response.data.message.drinkType; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching typedrinks :', error);
        return null; // Return null or handle the error as needed
    }
}
export const createDrinkType = async (selection) => {
    try {
        console.log(selection)
        const response = await fetch('http://127.0.0.1:8000/drinkType_log', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( {
                "name": selection.name,
                "id_user": auth.currentUser.uid,
            }),
            
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Something went wrong");
            
        }
        

        console.log("drink entry added successfully:", data);
        return data.drinkType_id;
    } catch (error) {
        console.error("Error adding drink entry:", error);
        return null;
    }
};
export const getUserDrinks = async () =>{
    const user = auth.currentUser;
    if (!user) {
        console.error("User is not authenticated");
        return null;
    }
    const uid = user.uid;
    try {
        const response = await axios.get(`http://127.0.0.1:8000/GetDrinks/${uid}`);
        return response.data.message.Drinks; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching typedrinks :', error);
        return null; // Return null or handle the error as needed
    }
}
export const createDrink = async (selection) => {
    try {
        console.log(selection)
        const response = await fetch('http://127.0.0.1:8000/drink_log', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( {
                "name": selection.name,
                "amount_sugar": selection.amount_sugar,
                "amount_cafeine": selection.amount_caffeine,
                "calories_portion": selection.calories_portion,
                "measure": selection.measure,
                "measure_portion": selection.measure_portion,
                "typeOfDrink": selection.typeOfDrink,
                "id_User": auth.currentUser.uid,
            }),
            
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Something went wrong");
            
        }
        

        console.log("drink entry added successfully:", data);
        return response.data.message.drinkType_id;
    } catch (error) {
        console.error("Error adding drink entry:", error);
        return null;
    }
};
export const deleteDrink=async(drink_id)=>{
    try {
        console.log(drink_id)
        await axios.delete(`http://127.0.0.1:8000/DeleteDrink/${drink_id}`); 
    } catch (error) {
        console.error('Error deleting plateFood by ID:', error);
        return null; 
    }
}
export const updateDrink = async (doc_id,data) => {

    try {
        console.log(doc_id,data)
        await axios.put(`http://127.0.0.1:8000/UpdateDrink/${doc_id}`,{...data,id_User: auth.currentUser.uid }); // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error updating drink by ID:', error);
        return null; // Return null or handle the error as needed
    }
};
export const deleteDrinkType = async (doc_id) => {
    try {
        await axios.delete(`http://127.0.0.1:8000/DeleteDrinkType/${doc_id}`); // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error deleting drinktype by ID:', error);
        return null; // Return null or handle the error as needed
    }
};
export const getDrinkByID = async (drink_id) => {
    const response = await axios.get(`http://127.0.0.1:8000/DrinkById/${drink_id}`);
    const drink=response.data.message.drink
    return drink

}
export const getPlateByID = async (plate_id) => {
    const response = await axios.get(`http://127.0.0.1:8000/GetPlateByID/${plate_id}`);
    const drink=response.data.message.plate
    return drink

}
