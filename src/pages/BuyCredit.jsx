import { useContext } from "react"
import { assets, plans } from "../assets/assets"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const BuyCredit = () => {
    const { checkCreditBalance, uri, getAuthToken } = useContext(AppContext);
    const navigate = useNavigate();

    const initPay = async (order) => {
        const options = {
            key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Credits Payment",
            description: "Payment Credits",
            order_id: order.id,
            receipt: order.receipt,
            handler : async (response) => {
                const token = await getAuthToken();
                try {
                    const { data } = await axios.post(uri + '/api/user/verify-razorpay', response, { headers: {token} });
                    if(data.success) {
                        toast.success(data.message);
                        checkCreditBalance();
                        navigate('/');
                    } else {
                        toast.error(data.message);
                    }
                } catch (error) {
                    toast.error(error.response.data.message);
                }
            }
        }
        const razor = new window.Razorpay(options);
        razor.open();
    }

    const paymentRazorpay = async (planId) => {
        try {
            const token = await getAuthToken();
            const { data } = await axios.post(uri + '/api/user/pay-razorpay', { planId }, { headers: {token} });
            if(data.success) {
                initPay(data.order)
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="min-h-[80vh] text-center pt-6 mb-6">
            <div className="flex flex-col items-center justify-center gap-3 mb-6 mx-4 lg:mx-44">
                <button className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent px-8 py-2.5 text-sm border border-violet-600 rounded-lg cursor-pointer hover:opacity-90 hover:scale-105 transition-transform duration-600 ease-in-out">Our Plans</button>
                <h2 className="mb-10 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">Choose The Plan That&apos;s Right For You</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 mx-auto max-w-4xl px-4 py-8">
                {plans.map((plan) => (
                    <div key={plan.id} className="flex flex-col items-center justify-center bg-white rounded-xl p-10 drop-shadow-md max-w-lg m-auto hover:scale-105 transition-all duration-300 ease-in-out2">
                        <img className="mb-6" src={assets.logo_icon} alt="logo icon/png/svg" />
                        <h3 className="text-2xl font-bold text-neutral-600 mb-3">{plan.id}</h3>
                        <p className="text-4xl text-neutral-700 mb-2"><span className="text-lg">$</span>{plan.price}</p>
                        <p className="text-lg">{plan.credits} Credits</p>
                        <p className="text-lg mb-6">{plan.desc}</p>
                        <button onClick={() => paymentRazorpay(plan.id)} className="px-8 py-3 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-lg cursor-pointer hover:opacity-90 hover:scale-105 transition-transform duration-600 ease-in-out">Buy Now</button>
                    </div>
                ))}
            </div>
        </div>
    )
}