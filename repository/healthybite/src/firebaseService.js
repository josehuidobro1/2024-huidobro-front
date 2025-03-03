
import { convertFieldResponseIntoMuiTextFieldProps } from "@mui/x-date-pickers/internals";
import { auth, firestore } from "../src/firebaseConfig";
import { getAuth, verifyPasswordResetCode, confirmPasswordReset, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import axios from "axios"; // para hacer solicitudes HTTP al servidor externo
import { onAuthStateChanged } from "firebase/auth";

const ruta='https://two024-huidobro-back.onrender.com'
//const ruta='http://127.0.0.1:8000'
let cachedUserUid = null;

export const getIdToken = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        throw new Error("No user is currently logged in.");
    }
    return await currentUser.getIdToken();
};

axios.interceptors.request.use(
    async (config) => {
        try{
            const token = await getIdToken();
            if (token ) {
                axios.defaults.headers.common['Authorization'] = `${token}`;
            }
            return config
        }catch(error){
            console.error("No token available:", error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const registerUser = async (email, password, name, surname, weight, height, birthDate)=>{
    try{
        const userCredential=await createUserWithEmailAndPassword(auth, email, password)
        await loginUser(email, password)
        const data= {
            id_user: userCredential.user.uid,  // ID único del usuario generado por Firebase Auth
            name: name,
            surname: surname,
            weight: weight ? parseFloat(weight) : 0,
            height: height ? parseFloat(height) : 0,
            birthDate: new Date(birthDate),
            goals:{
                calories:0,
                sodium:0,
                protein:0,
                carbohydrates:0,
                fats:0,
                sugar:0,
                caffeine:0,
            },
            validation: 0,
            achievements: [],
            allergies:[]
        }
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        await axios.post(`${ruta}/user/${userCredential.user.uid}`, data,{
            headers: {
                Authorization: `${token}`
            }
        });
        const user=await fetchUser(userCredential.user.uid)
        if(user){
            return userCredential.user.uid
        }
    }catch(error){
        throw error
    }
}

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await userCredential.user.getIdToken()
        return userCredential.user.uid;
    } catch (error) {
        throw error
    }
};

export const forgotPassword = async (email) => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        await sendPasswordResetEmail(auth, email);
        return "Reset email sent";
    } catch (error) {
        throw error.message;
    }
}

export const logoutUser = async () => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        await signOut(auth);
    } catch (error) {
        throw error.message;
    }
};

export const getUserUid = async () => {
    if (cachedUserUid) {
        return cachedUserUid;
    }
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                cachedUserUid = user.uid; // Cache the UID
                resolve(user.uid);
            } else {
                reject(new Error("No user is currently logged in."));
            }
        });
    });
};

export const fetchUser=async(user_id)=>{
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/User/${user_id}`,{
            headers: {
                Authorization: `${token}`
            }
        });
        return response.data.user; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        return null; // Return null or handle the error as needed
    }
}

export const editUserData=async(user_id, data)=>{
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.put(`${ruta}/update_user/${user_id}`, data, {
            headers: {
                Authorization: `${token}`
            }
        });
        console.log('Data que se envia para editar usuario: ', data)
        return response.data; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error editing user data by ID:', error);
        return null; // Return null or handle the error as needed
    }
}

export const deleteUserAc=async(user_id)=>{
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.delete(`${ruta}/delete_user/${user_id}`, {
            headers: {
                Authorization: `${token}`
            }
        }); 
        return response
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        return null; // Return null or handle the error as needed
    }
}

export const fetchUserFoods = async (user_id, date) => {
    const userFood = await userFoodMeals(user_id); // Wait for the promise to resolve
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
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/Foods/${foodId}`);
        return response.data.message.food; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        return null; // Return null or handle the error as needed
    }
};

const userFoodMeals = async(user_id)=>{
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/mealUserDay/${user_id}`, {
            headers: {
                Authorization: `${token}`
            }
        }); 
        return response.data.message.foods; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        return null; // Return null or handle the error as needed
    }
}



export const fetchAllFoods = async () => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/Foods/`, {
            headers: {
                Authorization: `${token}`
            }})
        return response.data.message.food; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching foods:', error);
        return []; // Return an empty array or handle the error as needed
    }
};


