import { useEffect, useRef, type RefObject } from 'react';
import { playBillboardExplosion } from '@/utils/billboardExplosion';
import {useMediaQuery} from "@/hooks/useMediaQuery";

type BillboardExplosionProps = {
    containerRef: RefObject<HTMLElement | null>;
    triggerKey: number;
};

export function BillboardExplosion({ containerRef, triggerKey }: BillboardExplosionProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stopRef = useRef<(() => void) | null>(null);

    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

    useEffect(() => {
        if (triggerKey === 0) {
            return undefined;
        }

        const canvas = canvasRef.current;
        if (!canvas || !containerRef.current) {
            return undefined;
        }

        if (prefersReducedMotion) return undefined;

        stopRef.current?.();
        stopRef.current = playBillboardExplosion(canvas);

        return () => {
            stopRef.current?.();
            stopRef.current = null;
        };
    }, [containerRef, triggerKey, prefersReducedMotion]);

    return (
        <canvas
            ref={canvasRef}
            className="intro-billboard-explosion"
            aria-hidden="true"
        />
    );
}
