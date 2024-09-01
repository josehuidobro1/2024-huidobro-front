import React, {useState} from "react";
import loginImg from '../../assets/login.png'
import Input from "../../components/Input";
import Data from "../Data";

function Login() {
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
    const [infoOk, setInfoOk]=useState(false)
    const [forgot, setForgot]=useState(false)

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

    const handleLogin=()=>{
        setInValidation(true)
        if (password==='' || email===''){
            setMessage("The information is incomplete")
            return
        }

        
        const user=Data.find(user => user.email == email)
        user ? (user.password==password && setInfoOk(true)) : setMessage('The information does not match') 
    }


    return (
        <div className="h-screen">
            <img src={loginImg} alt="Login" className="w-full z-0 relative" />
            <div className={`flex absolute flex-col lg:left-40 ${signUp ? 'lg: top-12':' lg:top-40 top-20' } `}>
                <h1 className=" font-belleza text-7xl text-darkGray">Healthy Bite</h1>
                {signUp ? (
                    <div>
                        <div className="mt-6 flex flex-col">
                        <button onClick={()=>setSignUp(false)} className="font-quicksand bg-healthyGreen p-2 w-full rounded-xl  text-white font-semibold my-4 hover:bg-healthyDarkGreen">Log in</button>
                            <Input required={inValidation && name===''} label="Name" inputType="text" inputValue={name} placeholder="Jane" onChange={(e)=>setName(e.target.value)} />
                            <Input required={inValidation && surname===''} label="Surname" inputType="text" inputValue={surname} placeholder="Doe" onChange={(e)=>setSurname(e.target.value)} />
                            <Input required={inValidation && email===''} label="Email" inputType="email" inputValue={email} placeholder="jane@example.com" onChange={(e)=>setEmail(e.target.value)} />
                            <Input required={inValidation && birthDate===''} label="Date of birth" inputType="date" inputValue={birthDate} placeholder="DD-MM-YYYY" onChange={(e)=>setBirthDate(e.target.value)} />
                            <Input required={inValidation && weight===''} label="Weight" inputType="number" inputValue={weight} placeholder="e.g., 70 kg" onChange={(e) => setWeight(e.target.value)}/>
                            <Input required={inValidation && height===''} label="Height" inputType="number" inputValue={height} placeholder="e.g., 170 cm" onChange={(e) => setHeight(e.target.value)}/>
                            <Input required={inValidation && password===''} label="Password" inputType="password" inputValue={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <Input required={inValidation && confirmPw===''} label="Confirm password" inputType="password" inputValue={confirmPw} placeholder="Password" onChange={(e) => setConfirmPw(e.target.value)} />
                            <div className="flex justify-between items-center">
                                <button onClick={handleValidation} className="font-quicksand bg-healthyOrange p-2 w-1/2 rounded-xl  text-white font-semibold my-4 hover:bg-healthyDarkOrange">Submit</button>
                                {message && <p className="font-quicksand underline underline-offset-4 text-sm font-semibold p-1 rounded-md text-healthyOrange">{message}</p>}
                            </div>
                        </div>
                    </div>)
                : ( forgot ?
                    (
                    <div className="flex flex-col w-1/3 my-8">
                        <p className="font-quicksand font-semibold text-lg text-center text-darkGray ">Forgot your password?</p>
                        <p className="font-quicksand text-md text-center text-darkGray">If you have forgotten your password, please enter your email address below. We will send you a link to a page where you can easily create a new&nbsp;password.</p>
                        <Input required={inValidation && email===''} label="Email" inputType="email" inputValue={email} placeholder="jane@example.com" onChange={(e)=>setEmail(e.target.value)} />
                        <div className="flex flex-col items-center justify-center mt-3">
                            <button className="font-quicksand bg-healthyGreen hover:bg-healthyDarkGreen text-md text-white p-1 font-semibold rounded-md w-1/2 ">Send</button>
                            <p onClick={()=>setForgot(false)} className="font-quicksand text-healthyOrange hover:text-healthyDarkOrange underline hover:underline-offset-4 hover:cursor-pointer  font-bold text-md mt-3">Go back to Log in</p>
                        </div>
                    </div>
                    )
                    :(<div>
                        <div className="mt-6 flex flex-col">
                            {inValidation && !infoOk && <p className="font-quicksand text-sm font-semibold bg-darkGray text-white p-1 rounded-md text-center">{message}</p>}
                            <Input required={inValidation && email===''} label="Email" inputType="email" inputValue={email} placeholder="jane@example.com" onChange={(e)=>setEmail(e.target.value)} />
                            <Input required={inValidation && password===''} label="Password" inputType="password" inputValue={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <p onClick={()=>setForgot(true)} className="font-quicksand text-sm font-bold text-healthyDarkGreen mt-1 hover:cursor-pointer">I forgot my password</p>
                        </div>
                        <div className="flex justify-between">
                            <button onClick={handleLogin} className="font-quicksand bg-healthyGreen p-2 w-1/2 mr-2 rounded-xl  text-white font-semibold my-4 hover:bg-healthyDarkGreen">Log in</button>
                            <button onClick={()=>setSignUp(true)} className="font-quicksand bg-healthyOrange p-2 w-1/2 rounded-xl  text-white font-semibold my-4 hover:bg-healthyDarkOrange">Sign up</button>
                        </div>
                    </div>)
                )}
            </div>
        </div>
    );
}

export default Login;
