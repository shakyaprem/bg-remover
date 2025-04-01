import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"

export const Footer = () => {
    const navigate = useNavigate();
    return (
        <footer className="flex items-center justify-between py-4 px-4 gap-4 lg:px-44 border-t border-gray-200 max-sm:flex-col max-sm:items-center max-sm:gap-4 max-sm:px-8 max-sm:py-6">
            <img onClick={() => navigate('/')} className="cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out" width={160} src={assets.logo} alt="logo/png/svg" />
            <p className="text-sm text-gray-600">Copyright © 2024 <span className="cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out" onClick={() => navigate('/')}>bg.remover</span> | All rights reserved.</p>
            <div className="flex items-center justify-center border-l border-gray-300 gap-4 pl-4 text-sm text-gray-500 max-sm:hidden">
                <a href="#" className="text-gray-600 hover:text-blue-500">Privacy Policy</a>
                <a href="#" className="text-gray-600 hover:text-blue-500">Terms of Service</a>
                <div className="flex gap-1">
                    <a href="https://www.facebook.com/login" target="_blank" rel="noopener noreferrer"><img className="cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out" width={40} src={assets.facebook_icon} alt="facebook/png/svg" /></a>
                    <img onClick={() => navigate('/login')} className="cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out" width={40} src={assets.twitter_icon} alt="twitter/png/svg" />
                    <img onClick={() => navigate('/login')} className="cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out" width={40} src={assets.google_plus_icon} alt="google/png/svg" />
                </div>
            </div>
        </footer>
    )
}