import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const VerifyEmail = () => {
    axios.defaults.withCredentials = true;
    const { uri, isLogged, userProfile, profile } = useContext(AppContext);
    const inputRef = useRef([]);
    const navigate = useNavigate();
    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
            inputRef.current[index + 1].focus();
        }
    };
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRef.current[index - 1].focus();
        }
    }
    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text');
        const pasteArray = paste.split('');
        pasteArray.forEach((char, index) => {
            if (inputRef.current[index]) {
                inputRef.current[index].value = char;
            }
        });
    }
    const onSubmitForm = async (event) => {
        try {
            event.preventDefault();
            const otpArray = inputRef.current.map(event => event.value);
            const otp = otpArray.join('');
            const { data } = await axios.post(uri + '/api/auth/verify-email', { otp });
            if (data.success) {
                profile();
                navigate('/')
                toast.success(data.message);
            } else {
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    useEffect(() => {
        isLogged && userProfile && userProfile.isAccountVerified && navigate('/');
    }, [isLogged, navigate, userProfile]);

    return (
        <div className="flex items-center justify-center min-h-[82vh] px-6
        sm:px-0 bg-gradient-to-br from-blue-200 to-purple-300">
            <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
                <h2 className="text-3xl font-semibold text-white text-center mb-3">Email Verify OTP</h2>
                <p className="text-center text-sm mb-6">Enter the 6-digit code sent to your email id.</p>
                <form onSubmit={onSubmitForm}>
                    <div className="flex justify-between mb-8" onPaste={handlePaste} >
                        {Array(6).fill(0).map((_, index) => (
                            <input type="text" maxLength='1' key={index} required
                                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md outline-none"
                                ref={e => inputRef.current[index] = e}
                                onInput={(e) => handleInput(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)} />
                        ))}
                    </div>
                    <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out">
                        Verify Email
                    </button>
                </form>
            </div>
        </div>
    )
}