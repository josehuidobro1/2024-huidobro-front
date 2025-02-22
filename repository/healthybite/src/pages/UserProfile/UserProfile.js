import React,{useContext, useEffect, useState} from 'react'
import NavBar from '../../components/NavBar'
import userImg from '../../assets/userImg.jpg'
import { fetchUser } from '../../firebaseService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faTrophy, faArrowDown, faKey, faTrash, faBullseye, faDisease } from '@fortawesome/free-solid-svg-icons'; 
import Input from '../../components/Input'
import DataUser from './components/DataUser'
import {editUserData} from '../../firebaseService'
import { Link } from 'react-router-dom'
import {auth} from '../../firebaseConfig'
import PopUp from './components/PopUp'
import {handleInputChange} from '../inputValidation';
import Loading from '../../components/Loading'
import Goals from '../../components/Goals'
import AllergiePopUp from './components/AllergiePopUp'
import Data from '../Data'
import Achivement from './components/Achivement'
import { UserContext } from '../../App'



function UserProfile() {
    const [user, setUser]=useState()
    const achievements=Data.achievements
    const [surname, setSurname] = useState('');
    const [weight, setWeight] = useState('');
    const [birthDate, setBirthDate] = useState();
    const [height, setHeight] = useState('');
    const [name, setName] = useState('');
    const [inValidation,setInValidation]=useState(false)
    const [message, setMessage]=useState(false)
    const [edit, setEdit]=useState(false)
    const [deleteAc, setDeleteAc]=useState(false)
    const [loading, setLoading]=useState(true)
    const [openGoals, setOpenGoals]=useState(false)
    const [allergiePopUp,setAllergiePopUp]=useState(false)
    const [allergies, setAllergies]=useState(null)
    const {user_id}=useContext(UserContext)
    const [myachievements, setMyAchievements] = useState([]);
    const handleWeightChange = (e) => {
        handleInputChange(e.target.value, 0, 500, setWeight);
    };
    const handleHeightChange = (e) => {
        handleInputChange(e.target.value, 0, 500, setHeight);
    };

    const handleValidation = () => {
        setInValidation(true);
        const birthDateObj = new Date(birthDate);
        const today = new Date();
        
        if (birthDateObj >= today) {
            setMessage("Check the birth date");
            return; 
        }

        // If all validations pass
        setMessage("");
    }


    const getUser = async () => {
        try {
            const userData = await fetchUser(user_id);
            console.log("User Data ", userData)
            setUser(userData);
            setName(userData.name);
            setSurname(userData.surname);
            setMyAchievements(userData.achievements || []);
            setWeight(userData.weight);
            setHeight(userData.height);
            setAllergies(userData.allergies)
            // Store the date in ISO format
            const date = new Date(userData.birthDate);
            setLoading(false)
            setBirthDate(new Date(date).toISOString().split('T')[0]); // "YYYY-MM-DD" format
        } catch (e) {
            console.log("Error obtaining user data in UserProfile.js: ", e);
        }
    }
    

    const editUser = async () => {
        const data = {
            name: user.name,
            surname: user.surname,
            weight: user.weight,
            height: user.height,
            birthDate: user.birthDate,
            goals: user.goals,
            validation: user.validation,
            achievements: user.achievements,
            allergies: user.allergies,
        };
        try {
            await editUserData(user_id, data);
            console.log('User edited successfully in Firestore');
        } catch (err) {
            console.log('Error editing user: ' + err.message);
        }
    }

    const editGoals=async(userEdited)=>{
        setOpenGoals(false)
        if (JSON.stringify(user.goals) !== JSON.stringify(userEdited.goals)) {
            await editUserData(user_id, userEdited);
        }
        setUser(userEdited)
        
    }
    

    useEffect(()=>{
        user_id && getUser()
    },[user_id])

    const saveChanges=()=>{
        edit && editUser()
        setEdit(false)
    }  
    

  return (
    <div className={`w-full ${ loading ? 'bg-white' : 'bg-healthyBrown'} h-screen overflow-y-hidden`}>
        <NavBar/>
        {loading ? <Loading/> :
        <div className='w-full h-full lg:h-screen flex flex-col lg:flex-row justify-start  items-start overflow-y-auto  '>
            <div className='w-full z-10 flex flex-col  items-center justify-start mt-8 md:mt-28 lg:mt-28 overflow-y-auto mb-4  '>
                <div className=' w-11/12  flex items-center justify-between mb-4'>
                    <h1 className='text-xl xs:text-2xl font-belleza text-darkGray/90'>User profile</h1>
                </div>
                <div className='flex w-11/12  flex-row flex-wrap justify-center md:justify-around  items-center mb-3 font-quicksand text-white font-semibold text-sm gap-1 '>
                    <button onClick={edit ? saveChanges : ()=>setEdit(true)} className={`py-1  w-2/12 min-w-36 text-center  rounded-lg ${edit  ? 'bg-healthyGray1' : 'bg-healthyGreen'  }  ${ edit ?  'hover:bg-healthyDarkGray1' : 'hover:bg-healthyDarkGreen' }`}> <FontAwesomeIcon icon={edit  ?  faArrowDown : faPenToSquare} className='text-white text-md mr-2' />{edit ?  'Save changes' : 'Edit profile'}</button>
                    <button onClick={()=>setOpenGoals(true)} className='py-1  w-2/12 min-w-36 text-center   rounded-lg text-white bg-healthyYellow hover:bg-healthyDarkYellow cursor-pointer '><FontAwesomeIcon icon={faBullseye} className='mr-2 '  />My goals</button>
                    <button onClick={()=>setAllergiePopUp(true)} className='py-1  w-2/12 min-w-36 text-center   rounded-lg text-white bg-healthyBlue hover:bg-healthyDarkBlue cursor-pointer '><FontAwesomeIcon icon={faDisease} className='mr-2 '  />My allergies</button>
                    {!edit && <><Link to={`/resetPassword/${auth.currentUser?.accessToken}`}  className='bg-healthyOrange w-2/12 min-w-36 text-center  hover:bg-healthyDarkOrange  py-1 rounded-lg '><FontAwesomeIcon icon={faKey}  className='pr-2'/>Edit password</Link>
                    <button onClick={()=>setDeleteAc(true)} className='bg-healthyGray1 hover:bg-healthyDarkGray1 w-2/12 min-w-36 text-center  py-1 rounded-lg'><FontAwesomeIcon icon={faTrash} className='pr-2'/>Delete account</button></>}
                </div>
                <div className=' flex flex-col lg:flex-row justify-around items-center lg:items-start w-full lg:w-11/12 overflow-y-auto mb-8 '>
                    <div className='flex flex-wrap w-11/12 lg:w-1/3  font-quicksand '>
                        {edit ?

                        (user && <div className="flex flex-col  w-full px-2 md:max-h-[400px] overflow-y-auto">
                            <Input required={inValidation && name===''} label="Name" inputType="text" inputValue={name} placeholder={user.name} onChange={(e)=>setName(e.target.value)} />
                            <Input required={inValidation && surname===''} label="Surname" inputType="text" inputValue={surname} placeholder={user.surname} onChange={(e)=>setSurname(e.target.value)} />
                            <Input
                                required={inValidation && birthDate === ''}
                                label="Date of birth"
                                inputType="date"
                                inputValue={birthDate} // This should now be in "YYYY-MM-DD" format
                                onChange={(e) => setBirthDate(e.target.value)} // This will receive "YYYY-MM-DD"
                            />

                            <Input required={inValidation && weight===''} label="Weight" inputType="number" inputValue={weight} placeholder={user.weight} onChange={handleWeightChange}/>
                            {inValidation && weight < 0 && <p className='text-red-500 text-xs'>weight must be a positive number.</p>}
                            {inValidation && weight >= 500 && <p className='text-red-500 text-xs'>weight must be under 600kg.</p>}
                            <Input required={inValidation && height===''} label="Height" inputType="number" inputValue={height} placeholder={user.height} onChange={handleHeightChange}/>

                            {inValidation && height < 0 && <p className='text-red-500 text-xs'>height must be a positive number.</p>}
                            {inValidation && height >= 500 && <p className='text-red-500 text-xs'>height must under 600cm.</p>}
                        </div>)
                        :  (user && <div className="flex flex-wrap  w-full px-2  justify-around items-center">
                            <DataUser label="Name" value={name} />
                            <DataUser label="Surname" value={surname} />
                            <DataUser label="Date of birth" value={birthDate} />
                            <DataUser label="Weight" value={weight} />
                            <DataUser label="Height" value={height} />
                        </div>)
                        
                
                        }
                    </div>
                    <div className="grid grid-cols-2 mt-4 lg:mt-1 md:grid-cols-4 gap-2 w-11/12 lg:w-2/3  items-center justify-center mb-3 ">
                        {Object.keys(achievements).filter(id => user?.achievements?.includes(parseInt(id))).map((id) => {
                            const achievement = achievements[id];
                            return (
                                <Achivement key={id} name={achievement.name} subtitle={achievement.subtitle} complete={true} />
                            );
                        })}
                        {Object.keys(achievements).filter(id => !user?.achievements?.includes(parseInt(id))).map((id) => {
                            const achievement = achievements[id];
                            return (
                                <Achivement key={id} name={achievement.name} subtitle={achievement.subtitle} description={achievement.description} complete={false}/>
                            );
                        })}
                    </div>
                    {window.innerWidth<'540' &&
                    <div className='flex items-end justify-center w-full mt-3'    >
                        <img src={userImg} className='w-full h-full' />
                    </div>}
                </div>
            </div>
        </div>}
        {deleteAc &&
            <PopUp setDeleteAc={setDeleteAc} />
        }
        {
            openGoals &&
            <Goals user={user} setUser={setUser} editGoals={editGoals}/>
        }
        {
            allergiePopUp &&
            <AllergiePopUp userData={user} setAllergies={setAllergies} allergiePopUp={allergiePopUp} setAllergiePopUp={setAllergiePopUp} allergies={allergies}/>
        }
    </div>
  )
}

export default UserProfile