export const addUserFood = async (user_id,selection, date, amount) => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await fetch(`${ruta}/UserFood_log`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`
            },
            body: JSON.stringify( {
                "id_User": user_id,
                "id_Food": selection.id_food,
                "date_ingested": date.toISOString(),
                "amount_eaten": Number(selection.amount),
            }),
            
        });
        console.log(user_id,selection.id_food,date.toISOString(),Number(selection.amount))
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
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await fetch(`${ruta}/Food_log`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`
            },
            body: JSON.stringify( {
                "name": newFood.name,
                "calories_portion": Number(newFood.calories),
                "measure": newFood.measure,
                "measure_portion": Number(newFood.amount),
                "carbohydrates_portion":  Number(newFood.carbohydrate),
                "sodium_portion": Number(newFood.sodium),
                "fats_portion": Number(newFood.fat),
                "protein_portion": Number(newFood.protein)
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
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        await axios.delete(`${ruta}/DeleteMealUser/${doc_id}`, {
            headers: {
                Authorization: `${token}`
            }})
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        return null; // Return null or handle the error as needed
    }
};


export const editUserFood = async (doc_id,data) => {

    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        await axios.put(`${ruta}/UpdateUserFood/${doc_id}`,data, {
            headers: {
                Authorization: `${token}`
            }}) // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        return null; // Return null or handle the error as needed
    }
};

export const getCategories = async(user_id)=>{
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/GetCategoryUser/${user_id}`, {
            headers: {
                Authorization: `${token}`
            }})
        return response.data.message.categories; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching categories :', error);
        return null; // Return null or handle the error as needed
    }
}

export const getDefaultCategories = async () => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/GetCategoryUser/default`, {
            headers: {
                Authorization: `${token}`
            }})
        return response.data.message.categories; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching default categories:', error);
        return null; // Return null or handle the error as needed
    }
};

export const getBarCategory = async () => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
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



export const createCategory =async (user_id, data)=>{
    try{
        const token = await getIdToken();
        const response = await axios.post(`${ruta}/CreateCategory/`, {...data,id_User: user_id }, {
            headers: {
                Authorization: `${token}`
            }})
        return response.data
    }catch(error){
        console.error('Error adding new category: ', error);
        return null;
    }
}

export const updateCategory=async(user_id, data,category_id)=>{
    try{
        const token = await getIdToken();
        const response = await axios.put(`${ruta}/UpdateCategory/${category_id}`,{...data,id_User: user_id }, {
            headers: {
                Authorization: `${token}`
            }})
        return response.data
    }catch(error){
        console.error('Error updating category by id: ', error);
        return null;
    }
}
export const updateCategoryDefault=async(data,category_id)=>{
    try{
        const token = await getIdToken();
        const response = await axios.put(`${ruta}/UpdateCategory/${category_id}`,{...data,id_User: 'default' }, {
            headers: {
                Authorization: `${token}`
            }})
        return response.data
    }catch(error){
        console.error('Error updating category by id: ', error);
        return null;
    }
}

export const deleteCategory=async(category_id)=>{
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        await axios.delete(`${ruta}/DeleteCategory/${category_id}`, {
            headers: {
                Authorization: `${token}`
            }})

    } catch (error) {
        console.error('Error deleting category by ID:', error);
        return null; 
    }
}

export const createTotCal = async (user_id, data, date) => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const validDate = date instanceof Date && !isNaN(date) ? date.toISOString() : new Date().toISOString(); // Fallback to current date if invalid
        const response = await fetch(`${ruta}/CreateTotCaloriesUser/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`
            },
            body: JSON.stringify({
                "id_user": user_id,
                "day": validDate, // Using the valid date here
                "totCal": data.calories,
                "totProt": data.protein,
                "totSodium": data.sodium,
                "totCarbs": data.carbs,
                "totFats": data.fat,
            }),
        });

        // Await response.json() before referencing 'data'
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.detail || "Something went wrong");
        }

        console.log("Calories entry added successfully:", responseData);
        return responseData;
    } catch (error) {
        console.error("Error adding calories entry:", error);
        return null;
    }
};



