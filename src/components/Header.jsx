import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";


export const Header = () => {
    const { removeBackground } = useContext(AppContext);
    return (
        <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20">
            <div>
                <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-400 bg-clip-text
                text-transparent leading-tight ">Remove The <br className="max-md:hidden" />
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">Background</span> From <br className="max-md:hidden" />
                Images For Free.</h1>
                <p className="my-6 text-[15px] text-gray-500 ">
                    Remove the background from your photos for free. <br className="max-sm:hidden" />
                    No need to buy expensive software to remove image background. <br className="max-sm:hidden" />
                    Remove background from image online in one click with automatic AI background removal tool.
                </p>
                <div>
                    <input onChange={e => removeBackground(e.target.files[0])} accept="image/*" type="file" id="upload0" hidden />
                    <label htmlFor="upload0" className="inline-flex items-center justify-center gap-3 px-8 py-3.5 text-white bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-lg
                    cursor-pointer hover:opacity-90 hover:scale-105 transition-transform duration-600 ease-in-out">
                        <img width={20} src={assets.upload_btn_icon} alt="upload btn icon /png/svg" />
                        <p>Upload Image</p>
                    </label>
                </div>
            </div>
            <div className="w-full max-w-md">
                <img src={assets.header_img} alt="header img /png/svg" />
            </div>
        </div>
    )
}