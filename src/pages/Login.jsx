import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
export const Login = () => {
  const { uri, isLogged, setIsLogged, profile} = useContext(AppContext);
    const navigate = useNavigate();
    const [state, setState] = useState('Login');
    const [inputValue, setInputValue] = useState({name:"", email:"", password:""});
    const handleInputChange = (value, field) => {
        setInputValue((prev) => ({ ...prev, [field]: value }));
    }

    const handleSubmitForm = async (event) => {
      event.preventDefault();
      try {
        axios.defaults.withCredentials = true;
        if (state === "Sign Up") {
          const { name, email, password } = inputValue;
          const { data } = await axios.post(uri + "/api/auth/register", {
            name,
            email,
            password,
          });
          if (data.success) {
            setIsLogged(true);
            profile();
            navigate("/");
          } else {
            toast.error(data.message);
          }
        } else {
          const { email, password } = inputValue;
          const { data } = await axios.post(uri + "/api/auth/login", {
            email,
            password,
          });
          if (data.success) {
            setIsLogged(true);
            profile();
            navigate("/");
          } else {
            toast.error(data.message);
          }
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    useEffect(() => {
            isLogged && navigate('/');
        }, [isLogged, navigate]);
    return (
      <div className="flex items-center justify-center min-h-[82vh] px-6
        sm:px-0 bg-gradient-to-b from-[#f5f3f5] to-[#f3f2f3]">
            <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
                <h2 className="text-3xl font-semibold text-white text-center mb-3">{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
                <p className="text-center text-sm mb-6">{ state === 'Sign Up' ? 'Create your account !' : 'Login to your account!' }</p>
                <form onSubmit={handleSubmitForm}>
                    {state === 'Sign Up' && (
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.person_icon} alt="person/img/png" />
                        <input value={inputValue.name} onChange={(event) => handleInputChange(event.target.value, 'name')} type="text" placeholder="Full Name" required className="bg-transparent outline-none" />
                    </div>
                    )}
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.mail_icon} alt="email/img/png" />
                        <input value={inputValue.email} onChange={(event) => handleInputChange(event.target.value, 'email')} type="email" placeholder="Email id" required className="bg-transparent outline-none" />
                    </div>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.lock_icon} alt="lock/img/png" />
                        <input value={inputValue.password} onChange={(event) => handleInputChange(event.target.value, 'password')} type="password" placeholder="Password" required className="bg-transparent outline-none" />
                    </div>
                    {state === 'Login' && (
                        <p onClick={() => navigate('/reset-password')} className="mb-4 text-indigo-500 cursor-pointer">Forgot Password</p>
                    )}
                    <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out">
                        {state}
                    </button>
                </form>
                {state === 'Sign Up' ? (
                    <p className="text-gray-400 text-center text-xs mt-4">Already have an account? {" "}
                        <span onClick={() => setState('Login')} className="text-blue-400 cursor-pointer underline">Login hare</span>
                    </p>
                ) : (
                        <p className="text-gray-400 text-center text-xs mt-4">Don&apos;t have an account? {" "}
                            <span onClick={() => setState('Sign Up')} className="text-blue-400 cursor-pointer underline">Sign Up</span>
                        </p>
                )}
            </div>
        </div>
    )
}