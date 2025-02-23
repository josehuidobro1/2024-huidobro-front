import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteUserAc, fetchAllFoods, getAllergies } from '../../../firebaseService';
import { auth } from "../../../firebaseConfig";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import loader from '../../../assets/loader.gif'
import AllergieItem from './AllergieItem';
import AllergiesData from './AllergiesData';
import CreateAllergie from './CreateAllergie';
import { UserContext } from '../../../App';

export default function AllergiePopUp({allergiePopUp,setAllergiePopUp, allergies,setAllergies,userData}) {
    const navigate = useNavigate();
    const [food, setFood]=useState([])
    const [loading, setLoading]=useState(true)
    const [allergiesData, setAllergiesData]=useState([])
    const [option, setOption]=useState(0)
    const {user_id}=useContext(UserContext)

    const deleteAccount=async ()=>{
        try{
            await deleteUserAc(user_id)
            auth.signOut()
            navigate("/")
            setAllergiePopUp(false)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    
    const getData= async () => {
        try {
            const food = await fetchAllFoods();
            setFood(food);
            console.log('food, ',food)

            const allergieData= await getAllergies();
            setAllergiesData(allergieData)
            console.log('allergie Data' , allergieData)

            if(food && allergieData){
                setLoading(false)
            }
        } catch (e) {
            console.log("Error obtaining food data and allergies data in AllergiesPopUp.js: ", e);
        }
    }

    useEffect(()=>{
        if(allergiePopUp && food.length===0 ){
            setLoading(true)
            getData()
            console.log('allergie')
        }
    },[allergiePopUp])

  return (
    <div className="w-full h-screen absolute top-0 z-50 flex justify-center items-center bg-black/50">
        <div className="w-11/12 sm:w-full flex flex-col text-md font-quicksand text-darkGray font-semibold justify-center shadow-lg items-center max-w-[700px] bg-healthyDarkBlue rounded-2xl py-8 pt-4  relative">
            <div className='flex justify-between items-center w-11/12 my-3'>
                <p className='text-xl text-left font-bold text-white'>Allergies</p>
                <div className='flex items-center justify-end'>
                    <button onClick={()=>setAllergiePopUp(false)} className=' text-white text-2xl hover:text-white/70'><FontAwesomeIcon icon={faXmark} /></button>
                </div>
            </div>
            <div className='w-11/12 flex flex-col '>
                <div className='flex w-full justify-start items-center'>
                    <button onClick={()=>setOption(0)} className={`py-1 mr-1 px-3 rounded-t-lg ${option===0 ? 'bg-white': 'bg-white/60'} text-healthyDarkBlue font-semibold text-md  `}>Mine</button>
                    <button onClick={()=>setOption(1)} className={`py-1 mr-1 px-3 rounded-t-lg ${option===1 ? 'bg-white': 'bg-white/60'} text-healthyDarkBlue font-semibold text-md  `}>Register</button>
                    <button onClick={()=>setOption(2)} className={`py-1 px-3 rounded-t-lg ${option===2 ? 'bg-white': 'bg-white/60'} text-healthyDarkBlue font-semibold text-md  `}>Create</button>
                </div>
                <div className='w-full px-1 mr-2 max-h-400 overflow-y-auto rounded-b-lg rounded-tr-lg bg-white flex justify-center items-center  '>
                    {loading ?
                        <div className='flex w-1/3 justify-center items-center py-5'>
                            <img src={loader} alt='Loading...' className='w-full '/>
                        </div>
                    :
                        option===0 ?
                        <div className='flex flex-wrap justify-start items-start w-full  '>
                        {allergies.length>0 ?
                        allergies.map((item, index)=>(
                            <AllergieItem key={index} setAllergiesData={setAllergiesData}  id={item} allergies={allergies} setAllergies={setAllergies} userdata={userData} allergiesData={allergiesData}  food={food} />
                        )):
                        <div className='flex w-full justify-center items-center'>
                            <p className='text-healthyBlue/70 font-semibold text-sm px-3 py-5 '>You haven't uploaded your allergies&nbsp;yet</p>
                        </div>
                        }
                        </div>
                        : option===1 ?
                        <div className='flex flex-wrap justify-center items-start w-full p-1 '>
                        {allergiesData.filter(e=>!allergies.includes(e.id)).map((item, index)=>(
                            <AllergiesData key={index} id={item.id} allergies={allergies} allergiesData={allergiesData} setAllergies={setAllergies} name={item.name} userData={userData} food={(food.filter(i=>item.foods_ids.includes(i.id))).map(e=>e.name)} />
                        ))}
                        </div>
                        :
                        <CreateAllergie  food={food} setAllergiesData={setAllergiesData} allergiesData={allergiesData}/>
                    }    
                </div>            
            </div>
        </div>
    </div>
  )
}
