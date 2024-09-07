import React, {useState} from "react";
import loginImg from '../../assets/login.png'
import loginMobile from '../../assets/loginMobile.png'
import Input from "../../components/Input";
import Data from "../Data";
import axios from 'axios';
import { Link,  } from 'react-router-dom';
import { getAuth, signInWithPopup,currentUser,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore,collection, addDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

function Login() {
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    }
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
    const firestore =getFirestore(app)
    const [inValidation,setInValidation]=useState(false)
    const [signUp, setSignUp]=useState(false)
    const [message, setMessage]=useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [surname, setSurname] = useState('');
    const [weight, setWeight] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [height, setHeight] = useState('');
    const [name, setName] = useState('');
    const [infoOk, setInfoOk]=useState(false);
    const [forgot, setForgot]=useState(false);
    console.log(email)
    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
          await sendPasswordResetEmail(auth, email);
          setMessage('Correo de restablecimiento enviado!');
        } catch (error) {
          setMessage('Error al enviar el correo: ' + error.message);
        }
      };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleValidation();
        try {
            // 1. Registrar al usuario en Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(userCredential.user)
      
            // 2. Agregar el nuevo usuario a la colección "User" en Firestore
            await addDoc(collection(firestore, 'User'), {
              id_user: user.uid,  // ID único del usuario generado por Firebase Auth
              name: name,
              surname: surname,
              weight: weight,
              height: height,
              birthDate: birthDate
            });
      
            console.log('Usuario registrado y agregado a Firestore:', user.uid);
          } catch (error) {
            console.error('Error al registrar usuario o agregar a Firestore:', error);
          }

          console.log("hola")
    };
    

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Inicio de sesión exitoso:', userCredential.user);
          } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }}

    return (
        <div className=" bg-healthyGray h-screen flex justify-center items-center bg-healthyGray ">
            {window.innerWidth<640 ? 
            <img src={loginMobile} alt="Login" className=" h-full w-full z-0 relative object-cover" />
            :
            <img src={loginImg} alt="Login" className="w-full h-full z-0 relative object-cover" />
            }
            <div className={`bg-healthyGray w-full sm:w-2/5 lg:w-2/5 xl:w-5/12 absolute flex  sm:left-20 lg:left-40 top-64 flex-col  ${signUp ? ' sm:top-12 md:top-20 xl:top-12':'  sm:top-40'} `} >
                <div className={`flex  h-full  sm:mt-0 w-3/5 px-12 xs:px-16 sm:px-0   w-full flex-col `}>
                    <h1 className= {`font-belleza text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-darkGray ${forgot ? 'text-center':'text-left'}`}>Healthy Bite</h1>
                    {signUp ? (
                        <div classname='  w-full '>
                            <div className="sm:mt-6 flex flex-col bg-healthyGray w-full sm:max-h-[580px] md:max-h-[550px]    lg:max-h-[500px] xl:max-h-[550px] sm:overflow-y-auto  lg:max-w-[400px] ">
                                <div className="flex w-full bg-healthyGray sm:sticky sm:top-0">
                                    <button onClick={()=>setSignUp(false)} className="font-quicksand  bg-healthyGreen p-2   w-full rounded-xl  text-white font-semibold my-4 hover:bg-healthyDarkGreen">Log in</button>
                                </div>
                                <div className="flex flex-col w-full px-2">
                                    <Input required={inValidation && name===''} label="Name" inputType="text" inputValue={name} placeholder="Jane" onChange={(e)=>setName(e.target.value)} />
                                    <Input required={inValidation && surname===''} label="Surname" inputType="text" inputValue={surname} placeholder="Doe" onChange={(e)=>setSurname(e.target.value)} />
                                    <Input required={inValidation && email===''} label="Email" inputType="email" inputValue={email} placeholder="jane@example.com" onChange={(e)=>setEmail(e.target.value)} />
                                    <Input required={inValidation && birthDate===''} label="Date of birth" inputType="date" inputValue={birthDate} placeholder="DD-MM-YYYY" onChange={(e)=>setBirthDate(e.target.value)} />
                                    <Input required={inValidation && weight===''} label="Weight" inputType="number" inputValue={weight} placeholder="e.g., 70 kg" onChange={(e) => setWeight(e.target.value)}/>
                                    <Input required={inValidation && height===''} label="Height" inputType="number" inputValue={height} placeholder="e.g., 170 cm" onChange={(e) => setHeight(e.target.value)}/>
                                    <Input required={inValidation && password===''} label="Password" inputType="password" inputValue={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    <Input required={inValidation && confirmPw===''} label="Confirm password" inputType="password" inputValue={confirmPw} placeholder="Password" onChange={(e) => setConfirmPw(e.target.value)} />
                                </div>
                                <div className="flex sm:sticky sm:bottom-0 bg-healthyGray flex-col-reverse sm:flex-row justify-between items-center">
                                    <button onClick={handleSubmit} className="font-quicksand bg-healthyOrange p-2 w-full sm:w-1/2 rounded-xl  text-white font-semibold mb-12 sm:my-4 hover:bg-healthyDarkOrange">Submit</button>
                                    {message && <p className="font-quicksand underline underline-offset-4 text-sm font-semibold p-1 rounded-md text-healthyOrange">{message}</p>}
                                </div>
                            </div>
                        </div>)
                    : ( forgot ?
                        (
                        <div className="w-full flex justify-center items-center">
                            <div className="flex flex-col  w-full px-0 xs:px-8 xs:px-0 sm:w-1/3 sm:w-full sm:max-w-[450px]  my-8">
                                <p className="font-quicksand font-semibold text-lg text-center text-darkGray ">Forgot your password?</p>
                                <p className="font-quicksand text-md text-center text-darkGray">If you have forgotten your password, please enter your email address below. We will send you a link to a page where you can easily create a new&nbsp;password.</p>
                                <Input required={inValidation && email===''} label="Email" inputType="email" inputValue={email} placeholder="jane@example.com" onChange={(e)=>setEmail(e.target.value)} />
                                <div className="flex flex-col items-center justify-center mt-3">
                                    <button onClick={handleResetPassword}  className="font-quicksand bg-healthyGreen hover:bg-healthyDarkGreen text-md text-white p-1 font-semibold rounded-md w-full xs:w-1/2 ">Send</button>
                                    <p onClick={()=>setForgot(false)} className="font-quicksand text-healthyOrange hover:text-healthyDarkOrange underline hover:underline-offset-4 hover:cursor-pointer  font-bold text-md mt-3">Go back to Log in</p>
                                </div>
                            </div>
                        </div>
                        )
                        :(<div className="w-full lg:w-2/3 ">
                            <div className="sm:mt-6 flex flex-col">
                                {inValidation && !infoOk && <p className="font-quicksand mt-4 sm:mt-0 text-sm font-semibold bg-darkGray text-white p-1 rounded-md text-center">{message}</p>}
                                <Input required={inValidation && email===''} label="Email" inputType="email" inputValue={email} placeholder="jane@example.com" onChange={(e)=>setEmail(e.target.value)} />
                                <Input required={inValidation && password===''} label="Password" inputType="password" inputValue={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                <p onClick={()=>setForgot(true)} className="font-quicksand text-sm font-bold text-healthyDarkGreen mt-1 hover:cursor-pointer">I forgot my password</p>
                            </div>
                            <div className="flex justify-between flex-col xs:flex-row">
                                <button onClick={handleLogin} className="font-quicksand bg-healthyGreen p-1 md:p-2 w-full md:w-1/2 mr-2 rounded-md md:rounded-xl  text-white font-semibold mt-2 md:my-4 hover:bg-healthyDarkGreen">Log in</button>
                                <button onClick={()=>setSignUp(true)} className="font-quicksand bg-healthyOrange p-1 md:p-2 w-full md:w-1/2 rounded-md md:rounded-xl  text-white font-semibold mt-2 md:my-4 hover:bg-healthyDarkOrange">Sign up</button>
                            </div>
                        </div>)
                    )}
                </div>
                
            </div>
        </div>
    );
}

export default Login;
