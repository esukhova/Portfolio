import { useEffect } from 'react';
import {useMediaQuery} from "@/hooks/useMediaQuery";

export function useParallaxAttr(selector = '[data-parallax]') {
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

    useEffect(() => {

        if (prefersReducedMotion) {
            document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
                el.style.setProperty('--parallax-offset', '0px');
            });
            return;
        }

        let rafId: number | null = null;


        const update = () => {
            const els = document.querySelectorAll<HTMLElement>(selector);
            els.forEach((el) => {
                const speed = parseFloat(el.dataset.parallax || '0.3');
                const parent = el.parentElement;
                if (!parent) return;

                const rect = parent.getBoundingClientRect();
                // минус — чтобы при скролле вниз (rect.top уменьшается) картинка ехала вверх
                const offset =  (window.innerHeight / 2 - rect.top) * speed;
                el.style.setProperty('--parallax-offset', `${offset}px`);
            });

            rafId = null;
        };

        const onScroll = () => {
            if (rafId === null) rafId = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, [selector, prefersReducedMotion]);
}