export const UpdateTotCal = async (user_id, totcal_id, data, date) => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        // Ensure the date is in the correct format
        const validDate = date instanceof Date && !isNaN(date) ? date.toISOString() : new Date().toISOString(); // Fallback to current date if invalid
        const payload = {
            id_user: user_id,
            day: validDate,   // Using "day" instead of "date" to match the model
            totCal: data.calories,
            totProt: data.protein,
            totSodium: data.sodium,
            totCarbs: data.carbs,
            totFats: data.fat,
        };

        console.log("Payload:", payload); // Log to confirm structure before sending

        // Send the request
        await axios.put(`${ruta}/UpdateTotCaloriesUser/${totcal_id}`, payload, {
            headers: {
                Authorization: `${token}`
            }});
    } catch (error) {
        console.error('Error updating total calories:', error);
        return null; // Return null or handle the error as needed
    }
};

export const fetchTotCalByDay = async (user_id, date) => {
    const userTotCal = await getTotCalUser(user_id); // Wait for the promise to resolve
    
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

export const getCategoriesAndDefaults = async (user_id) => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const categories = await Promise.all([
            getCategories(user_id),
            getDefaultCategories()
        ]);
        return categories.flat();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const getCaloriesByCategories= ( userCalories, categories, foods, barFood, drinks, plates)=>{
   try{
        
        const result = userCalories.map(item => {
            let foodDetail = foods.find(food => food.id === item.id_Food) || barFood.find(food => food.id === item.id_Food) || drinks.find(e=>item.id_Food===e.id) || plates.find(plate=> plate.id === item.id_Food) ;
            if (foodDetail) {
                return {
                    id_Food: item.id_Food,
                    calories: Number((item.amount_eaten * (foodDetail.calories_portion || foodDetail?.calories || 0 )) / (foodDetail.measure_portion || 1)),
                    fats: Number((item.amount_eaten * (foodDetail.fats_portion || foodDetail?.fats || 0 )) / (foodDetail.measure_portion || 1)),
                    sodium: Number((item.amount_eaten * (foodDetail.sodium_portion || foodDetail?.sodium || 0 )) / (foodDetail.measure_portion || 1)),
                    carbohydrates: Number((item.amount_eaten * (foodDetail.carbohydrates_portion || foodDetail?.carbohydrates || 0 )) / (foodDetail.measure_portion || 1)),
                    protein: Number((item.amount_eaten * (foodDetail.protein_portion || foodDetail?.protein || 0 )) / (foodDetail.measure_portion || 1))
                };
            }else{
                return {
                    id_Food: item.id_Food, 
                    calories:0,
                    sodium:0,
                    carbohydrates:0,
                    fats:0,
                    protein:0
                }

            }
        })

        if (result.length === 0) {
            return { categories: [], total: 0 };
        } 

        const calories = result.reduce((acc,value)=>acc+value.calories, 0) 
        const sodium = result.reduce((acc,value)=>acc+value.sodium, 0) 
        const carbohydrates = result.reduce((acc,value)=>acc+value.carbohydrates, 0) 
        const fats = result.reduce((acc,value)=>acc+value.fats, 0) 
        const protein = result.reduce((acc,value)=>acc+value.protein, 0) 
        // divide calories by categories
        const getCalories = categories.map(cat => {
            const cals = result.filter(food => cat.foods.includes(food.id_Food)).reduce((acc, item) => acc + Number(item.calories), 0);
            return { label: cat.name, value: cals };
        });

        const caloriesInCat = getCalories.reduce((acc, value) => acc + value.value, 0);
        if (caloriesInCat < calories) {
            getCalories.push({ label: 'Others', value: calories - caloriesInCat });
        }


        return {categories:getCalories, calories: calories, fats: fats, sodium: sodium, carbohydrates: carbohydrates, protein: protein, }
    }catch(error){
        console.log('Error fetching calories by categories: ', error)
        return []
    }
}

export const getTotCalUser=async(user_id)=>{
    if(user_id){try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/GetTotCalUser/${user_id}`, {
            headers: {
                Authorization: `${token}`
            }});
        return response.data.message.totCals; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching categories :', error);
        return null; // Return null or handle the error as needed
    }}else{
        console.log('no se encuentra el usuario')
    }
}

export const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0'); // Asegura que el día tenga 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por eso sumamos 1
    const year = date.getFullYear(); // Obtiene el año completo

    return `${day}/${month}/${year}`; // Retorna la fecha en formato dd/mm/yyyy
};

export const getFilterData = async (user_id) => {
    try{
        const token = await getIdToken();
        const [userCalories,foods, barFoods, categories, drinksType,drinks, plates, user ] = await Promise.all([ userFoodMeals(user_id), fetchAllFoods(), getProducts(), getCategoriesAndDefaults(user_id), await fechDrinkTypes(user_id), getUserDrinks(user_id), getUserPlates(user_id), fetchUser(user_id)])
        userCalories.sort((a, b) => new Date(a.date_ingested) - new Date(b.date_ingested));
        const groupedByDate = userCalories.reduce((acc, current) => {
            const date = formatDate(new Date(current.date_ingested)); // Solo tomar la fecha sin la hora
            // Si la fecha ya existe en el objeto agrupado, se agregan los foods
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push({
                id_Food: current.id_Food,
                amount_eaten: current.amount_eaten
            });
            
            return acc;
        }, {});
        const resultArray = Object.keys(groupedByDate).map(date => ({
            date,
            foods: groupedByDate[date]
        }));
        let caloriesByCat 
        const calPerCat = resultArray.map((item) => {
            if (item.foods.length === 0) {
                return null; 
            }
            
            caloriesByCat = getCaloriesByCategories(item.foods, categories, foods, barFoods, drinks, plates.map(item=> {return {...item, measure_portion: 1}}));
            if (caloriesByCat) {
                return { ...caloriesByCat, day: item.date };
            } else {
                return null;
            }
        });
        const drinksData=[]
        userCalories.forEach((item)=>{
            const drinkConsumed=drinks.find(e=>item.id_Food===e.id) 
            drinkConsumed && drinksData.push({
                date_ingested:item.date_ingested,
                name:drinkConsumed.name,
                sugar:(item.amount_eaten * drinkConsumed.sugar_portion)/ drinkConsumed.measure_portion ,
                caffeine: (item.amount_eaten * drinkConsumed.caffeine_portion )/ drinkConsumed.measure_portion ,
                calories:(item.amount_eaten * drinkConsumed.calories_portion )/ drinkConsumed.measure_portion,
                type: drinksType.find(drinkType=> drinkType.id===drinkConsumed.typeOfDrink).name
            })
        })
        return {calories: calPerCat, drinks: drinksData, goals:user.goals};
    }catch(e){
        console.log("Error fetching data for fitell in dashboard", e)
        return []
    }
}

export const resetPassword = async (oobCode, newPassword) => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
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
    const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
    const response = await axios.get(`${ruta}/products/`,{
        headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`
            },
    });
    return response.data.products ? response.data.products : [];
}

