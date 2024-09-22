import React,{useEffect, useState} from 'react'
import NavBar from '../../components/NavBar'
import userImg from '../../assets/userImg.png'
import { fetchUser } from '../../firebaseService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faArrowDown, faKey, faTrash } from '@fortawesome/free-solid-svg-icons'; 
import Input from '../../components/Input'
import DataUser from './components/DataUser'
import {editUserData} from '../../firebaseService'
import { Link } from 'react-router-dom'
import {auth} from '../../firebaseConfig'
import PopUp from './components/PopUp'

function UserProfile() {
    const [user, setUser]=useState(null)
    const [surname, setSurname] = useState('');
    const [weight, setWeight] = useState('');
    const [birthDate, setBirthDate] = useState();
    const [height, setHeight] = useState('');
    const [name, setName] = useState('');
    const [inValidation,setInValidation]=useState(false)
    const [message, setMessage]=useState(false)
    const [edit, setEdit]=useState(false)
    const [deleteAc, setDeleteAc]=useState(false)

    const handleValidation=()=> {
        setInValidation(true);

        const birthDateObj = new Date(birthDate);
        const today = new Date();
        if (birthDateObj >= today) {
            setMessage("Check the birth date");
            return; 
        }


    }

    const getUser = async ()=>{
        try{
            const userData=await fetchUser()
            setUser(userData)
            setName(userData.name)
            setSurname(userData.surname)
            setWeight(userData.weight)
            setHeight(userData.height)
            const date=new Date(userData.birthDate)
            setBirthDate(date.toLocaleDateString())
        }catch(e){
            console.log("Eroor obtener datos de usuario UserProfile.js: ", e)
        }
    }

    const editUser=async ()=>{
        const data={
            ...user,
            birthDate:birthDate,
            height:height,
            name:name,
            surname:surname,
            weight:weight
        }
        try {
            await editUserData(data); 
            console.log('Usuerio editado de User > Firestore con éxito');
        } catch (err) {
            console.log('Error al editar usuario: ' + err.message);
        }
    }

    useEffect(()=>{
        getUser()
    },[])

    const saveChanges=()=>{
        edit && editUser()
        setEdit(false)
    }

  return (
    <div className='w-full  bg-healthyBrown sm:h-screen overflow-y-auto md:overflow-y-hidden'>
        <NavBar/>
        <div className='w-full h-full sm:h-screen flex flex-col md:flex-row justify-between items-strech  '>
            <div className='w-full md:w-1/2 flex flex-col items-center  md:items-end justify-center mt-8 sm:mt-32 self-start'>
                <div className=' w-10/12 lg:w-2/3 flex items-center justify-between mb-3'>
                    <h1 className='text-xl xs:text-2xl font-belleza text-darkGray'>User profile</h1>
                </div>
                <div className='flex w-10/12 lg:w-2/3  flex-row flex-wrap justify-around items-center mb-3 font-quicksand text-white font-semibold text-sm '>
                    <button onClick={edit ? saveChanges : ()=>setEdit(true)} className={`py-1 px-3 mb-1 xs:px-5 mr-1 rounded-lg ${edit  ? 'bg-healthyGray1' : 'bg-healthyGreen'  }  ${ edit ?  'hover:bg-healthyDarkGray1' : 'hover:bg-healthyDarkGreen' }`}> <FontAwesomeIcon icon={edit  ?  faArrowDown : faPenToSquare} className='text-white text-md mr-2' />{edit ?  'Save changes' : 'Edit profile'}</button>
                    {!edit && <><Link to={`/resetPassword/${auth.currentUser?.accessToken}`}  className='bg-healthyOrange hover:bg-healthyDarkOrange px-3 mb-1  py-1 rounded-lg '><FontAwesomeIcon icon={faKey}  className='pr-2'/>Edit password</Link>
                    <button onClick={()=>setDeleteAc(true)} className='bg-healthyGray1 hover:bg-healthyDarkGray1 px-3 mb-1 py-1 rounded-lg  ml-1 '><FontAwesomeIcon icon={faTrash} className='pr-2'/>Delete account</button></>}
                </div>
                <div className='flex flex-wrap w-10/12 lg:w-2/3 font-quicksand'>
            
                    
                    {edit ?

                    (user && <div className="flex flex-col  w-full px-2 md:max-h-[400px] overflow-y-auto">
                        <Input required={inValidation && name===''} label="Name" inputType="text" inputValue={name} placeholder={user.name} onChange={(e)=>setName(e.target.value)} />
                        <Input required={inValidation && surname===''} label="Surname" inputType="text" inputValue={surname} placeholder={user.surname} onChange={(e)=>setSurname(e.target.value)} />
                        <Input required={inValidation && birthDate===''} label="Date of birth" inputType="date" inputValue={birthDate} placeholder={new Date(user.birthDate)} onChange={(e)=>setBirthDate(e.target.value)} />
                        <Input required={inValidation && weight===''} label="Weight" inputType="number" inputValue={weight} placeholder={user.weight} onChange={(e) => setWeight(e.target.value)}/>
                        <Input required={inValidation && height===''} label="Height" inputType="number" inputValue={height} placeholder={user.height} onChange={(e) => setHeight(e.target.value)}/>
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
            </div>
            <div className='w-full h-72 sm:h-screen sm:w-2/3 md:w-1/2 self-end '>
                <img src={userImg} alt='Background image photo' />
            </div>
        </div>
        {deleteAc &&
            <PopUp setDeleteAc={setDeleteAc} />
        }
    </div>
  )
}

export default UserProfile