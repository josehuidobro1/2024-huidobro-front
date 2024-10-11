import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import plateBG from '../../assets/plateBG.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faPlus, faUtensils} from '@fortawesome/free-solid-svg-icons'
import { PlateItem } from './components/PlateItem'
import { fetchAllFoods } from '../../firebaseService'
import Loading from '../../components/Loading'
import NewPlate from './components/NewPlate'
import {getUserPlates} from '../../firebaseService'
import { auth } from "../../firebaseConfig";

export const Plates = () => {

    const [plates, setPlates] = useState([]);
    const [options, setOption]=useState(false)
    const [foodData, setFoodData]=useState([])
    const [loading, setLoading]=useState(true)
    const [newPlate, setNewPlate]=useState(false)

    const fetchPlates = async () => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const plates = await getUserPlates();
                    setPlates(plates);
                } catch (err) {
                    console.log('Error al obtener las platos: ' + err);
                }
            }else{
                console.log('No user is signed in');
            }
            setLoading(false);
        })
        return () => unsubscribe();
    };

    const fetchFood=async ()=>{
        try {
            const food=await fetchAllFoods()
            setFoodData(food.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1))
            setLoading(false)
            
        }catch (e){
            console.log("Error fetching food data on Plate page ", e)
        }
    }

    useEffect(()=>{
        fetchPlates()
        fetchFood()
    },[])

  return (
    <div className='h-screen sm:h-full  overflow-y-hidden'>
        <NavBar/>
        {loading ? 
            <Loading />
        :<div className='flex flex-col-reverse md:flex-row justify-between items-center bg-healthyGray2  w-full h-screen overflow-y-auto md:overflow-y-hidden'>
            <div className='w-full md:w-4/5 lg:w-2/5 flex justify-end items-center md:items-end md:h-full'>
                <img src={plateBG} alt="Background image" className=' w-full' />
            </div>
            
            <div className='md:absolute top-0 left-0 overFlow-y-auto md:overflow-y-hidden md:h-screen w-full '>
                <div className='w-full md:h-screen flex justify-center md:justify-end items-start mt-8 md:mt-28 '>
                    <div className='flex flex-col md:flex-row w-full lg:w-2/3  md:h-full items-center  md:px-6 lg:px-0 md:items-start justify-center md:justify-end'>
                        <div className='flex md:h-full flex-col lg:mr-10 w-10/12 md:w-3/5 lg:w-2/4  ' >
                            <div className='flex flex-row justify-start md:justify-start items-center w-full '>
                                <p className='text-healthyDarkGray1 font-belleza text-3xl  '>My plates</p>
                            </div>
                            <div className='flex flex-col  font-quicksand text-darkGray items-start w-full lg:ml-12 '>
                                
                            {plates && plates.length > 0 ?
                            <div className='flex flex-col w-full md:w-11/12 justify-start items-start mt-8 md:max-h-[400px] md:overflow-y-auto'>
                                {plates.map((plate, index) => (
                                    <PlateItem plate={plate} key={index} foodData={foodData} />
                                ))}
                            </div>
                            :
                            <div className='w-full flex justify-center items-center h-2/3'>
                                <p className='text-xl font-quicksand text-left text-healthyDarkGray1'>There are not plates created yet</p>
                            </div>
}

                            </div>
                        </div>
                        <div className='flex flex-col items-start justify-start w-10/12 my-4  md:my-0 md:w-2/5 md:mr-2'>
                            <button onClick={()=>setNewPlate(!newPlate)} className={`text-white text-md font-bold px-4 py-1 ${ newPlate ? 'rounded-t-lg' :'rounded-lg'} bg-healthyGray1 hover:bg-healthyDarkGray1 w-full `}><FontAwesomeIcon icon={faPlus} className='mr-2 '/>New plate</button>
                            {newPlate && <NewPlate foodData={foodData} setPlates={setPlates}/>}
                        </div>
                    </div>
                </div>
                

            </div>
        </div>}
    </div>
  )
}