export const editCalories=async(id,calories)=>{
    const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
    await axios.put(`${ruta}/products/${id}/calories/${calories}`, {}, {
        headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`
            },
    });

}
export const getProdByID= async(prod_id)=>{
    const token = await getIdToken()
    if( !token){
        throw new Error ('Token not found')
    }
    const response = await axios.get(`${ruta}/products/${prod_id}`, {
        headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`
            },
    });
    const food=response.data.product
    return food
}


// things that need to be deployed
export const createplate = async (user_id, selection) => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await fetch(`${ruta}/CreatePlate/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`
            },
            body: JSON.stringify( {
                "id_User": user_id,
                "ingredients": selection.ingredients,
                "name": selection.name,
                "calories_portion": selection?.calories_portion || 0,
                "sodium_portion": selection?.sodium_portion || 0,
                "carbohydrates_portion": selection?.carbohydrates_portion || 0,
                "protein_portion": selection?.protein_portion || 0,
                "fats_portion": selection?.fats_portion || 0,
                "image": selection.image,
                "public": selection.public,
                "verified": selection.verified
            }),
            
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Something went wrong");
            
        }
        

        console.log("plate entry added successfully:", data);
        return data.id;
    } catch (error) {
        console.error("Error adding plate entry:", error);
        return null;
    }
};

