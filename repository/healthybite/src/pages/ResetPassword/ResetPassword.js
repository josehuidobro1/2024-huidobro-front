import React,{useState} from "react";
import bgImage from '../../assets/bgImage.jpg'
import Input from "../../components/Input";
import { useParams } from 'react-router-dom';

function ResetPassword() {
    const { token } = useParams(); // recibe el token por parametro
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [validation, setValidation]=useState(false)
    const [message, setMessage]=useState('')

    const handleValidation=()=>{
        setValidation(true)
        if(password===confirmPw){
            password!=='' && confirmPw!=="" &&  setMessage("Everything OK!")
        }else{ 
            setMessage("Passwords do not match")
        }
    }

    return (
        <div className="h-screen flex justify-center items-center relative">
            <img src={bgImage} alt='ResetPassword' className="relative w-full h-full object-cover z-0" />
            <div className="flex  flex-col justify-start items-start absolute w-1/4 mt-12 pr-16    ">
                <p className=" font-belleza text-4xl text-darkGray">Healthy Bite</p>
                {message && <p className="font-quicksand w-full p-1 rounded-md my-2 bg-healthyDarkOrange text-center text-white font-semibold text-sm">{message}</p>}
                <Input required={ validation && password===''} label="New Password" inputType="password" inputValue={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <Input required={ validation && confirmPw===''} label="Confirm password" inputType="password" inputValue={confirmPw} placeholder="Password" onChange={(e) => setConfirmPw(e.target.value)} />
                <div className="flex flex-col items-end justify-end w-full">
                    <button onClick={handleValidation} className="font-quicksand text-white font-semibold text-md mt-3 p-1 rounded-md bg-healthyGreen hover:bg-healthyDarkGreen">Reset new password</button>
                </div>
                
            </div>
            
        </div>
    );
}

export default ResetPassword;
