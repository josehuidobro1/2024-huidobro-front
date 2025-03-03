import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import Loading from '../../components/Loading'
import bgDrinks from '../../assets/bgDrinks.jpg'
import emptyDrink from '../../assets/emptyGlass.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NewDrink } from './components/NewDrink'
import DrinkItem from './components/DrinkItem'
import {fechDrinkTypes, getUserDrinks,getUserNotification,markNotificationAsRead} from '../../firebaseService'
import { drinkAchievments } from '../../components/AchivementsValidation'
import NotificationPopup from '../../components/NotificationPopup';
import { UserContext } from '../../App'

const drinks=[
    {
        name:'Fernet',
        type:'Alcohol',
        sugar:200,
        caffeine:300,
        calories:400
    }
]



export const Drinks = () => {
    const [loading, setLoading] = useState(true);
    const [drinksData, setDrinksData]=useState([])
    const [newDrink,setNewDrink]=useState(false)
    const [drinktypes, setDrinktypes] = useState([]);
    const {user_id}=useContext(UserContext)

    const fetchUserDrinks= async () => {
        const drinks = await getUserDrinks(user_id);
        if(drinks){
            drinkAchievments(user_id, drinks.length)
            setDrinksData(drinks);
            setLoading(false);
        }
        return drinks
    }

    const fetchUserDrinkTypes = async () => {
        const types = await fechDrinkTypes(user_id);
        fetchUserDrinks();
        setDrinktypes(types);
        return types
    };
    const handleUpdate=()=>{
        setLoading(true)
        const drink=fetchUserDrinks()
        drinkAchievments(user_id, drinks.length)

        drink && setLoading(false)

    }
    const handleDrinkTypeUpdate =()=>{
        setLoading(true)
        const types=fetchUserDrinkTypes()
        types && setLoading(false)
    }

    useEffect(()=>{
        setLoading(true)
        user_id && fetchUserDrinkTypes();
        
    },[user_id])

    return (
    <div className="h-screen w-full overflow-y-hidden">
        <NavBar />
        {loading ? <Loading />
        :
        <div className='mt-6 sm:mt-12 lg:mt-16 flex w-full justify-center sm:justify-start h-screen '>
            {window.innerWidth>'640' &&
            <div className='w-1/3 lg:w-1/5 flex items-start h-screen justify-center  '>
                <img src={bgDrinks} alt='Background image' className='object-cover w-full h-full'/>
            </div>}
            <div className='w-11/12 sm:w-2/3 lg:w-4/5 flex flex-col  sm:h-full pt-8 px-5 lg:p-8  overflow-y-auto'>
                <h1 className='text-3xl text-healthyDarkGreen font-belleza '>My own drinks</h1>
                <div className='w-full flex flex-col-reverse lg:flex-row justify-between items-center  lg:items-start mt-5 lg:h-full overflow-y-auto'>
                    {drinksData && drinksData.length >0 ?
                    <div className='w-full  lg:w-3/5 lg:mr-5 lg:pr-3  flex flex-col items-start max-h-[600px] pb-8  overflow-y-auto '>
                        {drinksData.map((item, index)=>
                                <DrinkItem key={index} drink={item} typeOfDrinks={drinktypes} handleUpdate={handleUpdate}/>
                        )}
                    </div>
                    :<div className='flex justify-center items-center flex-col w-2/3 h-2/3 mt-8 lg:mt-0'>
                        <img className='w-2/12 opacity-30' src={emptyDrink} alt='Empty glass'/>
                        <p className='font-quicksand font-bold text-sm mt-3 text-healthyGray1 text-center w-3/4'>There are no drinks&nbsp;created</p>
                    </div>}
                    <div className='w-full md:w-4/5 lg:w-2/5 flex flex-col justify-center'>
                        <button onClick={()=>setNewDrink(!newDrink)} className={`text-white text-md font-bold px-4 py-1 ${ newDrink ? 'rounded-t-lg' :'rounded-lg'} bg-healthyGray1 hover:bg-healthyDarkGray1 w-full `}><FontAwesomeIcon icon={faPlus} className='mr-2 '/>New drink</button>
                        {newDrink && <NewDrink setNewDrink={setNewDrink} handleUpdate={handleUpdate} drinktypes={drinktypes} handleDrinkTypeUpdate={handleDrinkTypeUpdate} setDrinksData={setDrinksData}/>}
                    </div>
                </div>
            </div>
        </div>}
        
    </div>
    )
}
