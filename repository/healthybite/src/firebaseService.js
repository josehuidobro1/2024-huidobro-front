
import { convertFieldResponseIntoMuiTextFieldProps } from "@mui/x-date-pickers/internals";
import { auth, firestore } from "../src/firebaseConfig";
import { deleteUser, signOut } from 'firebase/auth';
import axios from "axios";

export const fetchUser=async()=>{
    try {
        const response = await axios.get(`http://127.0.0.1:8000/User/${auth.currentUser.uid}`);
        
        return response.data; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        return null; // Return null or handle the error as needed
    }
}

export const editUserData=async(data)=>{
    try {
        const response = await axios.put(`http://127.0.0.1:8000/update_user/${auth.currentUser.uid}`, data);
        
        return response.data; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error editing user data by ID:', error);
        return null; // Return null or handle the error as needed
    }
}

export const deleteUserAc=async()=>{
    try {
        await axios.delete(`http://127.0.0.1:8000/delete-user/${auth.currentUser.uid}`); // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        return null; // Return null or handle the error as needed
    }
}

export const resetPassword=async (data)=>{
    try{
        await fetch('http://localhost:8000/reset-password/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: data.token,  // Token actual del usuario
                new_password: data.newPassword
            })
        });
    } catch (error) {
        console.error('Error:', error);
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
        const response = await axios.get(`http://127.0.0.1:8000/Foods/${foodId}`);
        return response.data.message.food; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        return null; // Return null or handle the error as needed
    }
};
const userFoodMeals = async()=>{
    try {
        const response = await axios.get(`http://127.0.0.1:8000/mealUserDay/${auth.currentUser.uid}`);
        return response.data.message.foods; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        return null; // Return null or handle the error as needed
    }
}



export const fetchAllFoods = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/Foods/');
        console.log(response.data.message.food)
        return response.data.message.food; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching foods:', error);
        return []; // Return an empty array or handle the error as needed
    }
};


export const addUserFood = async (selection, date, amount) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/UserFood_log", {
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
        const response = await fetch("http://127.0.0.1:8000/Food_log", {
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
        await axios.delete(`http://127.0.0.1:8000/DeleteMealUser/${doc_id}`); // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        return null; // Return null or handle the error as needed
    }
};


export const editUserFood = async (doc_id,data) => {

    try {
        console.log(doc_id,data)
        await axios.put(`http://127.0.0.1:8000/UpdateUserFood/${doc_id}`,data); // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        return null; // Return null or handle the error as needed
    }
};

export const getCategories = async()=>{
    const uid=auth.currentUser.uid
    try {
        const response = await axios.get(`http://127.0.0.1:8000/GetCategoryUser/${uid}`);
        return response.data.message.categories; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching categories :', error);
        return null; // Return null or handle the error as needed
    }
}

export const createCategory =async (data)=>{
    const uid=auth.currentUser.uid
    try{
        const response = await axios.post(`http://127.0.0.1:8000/CreateCategory/`, {...data,id_User: uid });
        return response.data
    }catch(error){
        console.error('Error adding new category: ', error);
        return null;
    }
}

export const updateCategory=async(data,category_id)=>{
    try{
        const response = await axios.put(`http://127.0.0.1:8000/UpdateCategory/${category_id}`,{...data,id_User: auth.currentUser.uid });
        return response.data
    }catch(error){
        console.error('Error updating category by id: ', error);
        return null;
    }
}

export const deleteCategory=async(category_id)=>{
    try {
        await axios.delete(`http://127.0.0.1:8000/DeleteCategory/${category_id}`); 
    } catch (error) {
        console.error('Error deleting category by ID:', error);
        return null; 
    }
}

export const createTotCal = async (totCal, date) => {
    try {
        const validDate = date instanceof Date && !isNaN(date) ? date.toISOString() : new Date().toISOString(); // Fallback to current date if invalid

        const response = await fetch("http://127.0.0.1:8000/CreateTotCaloriesUser/", {
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
        await axios.put(`http://127.0.0.1:8000/UpdateTotCaloriesUser/${totcal_id}`,{ calUpdate: newTotCal }); 
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
export const getTotCalUser=async()=>{
    const uid=auth.currentUser.uid
    try {
        const response = await axios.get(`http://127.0.0.1:8000/GetTotCalUser/${uid}`);
        return response.data.message.totCals; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching categories :', error);
        return null; // Return null or handle the error as needed
    }



}