export const getUserPlates = async (user_id) => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/GetPlatesUser/${user_id}`, {
            headers: {
                Authorization: `${token}`
            }});
        return response.data.message.Plates; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching plates :', error);
        return null; // Return null or handle the error as needed
    }
};
export const updatePlate=async(data,plate_id)=>{
    try{
        const token = await getIdToken();
        const response = await axios.put(`${ruta}/UpdatePlate/${plate_id}`,data, {
            headers: {
                Authorization: `${token}`
            }});

        return response.data
    }catch(error){
        console.error('Error updating plate by id: ', error);
        return null;
    }
}
export const deleteplate=async(plate_id)=>{
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        await axios.delete(`${ruta}/DeletePlate/${plate_id}`, {
            headers: {
                Authorization: `${token}`
            }});

    } catch (error) {
        console.error('Error deleting plate by ID:', error);
        return null; 
    }
}
export const fechDrinkTypes = async (user_id) =>{
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/getUserDrinkType/${user_id}`, {
            headers: {
                Authorization: `${token}`
            }});

        return response.data.message.drinkType; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching typedrinks :', error);
        return null; // Return null or handle the error as needed
    }
}
export const createDrinkType = async (user_id, selection) => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await fetch(`${ruta}/drinkType_log`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`
            },
            body: JSON.stringify( {
                "name": selection.name,
                "id_user": user_id,
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
export const getUserDrinks = async (user_id) =>{
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/GetDrinks/${user_id}`,{
            headers: {
                Authorization: `${token}`
            }});
        return response.data.message.Drinks; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error fetching typedrinks :', error);
        return null; // Return null or handle the error as needed
    }
}
export const createDrink = async (user_id, selection) => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await fetch(`${ruta}/drink_log`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`
            },
            body: JSON.stringify( {
                "name": selection.name,
                "sugar_portion": selection.sugar_portion,
                "caffeine_portion": selection.caffeine_portion,
                "calories_portion": selection.calories_portion,
                "measure": selection.measure,
                "measure_portion": selection.measure_portion,
                "typeOfDrink": selection.typeOfDrink,
                "id_User": user_id,
            }),
            
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Something went wrong");
            
        }

        console.log('RESPONSEEEE , ', response)
        
        return response;
    } catch (error) {
        console.error("Error adding drink entry:", error);
        return null;
    }
};
export const deleteDrink=async(drink_id)=>{
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        await axios.delete(`${ruta}/DeleteDrink/${drink_id}`,{
            headers: {
                Authorization: `${token}`
            }});

    } catch (error) {
        console.error('Error deleting plateFood by ID:', error);
        return null; 
    }
}
export const updateDrink = async (user_id, doc_id,data) => {

    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        await axios.put(`${ruta}/UpdateDrink/${doc_id}`,{...data,id_User: user_id },{
            headers: {
                Authorization: `${token}`
            }});
    } catch (error) {
        console.error('Error updating drink by ID:', error);
        return null; // Return null or handle the error as needed
    }
};
export const deleteDrinkType = async (doc_id) => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        await axios.delete(`${ruta}/DeleteDrinkType/${doc_id}`,{
            headers: {
                Authorization: `${token}`
            }});
    } catch (error) {
        console.error('Error deleting drinktype by ID:', error);
        return null; // Return null or handle the error as needed
    }
};
export const getDrinkByID = async (drink_id) => {
    try{
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/DrinkById/${drink_id}`,{
        headers: {
            Authorization: `${token}`
        }});

        const drink=response.data.message.drink
        console.log("drink", drink)
        return drink
    }catch (error){
        console.error('Error getDrinkByID :' ,error)
        return error
    }

}

export const getPlate_ByID = async (plate_id) => {
    try{
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/GetPlateByID/${plate_id}`,{
        headers: {
            Authorization: `${token}`
        }});

        const drink=response.data.message.plate
        return drink
    }catch(error){
        console.error('Error getPlate_ByID :' ,error)
        return error
    }
}

export const getGroupedDrinkTypes = async (user_id) => {
    try{
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/getUserGroupDrinkType/${user_id}`,{
        headers: {
            Authorization: `${token}`
        }});

    const drink=response.data.Drinks
    return drink
}catch(error){
    console.error('Error getGroupedDrinkTypes :' ,error)
    return error
}
}

export const getPublicPlates = async () => {
    try{
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/GetPlatePublicPlates/`,{
        headers: {
            Authorization: `${token}`
        }});

        const plates = response.data.Plates
        return plates
    }catch(error){
        console.error('Error getPublicPlates :' ,error)
        return error
    }
}
export const PlateReviews = async () => {
    try{
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/PlateReviews/`,{
        headers: {
            Authorization: `${token}`
        }});

        const review = response.data.Review
        return review
    }catch(error){
        console.error('Error PlateReviews :' ,error)
        return error
    }
}

