import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

export const UploadImage = () => {
        const { removeBackground } = useContext(AppContext);
    return (
        <div className="pb-10 md:pb-20 mx-2">
            <h2 className="mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">See The Magic. Try Now</h2>
            <div className="text-center mb-24">
                <input onChange={e => removeBackground(e.target.files[0])} accept="image/*" type="file" id="upload1" hidden />
                <label htmlFor="upload1" className="inline-flex items-center justify-center gap-3 px-8 py-3.5 text-white bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-lg cursor-pointer hover:opacity-90 hover:scale-105 transition-transform duration-600 ease-in-out">
                    <img width={20} src={assets.upload_btn_icon} alt="upload btn icon /png/svg" />
                    <p>Upload Image</p>
                </label>
            </div>
        </div>
    );
}