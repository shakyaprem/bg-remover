import { BackSlider } from "../components/BackSlider"
import { Header } from "../components/Header"
import { Steps } from "../components/Steps"
import { Testimonials } from "../components/Testimonials"
import { UploadImage } from "../components/UploadImage"

export const Home = () => {
    return (
        <>
            <Header />
            <Steps />
            <BackSlider />
            <Testimonials />
            <UploadImage />
        </>
    )
}