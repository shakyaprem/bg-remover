import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export const Settings = () => {
    const { uri, userProfile, setIsLogged, setUserProfile, setCheckBalance, userProfilePic } = useContext(AppContext);
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({ name: "", profilePic: "", email: ""});
    const handleInputChange = (value, field) => {
        setInputValue((prev) => ({ ...prev, [field]: value }));
    }

    const profilePicUpload = async () => {
        try {
            const { profilePic } = inputValue;
            const formDataObj = new FormData();
            if (profilePic) {
                formDataObj.append('profilePic', profilePic);
            }
            const { data } = await axios.post(uri + '/api/user/profile', formDataObj, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const changeName = async () => {
        try {
            const { name } = inputValue;
            const { data } = await axios.post(uri + '/api/user/profile/change-name', { name });
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const deleteAccount = async () => {
        try {
            const { userId, email, name } = userProfile;
            const { data } = await axios.delete(uri + '/api/user/profile/user', { userId, email, name });
            if (data.success) {
                data.success && setIsLogged(false);
                data.success && setUserProfile(false);
                data.success && setCheckBalance(false);
                toast.success(data.message);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const notVerify = `smaller text-red-500 font-semibold bg-red-100 rounded px-3 py-1
                        mt-2 mb-4 w-fit mx-auto tracking-[0.1rem]`;
    const verified = `smaller text-green-500 font-semibold bg-green-100 rounded px-3 py-1
                        mt-2 mb-4 w-fit mx-auto tracking-[0.1rem]`;

    return (
        <div className="mx-4 lg:mx-44 mt-6 min-h-[80vh]">
            <h2 className="mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">Settings</h2>
            <div className="bg-white rounded-lg mb-4 px-8 py-2 drop-shadow-sm">
                <div className="text-center text-3xl">
                    <p className="font-semibold text-neutral-500 mb-8 mt-5">Account Settings</p>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <img className="w-7 h-7" src={assets.image_icon} alt="" />
                        <label htmlFor="image" className="text-neutral-500">Profile</label>
                        <input type="file" accept="image/*"name="profilePic" onChange={(event) => handleInputChange( event.target.files[0], 'profilePic')} />
                        <img className="w-10 h-10 rounded-full" src={userProfilePic ? userProfilePic : uri + '/uploads/default.png'} alt="profile" />
                    </div>
                    <button className="w-7 h-7 flex items-center justify-center fuchsia-500 bg-amber-100 rounded-sm
                                    cursor-pointer hover:opacity-90 hover:scale-105 transition-transform duration-600 ease-in-out">
                        <img onClick={profilePicUpload} className="w-8 h-8" src={assets.update} alt="update/png/svg" />
                    </button>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <img className="w-7 h-7" src={assets.person_icon} alt="" />
                        <label htmlFor="Name" className="text-neutral-500">Name</label>
                        <input value={inputValue.name} onChange={(event) => handleInputChange(event.target.value, 'name')} placeholder={userProfile.name} type="text" className="bg-transparent outline-none" />
                    </div>
                    <button onClick={changeName} className="w-7 h-7 flex items-center justify-center fuchsia-500 bg-amber-100 rounded-sm
                                    cursor-pointer hover:opacity-90 hover:scale-105 transition-transform duration-600 ease-in-out">
                        <img className="w-8 h-8" src={assets.update} alt="update/png/svg" />
                    </button>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <img className="w-7 h-7" src={assets.mail_icon} alt="" />
                        <p className="text-neutral-500">Email</p>
                    </div>
                    <button className="w-7 h-7 flex items-center justify-center fuchsia-500 bg-amber-100 rounded-sm
                                    cursor-pointer hover:opacity-90 hover:scale-105 transition-transform duration-600 ease-in-out">
                        <img className="w-8 h-8" src={assets.update} alt="update/png/svg" />
                    </button>
                </div>
                <div className="flex items-center justify-between mb-3 mt-10">
                    <div>
                        {userProfile.isAccountVerified ?
                            <small className={verified} >Verified</small>
                            :
                            <small className={notVerify}>Not Verify</small>
                        }
                    </div>
                    <button onClick={deleteAccount} className="px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-lg
                    text-white cursor-pointer hover:opacity-90 hover:scale-105 transition-transform duration-600 ease-in-out">Delete Account</button>
                </div>
            </div>
        </div>
    );
}