import { useContext } from "react"
import { AppContext } from "../context/AppContext"

export const Result = () => {
    const { resultImage, image, removeBackground } = useContext(AppContext);
    return (
        <div className="mx-4 lg:mx-44 mt-6 min-h-[75vh]">
            <div className="bg-white rounded-lg mb-4 px-8 py-2 drop-shadow-sm">
                <div className="flex flex-col sm:grid grid-cols-2 gap-8">
                    <div>
                        <p className="font-semibold text-neutral-500 mb-2">Original</p>
                        <img className="rounded-md border border-neutral-300" src={image ? URL.createObjectURL(image) : ''} alt="" />
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-neutral-500 mb-2">Removed Background</p>
                        <div className="rounded-md border border-neutral-300 h-full w-full relative bg-layer overflow-hidden">
                            <img src={resultImage ? resultImage : ''} alt="" />
                            {
                                !resultImage && image && <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                                    <div className="border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                { resultImage && <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-4">
                    <input onChange={e => removeBackground(e.target.files[0])} accept="image/*" type="file" id="upload2" hidden />
                    <label htmlFor="upload2" className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent px-8 py-2.5 text-sm border border-violet-600
                        rounded-lg cursor-pointer hover:opacity-90 hover:scale-105 transition-transform duration-600 ease-in-out">Try another image</label>
                    <a href={resultImage} download className="px-8 py-3 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-lg
                        cursor-pointer hover:opacity-90 hover:scale-105 transition-transform duration-600 ease-in-out">Download image</a>
                </div>}
            </div>
        </div>
    )
}