export const updateComments = async (doc_id, data) => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        console.log("Updating comments:", { doc_id, data });
        const response = await axios.put(`${ruta}/UpdateReview/${doc_id}`, data,{
        headers: {
            Authorization: `${token}`
        }});

        // Return success or handle response as needed
        return response.data;
    } catch (error) {
        console.error('Error updating review by ID:', error.response ? error.response.data : error.message);
        return null; // Return null or handle the error as needed
    }
};
export const createReview = async (selection) => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        console.log(selection)
        const response = await fetch(`${ruta}/newReview`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`
            },
            body: JSON.stringify( {
                "plate_Id": selection.id_plate,
                "comments": selection.comments,
                "score": selection.score,
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

export const getstreak = async (user_id) => {
    const token = await getIdToken()
    if( !token){
        throw new Error ('Token not found')
    }
    const response = await axios.get(`${ruta}/Streak/${user_id}`,{
        headers: {
            Authorization: `${token}`
        }});

    const streak = response.data.message
    return streak
}
export const getUserNotification = async (user_id) => {
    const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
    const response = await axios.get(`${ruta}/getUserNotifications/${user_id}`,{
        headers: {
            Authorization: `${token}`
        }});

    const notifications = response.data.notifications
    return notifications
}
export const markNotificationAsRead = async (doc_id) => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        console.log("Updating comments:", { doc_id });
        const response = await axios.delete(`${ruta}/markNotificationAsRead/${doc_id}`,{
            headers: {
                Authorization: `${token}`
            }});
        
        console.log("Server response:", response);


        return;
    } catch (error) {
        console.error('Error updating review by ID:', error.response ? error.response.data : error.message);
        return null; // Return null or handle the error as needed
    }
};
export const getPlatesNotUser = async (user_id) => {
    try{
        const token = await getIdToken();
        const response = await axios.get(`${ruta}/PublicplatesNotFromUser/${user_id}`,{
            headers: {
                Authorization: `${token}`
            }});

        const plates = response.data.Plates
        return plates
    }catch(error){
        console.error("error getynd plates not User getPlatesNotUser() ", error)
    }
}
export const addGoal = async (user_id,goal_id) => {
    const response = await axios.get(`${ruta}/addGoal/${user_id}`, {
        params: { goal_id }
    });
    return response;
}



export const getAllergies = async () => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/allergies`,{
            headers: {
                Authorization: `${token}`
            }});

        console.log(response.data.message.allergies)
        return response.data.message.allergies;
    } catch (error) {
        console.error('Error fetching allergies data:', error);
        return []; 
    }
};

export const createAllergy =async (data)=>{
    try{
        const token = await getIdToken();

        const response = await axios.post(`${ruta}/allergie/`, data,{
            headers: {
                Authorization: `${token}`
            }});

        return response.data
    }catch(error){
        console.error('Error adding new allergy: ', error);
        return null;
    }
}

export const editAllergie=async(data)=>{
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.put(`${ruta}/allergie/${data.id}`, {name:data.name, foods_ids:data.foods_ids},{
            headers: {
                Authorization: `${token}`
            }});

        
        return response.data; // Adjust this based on your backend response structure
    } catch (error) {
        console.error('Error editing allergie by ID:', error);
        return null; // Return null or handle the error as needed
    }
}

export const getSchedule=async(user_id)=>{
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.get(`${ruta}/schedule/${user_id}`,{
            headers: {
                Authorization: `${token}`
            }});

        return response.data.schedules;
    } catch (error) {
        console.error('Error fetching schedule data:', error);
        return []; 
    }
}

export const editSchedule=async(id,data)=>{
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        const response = await axios.put(`${ruta}/schedule/${id}`,data,{
            headers: {
                Authorization: `${token}`
            }});

        return response.data; 
    } catch (error) {
        console.error('Error editing schedule by ID:', error);
        return null;
    }
}

export const createSchedule =async (data)=>{
    try{
        const token = await getIdToken();
        const response = await axios.post(`${ruta}/schedule/`, data,{
            headers: {
                Authorization: `${token}`
            }});

        return response.data.schedules
    }catch(error){
        console.error('Error adding new schedule: ', error);
        return null;
    }
}

export const deleteSchedule = async (user_id) => {
    try {
        const token = await getIdToken()
        if( !token){
            throw new Error ('Token not found')
        }
        await axios.delete(`${ruta}/schedule/${user_id}`,{
            headers: {
                Authorization: `${token}`
            }});
    } catch (error) {
        console.error('Error deleting schedule by ID:', error);
        return null; // Return null or handle the error as needed
    }
};