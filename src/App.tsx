import {Intro} from "@/components/Intro/Intro";
import {Stack} from "@/components/Stack/Stack";
import {About} from "@/components/About/About";
import {Footer} from "@/components/Footer/Footer";
import {Vanilla} from "@/components/Vanilla/Vanilla";
import {Framework} from "@/components/Framework/Framework";
import {useParallaxAttr} from "@/hooks/useParallaxAttr";
import {DEVICE_MOBILE, Picture} from "@/components/Picture/Picture";
import {useScrollAnim} from "@/hooks/useScrollAnim";
import {usePageLoader} from "@/hooks/usePageLoader";

export default function App() {
    usePageLoader();
    useParallaxAttr();
    useScrollAnim();

    return (
    <>
        <main>
            <Intro/>
            <div className="wrapper">
                <Picture className="wrapper__bg bg-image"
                         img={['framework-bg', 'jpg', '', '', 1920, 1409, DEVICE_MOBILE, 767, 1209]}/>
                <About/>
                <Stack/>
                <Framework/>
                <Vanilla/>
                <Footer/>
            </div>
        </main>
    </>
    )
}