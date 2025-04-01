import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export const ResetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isEmailSend, setIsEmailSend] = useState('');
    const [otp, setOtp] = useState(0);
    const [isOtpSubmit, setIsOtpSubmit] = useState(false);
    axios.defaults.withCredentials = true;
    const { uri } = useContext(AppContext);
    const inputRef = useRef([]);
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
    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(uri + '/api/auth/send-reset-otp', { email });
            data.success ? toast.success(data.message) : toast.error(data.message);
            data.success && setIsEmailSend(true);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    const handleSubmitOtp = async (event) => {
        event.preventDefault();
        const otpArray = inputRef.current.map(event => event.value);
        setOtp(otpArray.join(''));
        setIsOtpSubmit(true);
    }
    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(uri + '/api/auth/reset-password', { email, otp, newPassword });
            data.success ? toast.success(data.message) : toast.error(data.message);
            data.success && navigate('/login');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className="flex items-center justify-center min-h-[82vh] px-6
        sm:px-0 bg-gradient-to-br from-[#f5f3f5] to-[#f3f2f3]">
            {!isEmailSend &&
                <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
                    <h2 className="text-3xl font-semibold text-white text-center mb-3">Reset Password</h2>
                    <p className="text-center text-sm mb-6">Enter your registered email address</p>
                    <form onSubmit={handleSubmitEmail}>
                        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                            <img src={assets.mail_icon} alt="email/img/png" />
                            <input type="email" placeholder="Email id" required
                                className="bg-transparent outline-none"
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out">
                            Send otp
                        </button>
                    </form>
                </div>
            }
            {!isOtpSubmit && isEmailSend &&
                <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
                    <h2 className="text-3xl font-semibold text-white text-center mb-3">Reset Password OTP</h2>
                    <p className="text-center text-sm mb-6">Enter the 6-digit code sent to your email id.</p>
                    <form onSubmit={handleSubmitOtp}>
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
                            Reset Password
                        </button>
                    </form>
                </div>
            }
            {isOtpSubmit && isEmailSend &&
                <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
                    <h2 className="text-3xl font-semibold text-white text-center mb-3">Create New Password</h2>
                    <p className="text-center text-sm mb-6">Enter the new password below</p>
                    <form onSubmit={handleSubmitPassword}>
                        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                            <img src={assets.lock_icon} alt="email/img/png" />
                            <input type="password" placeholder="new password" required
                                className="bg-transparent outline-none"
                                value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        </div>
                        <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out">
                            Save Password
                        </button>
                    </form>
                </div>
            }
        </div>
    )
}