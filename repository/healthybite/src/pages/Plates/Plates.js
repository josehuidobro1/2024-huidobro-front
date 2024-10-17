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
import emptyPlate from '../../assets/emptyPlate.png'
import PopUpPlate from './components/PopUpPlates'
import { PickersSectionListSectionContent } from '@mui/x-date-pickers/PickersSectionList/PickersSectionList'

export const Plates = () => {
    const [addFood, setAddFood]=useState(false)
    const [plate, setPlate]=useState(null)
    const [plates, setPlates] = useState([]);
    const [options, setOption]=useState(false)
    const [foodData, setFoodData]=useState([])
    const [loading, setLoading]=useState(true)
    const [newPlate, setNewPlate]=useState(false)
    const [successMessage, setSuccessMessage] = useState('');
    const [selection , setSelection]=useState(null)

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
    const handleupdatePlates = ()=>{
        setLoading(true)
        const platesRecorded=fetchPlates()
        foodData.length>0 && platesRecorded && setLoading(false)
    }

    useEffect(()=>{
        if(plates.length>0 && selection){
        const platesEdited=plates.map(plateItem => plateItem.id===selection.plate ? {...plates.find((item)=>item.id===selection.plate), ingredients: selection.ingridients} : plateItem)
        setPlates(platesEdited);
        setSelection(null)
    }},[selection])

    useEffect(()=>{
        setLoading(true)
        const platesRecorded=fetchPlates()
        const foodRecorded=fetchFood()
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
                                        {successMessage && (
                                        <div className='text-healthyGreen mt-2  font-quicksand'>
                                            {successMessage}
                                        </div>
                                    )}
                                {plates.map((plate, index) => (
                                    <PlateItem plate={plate} key={index} foodData={foodData} handleupdatePlates={handleupdatePlates} setSuccessMessage={setSuccessMessage} setAddFood={setAddFood} setPlate={setPlate} selection={selection} />
                                ))}
                            </div>
                            :
                            <div className='flex justify-center items-center flex-col w-full my-5  md:mt-20 lg:w-2/3 h-full lg:mt-10'>
                                <img className='w-1/3 opacity-30' src={emptyPlate} alt='Empty plate'/>
                                <p className='font-quicksand font-bold text-sm mt-3 text-healthyGray1 text-center w-3/4'>There are no plates&nbsp;created</p>
                            </div>}
                            </div>
                        </div>
                        <div className='flex flex-col items-start justify-start w-10/12 my-4  md:my-0 md:w-2/5 md:mr-2'>
                            <button onClick={()=>setNewPlate(!newPlate)} className={`text-white text-md font-bold px-4 py-1 ${ newPlate ? 'rounded-t-lg' :'rounded-lg'} bg-healthyGray1 hover:bg-healthyDarkGray1 w-full `}><FontAwesomeIcon icon={faPlus} className='mr-2 '/>New plate</button>
                            {newPlate && <NewPlate foodData={foodData} setPlates={setPlates} plates={plates}/>}
                        </div>
                    </div>
                </div>
                

            </div>
        </div>}
        {addFood && <PopUpPlate plate={plate} foodData={foodData} setAddFood={setAddFood} setSelection={setSelection} />}
    </div>
  )
}
