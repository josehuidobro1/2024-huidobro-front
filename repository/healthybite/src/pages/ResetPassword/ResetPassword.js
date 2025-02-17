import React, { useState } from "react";
import bgImage from '../../assets/bgImage.jpg';
import bgImageMobile from "../../assets/bgImageMobile.jpg";
import Input from "../../components/Input";
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from "../../firebaseService"; // Ensure firebaseService is configured correctly
import { confirmPasswordReset, getAuth } from "firebase/auth";


function ResetPassword() {
    const [validation, setValidation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [message, setMessage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    
    const resetPass=async()=>{
        const queryParams = new URLSearchParams(location.search);
        const oobCode = queryParams.get('oobCode'); 
        if (!oobCode) {
            setMessage("Invalid or expired reset link");
            return;
        }
        const auth = getAuth();
        console.log('oobcode ' , oobCode);
        try {
            const rta=await confirmPasswordReset(auth, oobCode, password);
            console.log('respuestaaa' , rta)
            navigate("/");
            setLoading(false);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            setLoading(false);
        } 
    }

    const handleResetPassword = () => {
        setLoading(true);
        setValidation(true)
        if (!password || !confirmPw) {
            setMessage("Password fields cannot be empty");
            setLoading(false);
        }else if (password !== confirmPw) {
            setMessage("Passwords do not match");
            setLoading(false);
        }else{
            resetPass()
        }
        
    };

    return (
        <div className="h-screen flex justify-center items-center relative">
            {window.innerWidth < 640 ?
                <img src={bgImageMobile} alt='ResetPassword' className="relative w-full h-full object-cover z-0" />
                : <img src={bgImage} alt='ResetPassword' className="relative w-full h-full object-cover z-0" />}
            <div className="flex flex-col justify-center items-center absolute sm:pl-4 md:pl-8 w-2/3 sm:w-1/3 lg:w-1/4 sm:mt-12">
                <p className="font-belleza text-center text-2xl md:text-3xl text-darkGray">Healthy Bite</p>
                {message && <p className="font-quicksand p-2 my-2 bg-healthyDarkOrange text-white text-sm">{message}</p>}
                
                <Input 
                    required={validation && password === ''} 
                    label="New Password" 
                    inputType="password" 
                    inputValue={password} 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <Input 
                    required={validation && confirmPw === ''} 
                    label="Confirm Password" 
                    inputType="password" 
                    inputValue={confirmPw} 
                    placeholder="Confirm Password" 
                    onChange={(e) => setConfirmPw(e.target.value)} 
                />
                <div className="w-full flex flex-col items-center md:items-end">
                    <button 
                        onClick={handleResetPassword} 
                        className="font-quicksand text-white text-sm mt-3 py-2 px-4 rounded-md bg-healthyGreen hover:bg-healthyDarkGreen"
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;



