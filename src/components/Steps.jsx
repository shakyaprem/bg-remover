import { assets } from "../assets/assets"

export const Steps = () => {
    return (
        <div className="mx-4 lg:mx-44 py-20 xl:py-40">
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">Steps to Remove Background <br /> Image in Seconds</h2>
            <div className="flex flex-wrap items-start justify-center gap-4 mt-16 xl:mt-24">
                <div className="flex items-start gap-6 bg-white drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-300 ease-in-out">
                    <img className="max-w-9" src={assets.upload_icon} alt="upload icon/png/svg" />
                    <div>
                        <h3 className="text-xl font-medium  text-neutral-800">Upload Image</h3>
                        <p className="text-sm text-neutral-500 mt-1">Upload the image you want to remove<br /> background from.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 bg-white drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-300 ease-in-out">
                    <img className="max-w-9" src={assets.remove_bg_icon} alt="remove bg icon/png/svg" />
                    <div>
                        <h3 className="text-xl font-medium  text-neutral-800">Remove Background</h3>
                        <p className="text-sm text-neutral-500 mt-1">Click on the remove background button <br /> and wait for the magic to happen.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 bg-white drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-300 ease-in-out">
                    <img className="max-w-9" src={assets.download_icon} alt="download icon/png/svg" />
                    <div>
                        <h3 className="text-xl font-medium  text-neutral-800">Download Image</h3>
                        <p className="text-sm text-neutral-500 mt-1">Download the image with the background <br /> removed in a single click.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}