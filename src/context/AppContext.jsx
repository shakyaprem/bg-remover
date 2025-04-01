import axios from "axios";
import { createContext, useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const uri = import.meta.env.VITE_BACKEND_URI;
    const [isLogged, setIsLogged] = useState(false);
    const [userProfile, setUserProfile] = useState(false);
    const [userProfilePic, setUserProfilePic] = useState(false);
    const [checkBalance, setCheckBalance] = useState(false);
    const [image, setImage] = useState(false);
    const [resultImage, setResultImage] = useState(false);


    const verifyAccount = async () => {
        try {
            const { verify } = await axios.get(uri + '/api/auth/verify-account');
            if (!verify) {
                setIsLogged(true);
                profile();
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    const profile = async () => {
        try {
            const { data } = await axios.get(uri + '/api/user/profile');
            data ? setUserProfile(data.userDetail) : toast.error(data.message);
            if (data.userDetail.profilePic) {
                setUserProfilePic(uri + '/uploads/' + data.userDetail.profilePic);
            } else {
                return null;
            }
            toast.success(data.userDetail.name);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const checkCreditBalance = async (userId) => {
        try {
            const { data } = await axios.get(uri + '/api/user/profile', { userId });
            setCheckBalance(data.userDetail.creditBalance);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const getAuthToken = async (userId) => {
        try {
            const { data } = await axios.get(uri + '/api/auth/token', { userId });
            if (data.success) {
                return data.token;
            } else {
                toast.error(data.message);
                return null;
            }
        } catch (error) {
            toast.error(error.response.data.message);
            return null;
        }
    };

    const removeBackground = async (image) => {
        try {
            if(!isLogged) {
                return navigate('/login');
            }
            if (!userProfile.isAccountVerified) {
                toast.error('Please verify account to use this feature');
                return navigate('/verify-email');
            }
            setImage(image);
            setResultImage(false);
            navigate('/result');
            const token = await getAuthToken();
            const formData = new FormData();
            image && formData.append('image', image);
            const { data } = await axios.post(uri + '/api/image/remove-img-bg', formData, {headers: {token}});
            if(data.success) {
                setResultImage(data.resultImage);
                data.creditBalance && setCheckBalance(data.creditBalance);
            } else {
                toast.error(data.message);
                data.creditBalance && setCheckBalance(data.creditBalance);
                if(data.creditBalance === 0) {
                    navigate('/buy-credit');
                }
            }
        } catch (error) {
            navigate('/buy-credit');
            toast.error('your credit balance is ' + error.response.data.creditBalance);
        }
    }

    useEffect(() => {
        verifyAccount();
    }, [])

    const value = {
        uri,
        isLogged, setIsLogged,
        userProfile, setUserProfile,
        profile, checkCreditBalance,
        checkBalance, setCheckBalance,
        image, setImage,
        getAuthToken,
        removeBackground,
        resultImage, setResultImage,
        userProfilePic, setUserProfilePic,

    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}