import {useEffect} from "react";

export function usePageLoader() {
    useEffect(() => {
        const loader = document.querySelector<HTMLDivElement>('#page-loader');
        if (!loader) return;

        const hide = () => {
            loader.classList.add('hidden');
            const onEnd = () => loader.remove();
            loader.addEventListener('transitionend', onEnd, {once: true});
        }

        const images = [...document.querySelectorAll<HTMLImageElement>('.intro__bg img, .intro-billboard img')];

        const ready = images.map((img)=> {
            img.complete ? Promise.resolve() : new Promise<void>((resolve)=> {
                img.addEventListener('load', ()=> resolve(), { once: true});
                img.addEventListener('error', ()=> resolve(), { once: true});
            })
        })

        Promise.all(ready).then(hide);

        const fallback = window.setTimeout(hide, 4000);
        return ()=> window.clearTimeout(fallback);
    }, [])
}