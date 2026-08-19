import {useEffect} from "react";
import {useMediaQuery} from "@/hooks/useMediaQuery";

export function useScrollAnim() {
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

    useEffect(()=> {
        const animEls = document.querySelectorAll('._anim-on-scroll');

        if (prefersReducedMotion) {
            animEls.forEach((el) => el.classList.add('_active'));
            return;
        }

        const io = new IntersectionObserver((entries) => {
            for  (const e of entries) {
                if (e.isIntersecting) {
                    e.target.classList.add('_active');
                    io.unobserve(e.target);
                }
            }
        }, {rootMargin: '0px 0px -10px 0px'});

        animEls.forEach((el) => io.observe(el));
        return ()=> io.disconnect();
    }, [prefersReducedMotion])
}