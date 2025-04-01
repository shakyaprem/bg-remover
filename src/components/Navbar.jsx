import { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
export const Navbar = () => {
    const navigate = useNavigate();
    const { uri, setIsLogged, userProfile, setUserProfile, checkCreditBalance, isLogged, checkBalance, setCheckBalance, userProfilePic, setUserProfilePic } = useContext(AppContext);

    const sendVerificationOtp = async () => {
        axios.defaults.withCredentials = true;
        try {
            const { data } = await axios.post(uri + '/api/auth/send-verify-otp');
            if (data.success) {
                navigate('/verify-email');
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
            if (isLogged || userProfile) {
                checkCreditBalance();
            }
        }, [checkCreditBalance, isLogged, userProfile])

    const Logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(uri + '/api/auth/logout');
            data.success && setIsLogged(false);
            data.success && setUserProfile(false);
            data.success && setCheckBalance(false);
            data.success && setUserProfilePic(false);
            data.success && toast.success(data.message);
            navigate('/');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="flex justify-between items-center mx-4 py-4 lg:mx-44 lg:py-6">
            <Link to="/"><img className="w-32 sm:w-44" src={assets.logo} alt="logo/png/svg" /></Link>
            <div className="flex gap-16 items-center justify-center">
                { userProfile ? <button onClick={() => navigate('/buy-credit')} className='flex items-center justify-between gap-2
                border border-gray-300 px-6 py-2 bg-amber-50 rounded-full text-gray-600 cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out' >
                        <img className="w-4 sm:w-5" src={assets.credit_icon} alt="credit icon/png/svg" />
                        Credits : {checkBalance}
                    </button>
                    : ''
                }
                {userProfile ?
                    <div className='w-11 h-11 flex justify-center items-center rounded-full relative group
                    cursor-pointer hover:opacity-90 hover:scale-105 transition-transform duration-600 ease-in-out'>
                        {
                            userProfilePic ?
                                <img src={userProfilePic} className='w-full h-full rounded-full' alt="profile pic/png/svg" />
                                : <span>{userProfile.name.charAt(0).toUpperCase()}</span>
                        }
                        <div className='absolute hidden group-hover:block top-2 right-0 z-10 text-white rounded pt-10'>
                            <ul className='list-none m-0 w-50 rounded-lg text-center p-4 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-sm'>
                                {!userProfile.isAccountVerified &&
                                    <li onClick={sendVerificationOtp} className='flex items-center justify-center gap-2 py-1 pr-4 px-2 cursor-pointer'>
                                        <img src={assets.verify_email} className='w-5 h-5' alt="email/img/png" /> Verify Email</li>
                                }
                                <li onClick={() => navigate('/settings')} className='flex items-center justify-center gap-2 py-1 px-2 pr-10 cursor-pointer'>
                                    <img src={assets.settings_icon} className='w-7 h-7 rounded-full' alt="settings icon/png/svg" /> Settings</li>
                                <li onClick={Logout} className='flex items-center justify-center gap-2 py-1 px-2 pr-12 cursor-pointer'> <img src={assets.logout} className='w-7 h-7 rounded-full' alt="logout icon/png/svg" /> Logout</li>
                            </ul>
                        </div>
                    </div>
                    : <button onClick={() => navigate('/login')}
                        className="flex items-center gap-4 px-4 py-2 text-white bg-zinc-600 rounded-full sm:px-8 sm:py-3 text-sm sm:text-base cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out">
                        Get Started <img className="w-3 sm:w-4" src={assets.arrow_icon} alt="arrow/png/svg" />
                    </button>
                }
            </div>
        </div>
    )
}