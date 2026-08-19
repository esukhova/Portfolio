import { useRef, useState } from 'react';
import { DEVICE_MOBILE, Picture } from '@/components/Picture/Picture';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { BillboardExplosion } from '@/components/BillboardExplosion/BillboardExplosion';

export function Intro() {
    const billboardWrapRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const [explosionKey, setExplosionKey] = useState(0);

    const handleBoom = () => {
        setExplosionKey((key) => key + 1);
        introRef.current?.classList.add('intro--boom');
    };

    return (
        <div className="intro" ref={introRef}>
            <div data-parallax="0.3">
                <Picture className="intro__bg bg-image" img={['intro-bg', 'jpg', '', 'eager', 1920, 1413, DEVICE_MOBILE, 767, 1185]}/>
            </div>
            <Sidebar onBoom={handleBoom} />
            <div ref={billboardWrapRef} className="intro-billboard-wrap">
                <Picture className="intro-billboard intro-billboard--off img-wrapper" img={['intro-billboard-off', 'png', 'Екатерина Ухова', 'eager', 1536, 1024, DEVICE_MOBILE, 997, 665]}/>
                <Picture className="intro-billboard intro-billboard--on img-wrapper" img={['intro-billboard-on', 'png', 'Екатерина Ухова', 'eager', 1536, 1024, DEVICE_MOBILE, 997, 665]}/>
                <BillboardExplosion containerRef={billboardWrapRef} triggerKey={explosionKey} />
            </div>
            <div className="intro__container container">
                <h1 className="intro__title title title--type_h1">Екатерина Ухова</h1>
            </div>
        </div>
    );
}
