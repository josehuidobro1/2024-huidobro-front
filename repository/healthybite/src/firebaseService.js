import { collection, addDoc, getDocs } from "firebase/firestore";
import { auth, firestore } from "../src/firebaseConfig";
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export const fetchUserFoods = async (date) => {
    const queryUserFood = await getDocs(collection(firestore, 'UserFood'));
    const userFood = queryUserFood.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    .filter(doc => doc.id_User === auth.currentUser.uid && format(new Date(doc.date_ingested.seconds * 1000), 'yyyy-MM-dd') === date);
    
    return userFood;
};

export const fetchAllFoods = async () => {
    const queryFood = await getDocs(collection(firestore, 'Food'));
    return queryFood.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

export const addUserFood = async (selection, date, amount) => {
    const newData = {
        id_user_food: uuidv4(),
        id_Food: selection.id_food,
        id_User: auth.currentUser.uid,
        date_ingested: new Date(date),
        amount_eaten: Number(amount),
    };
    await addDoc(collection(firestore, 'UserFood'), newData);
    return newData;
};

export const addNewFood = async (newFood) => {
    await addDoc(collection(firestore, 'Food'), {
        name: newFood.name,
        id_Food: uuidv4(),
        measure: newFood.measure,
        measure_portion: Number(newFood.amount),
        calories_portion: Number(newFood.calories),
    });
};
