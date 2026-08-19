import {Intro} from "@/components/Intro/Intro";
import {Stack} from "@/components/Stack/Stack";
import {About} from "@/components/About/About";
import {Footer} from "@/components/Footer/Footer";
import {Vanilla} from "@/components/Vanilla/Vanilla";
import {Framework} from "@/components/Framework/Framework";
import {useParallaxAttr} from "@/hooks/useParallaxAttr";
import {DEVICE_MOBILE, Picture} from "@/components/Picture/Picture";
import {useScrollAnim} from "@/hooks/useScrollAnim";
import {useMediaQuery} from "@/hooks/useMediaQuery";

export default function App() {
    useParallaxAttr();
    useScrollAnim();
    const isMobile = useMediaQuery("(max-width: 767px)");

    return (
    <>
        <main>
        <Intro/>
        <About/>
        <Stack/>
        <div className="wrapper">
            <div data-parallax={isMobile ? undefined : "0.3"}>
                <Picture className="framework__bg bg-image"
                         img={['framework-bg', 'jpg', '', '', 1920, 1409, DEVICE_MOBILE, 767, 1209]}/>
            </div>
            <Framework/>
            <Vanilla/>
        </div>
        </main>
        <Footer/>
    </>
    )
}