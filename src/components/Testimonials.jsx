import { testimonialsData } from "../assets/assets"

export const Testimonials = () => {
    return (
        <div className="pb-10 md:pb-20 mx-2">
            <h2 className="mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">Customer Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-auto max-w-4xl px-4 py-8">
                {
                    testimonialsData.map((testimonial, index) => (
                        <div className="bg-white rounded-xl p-6 drop-shadow-md max-w-lg m-auto hover:scale-105 transition-all duration-300 ease-in-out" key={index}>
                            <p className="text-5xl text-neutral-600">”</p>
                            <p className="text-sm text-neutral-500">{testimonial.text}</p>
                            <div className="flex items-center gap-3.5 mt-6">
                                <img src={testimonial.image} alt={testimonial.author} className="w-12 rounded-full" />
                                <div className="mt-4 md:mt-0">
                                    <h3 className="text-xl font-semibold text-neutral-500">{testimonial.author}</h3>
                                    <p className="text-sm text-neutral-500">{testimonial.jobTitle}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}