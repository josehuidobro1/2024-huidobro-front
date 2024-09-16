import React,{useEffect, useState} from 'react'
import NavBar from '../../components/NavBar'
import userImg from '../../assets/userImg.png'
import { fetchUser } from '../../firebaseService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faArrowDown } from '@fortawesome/free-solid-svg-icons'; 
import Input from '../../components/Input'
import DataUser from './components/DataUser'

function UserProfile() {
    const [user, setUser]=useState(null)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState();
    const [surname, setSurname] = useState('');
    const [weight, setWeight] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [height, setHeight] = useState('');
    const [name, setName] = useState('');
    const [inValidation,setInValidation]=useState(false)
    const [message, setMessage]=useState(false)
    const [edit, setEdit]=useState(false)

    const handleValidation=()=> {
        setInValidation(true);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage("Invalid email address");
            return; 
        }

        const birthDateObj = new Date(birthDate);
        const today = new Date();
        if (birthDateObj >= today) {
            setMessage("Check the birth date");
            return; 
        }

        if(password !== confirmPw) {
            setMessage("Passwords do not match")
            return 
        }

    }

    const getUser = async ()=>{
        try{
            const userData=await fetchUser()
            setUser(userData)
            setName(user.name)
            setSurname(user.surname)
            setWeight(user.weight)
            setHeight(user.height)
            setBirthDate(user.birthDate)
            setEmail(user.email)
        }catch(e){
            console.log("Eroor obtener datos de usuario UserProfile.js: ", e)
        }
    }

    useEffect(()=>{
        getUser()
    },[])

  return (
    <div className='w-full  bg-healthyBrown sm:h-screen overflow-y-auto md:overflow-y-hidden'>
        <NavBar/>
        <div className='w-full h-full sm:h-screen flex flex-col md:flex-row justify-between items-strech  '>
            <div className='w-full md:w-1/2 flex flex-col items-center  md:items-end justify-center mt-8 sm:mt-32 self-start'>
                <div className=' w-10/12 lg:w-2/3 flex items-center justify-between mb-5'>
                    <h1 className='text-xl xs:text-2xl font-belleza text-darkGray'>User profile</h1>
                    <button onClick={()=>setEdit(!edit)} className={`py-1 px-3 xs:px-5 rounded-lg ${edit ? 'bg-healthyOrange' : 'bg-healthyGreen'  } text-white font-quicksand text-sm xs:text-md font-semibold ${ edit ?  'hover:bg-healthyDarkOrange' : 'hover:bg-healthyDarkGreen' }`}> <FontAwesomeIcon icon={edit ?  faArrowDown : faPenToSquare} className='text-white text-lg mr-2' />{edit ?  'Save changes' : 'Edit profile'}</button>
                </div>
                <div className='flex flex-wrap w-10/12 lg:w-2/3 font-quicksand'>
            
                    
                    {edit ?
                    (user && <div className="flex flex-col  w-full px-2 md:max-h-[400px] overflow-y-auto">
                        <Input required={inValidation && name===''} label="Name" inputType="text" inputValue={name} placeholder={user.name} onChange={(e)=>setName(e.target.value)} />
                        <Input required={inValidation && surname===''} label="Surname" inputType="text" inputValue={surname} placeholder={user.surname} onChange={(e)=>setSurname(e.target.value)} />
                        <Input required={inValidation && email===''} label="Email" inputType="email" inputValue={email} placeholder={user.email} onChange={(e)=>setEmail(e.target.value)} />
                        <Input required={inValidation && birthDate===''} label="Date of birth" inputType="date" inputValue={birthDate} placeholder={new Date(user.birthDate)} onChange={(e)=>setBirthDate(e.target.value)} />
                        <Input required={inValidation && weight===''} label="Weight" inputType="number" inputValue={weight} placeholder={user.weight} onChange={(e) => setWeight(e.target.value)}/>
                        <Input required={inValidation && height===''} label="Height" inputType="number" inputValue={height} placeholder={user.height} onChange={(e) => setHeight(e.target.value)}/>
                        <Input required={inValidation && password===''} label="Password" inputType="password" inputValue={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <Input required={inValidation && confirmPw===''} label="Confirm password" inputType="password" inputValue={confirmPw} placeholder="Password" onChange={(e) => setConfirmPw(e.target.value)} />
                    </div>)
                    :
                    (user && <div className="flex flex-wrap  w-full px-2  justify-around items-center">
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
                <img src={userImg} />
            </div>
        </div>
    </div>
  )
}

export default UserProfile