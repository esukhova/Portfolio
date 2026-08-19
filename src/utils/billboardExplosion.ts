type ParticleType = 'fire' | 'smoke' | 'debris' | 'spark';
type DebrisKind = 'cylinder';

interface Particle {
    type: ParticleType;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
    stroke?: string;
    rotation: number;
    rotationSpeed: number;
    width: number;
    height: number;
    alpha: number;
    seed: number;
    scaleX: number;
    scaleY: number;
    debrisKind?: DebrisKind;
    accentColor?: string;
    smokeInner?: string;
    smokeMid?: string;
    smokeOuter?: string;
}

const EXPLOSION_SCALE = 1.5;
const EXPLOSION_ANCHOR_Y = 0.92;

const SMOKE_PALETTES = [
    { inner: '#ebe4f2', mid: '#8d8498', outer: '#2f2d34' },
    { inner: '#ddd6ea', mid: '#6f667a', outer: '#242228' },
    { inner: '#cfc7dd', mid: '#5a5364', outer: '#1a191d' },
    { inner: '#f0e8f5', mid: '#9a8fad', outer: '#3a3640' },
    { inner: '#b8b0c4', mid: '#4a4552', outer: '#151418' },
];

const DRAW_ORDER: Record<ParticleType, number> = {
    smoke: 0,
    debris: 1,
    fire: 2,
    spark: 3,
};

function rand(min: number, max: number) {
    return min + Math.random() * (max - min);
}

function pick<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}

function s(value: number) {
    return value * EXPLOSION_SCALE;
}

function spawnFire(particles: Particle[], cx: number, cy: number, burst = 1) {
    const count = Math.floor(12 * burst);

    for (let i = 0; i < count; i += 1) {
        const angle = rand(-Math.PI * 1.05, -Math.PI * 0.05);
        const speed = s(rand(1.2, 6.5 * burst));

        particles.push({
            type: 'fire',
            x: cx + s(rand(-14, 14)),
            y: cy + s(rand(-18, 6)),
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - s(rand(0.8, 3)),
            life: rand(380, 720),
            maxLife: 720,
            size: s(rand(18, 42 * burst)),
            color: pick(['#c9782a', '#b85a18', '#a63a12', '#8f2808']),
            stroke: '#3a1808',
            rotation: rand(-0.4, 0.4),
            rotationSpeed: rand(-0.04, 0.04),
            width: 0,
            height: 0,
            alpha: rand(0.72, 0.88),
            seed: rand(0, Math.PI * 2),
            scaleX: rand(0.92, 1.18),
            scaleY: rand(0.95, 1.28),
        });
    }
}

function spawnSmoke(particles: Particle[], cx: number, cy: number, burst = 1) {
    const count = Math.floor(18 * burst);

    for (let i = 0; i < count; i += 1) {
        const angle = rand(-Math.PI * 0.95, -Math.PI * 0.08);
        const layer = pick(SMOKE_PALETTES);

        particles.push({
            type: 'smoke',
            x: cx + s(rand(-36, 36)),
            y: cy + s(rand(-28, 10)),
            vx: Math.cos(angle) * s(rand(0.3, 2.4)),
            vy: Math.sin(angle) * s(rand(0.6, 2.4)) - s(rand(0.4, 1.8)),
            life: rand(1100, 2400),
            maxLife: 2400,
            size: s(rand(22, 52 * burst)),
            color: layer.mid,
            rotation: rand(0, Math.PI * 2),
            rotationSpeed: rand(-0.015, 0.015),
            width: 0,
            height: 0,
            alpha: rand(0.28, 0.48),
            seed: rand(0, Math.PI * 2),
            scaleX: rand(1.1, 1.8),
            scaleY: rand(0.9, 1.35),
            smokeInner: layer.inner,
            smokeMid: layer.mid,
            smokeOuter: layer.outer,
        });
    }
}

function spawnDebris(particles: Particle[], cx: number, cy: number) {
    const baseWidth = s(rand(14, 24));
    const baseHeight = s(rand(28, 52));
    const sizeMultipliers = [2, 2, 2, 0.5, 0.5];

    for (const sizeMultiplier of sizeMultipliers) {
        const angle = rand(-Math.PI * 1.05, -Math.PI * 0.02);
        const speed = s(rand(3.5, 12));
        const color = pick(['#080220', '#0a0428', '#0d0530', '#100638', '#12063a']);
        const accent = pick(['#12063a', '#150840', '#180948', '#1a0a4a']);

        particles.push({
            type: 'debris',
            x: cx + s(rand(-42, 42)),
            y: cy + s(rand(-36, 12)),
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - s(rand(1.5, 5)),
            life: rand(1000, 1800),
            maxLife: 1800,
            size: 0,
            color,
            accentColor: accent,
            stroke: '#040114',
            rotation: rand(0, Math.PI * 2),
            rotationSpeed: rand(-0.16, 0.16),
            width: baseWidth * sizeMultiplier,
            height: baseHeight * sizeMultiplier,
            alpha: 1,
            seed: rand(0, Math.PI * 2),
            scaleX: 1,
            scaleY: 1,
            debrisKind: 'cylinder',
        });
    }
}

function spawnSparks(particles: Particle[], cx: number, cy: number) {
    for (let i = 0; i < 12; i += 1) {
        const angle = rand(-Math.PI, 0);
        const speed = s(rand(6, 15));

        particles.push({
            type: 'spark',
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: rand(180, 420),
            maxLife: 420,
            size: s(rand(2, 5)),
            color: '#fff8c4',
            stroke: '#ff7a00',
            rotation: 0,
            rotationSpeed: 0,
            width: 0,
            height: 0,
            alpha: 1,
            seed: 0,
            scaleX: 1,
            scaleY: 1,
        });
    }
}

function drawFirePuff(ctx: CanvasRenderingContext2D, particle: Particle, progress: number) {
    const size = particle.size * (0.75 + progress * 0.95);
    const stretchX = particle.scaleX * (0.9 + Math.sin(particle.seed) * 0.16);
    const stretchY = particle.scaleY * (0.94 + Math.cos(particle.seed * 1.35) * 0.14);
    const tilt = particle.seed * 0.22 + Math.sin(particle.seed * 2.4) * 0.12;
    const lobeX = Math.sin(particle.seed * 3.1) * size * 0.2;
    const lobeY = Math.cos(particle.seed * 2.2) * size * 0.14 - size * 0.04;

    ctx.save();
    ctx.rotate(tilt);
    ctx.scale(stretchX, stretchY);

    const haloGrad = ctx.createRadialGradient(lobeX, lobeY, size * 0.08, lobeX, lobeY, size * 1.32);
    haloGrad.addColorStop(0, 'rgba(201, 160, 74, 0.2)');
    haloGrad.addColorStop(0.34, 'rgba(168, 58, 12, 0.14)');
    haloGrad.addColorStop(0.6, 'rgba(120, 30, 6, 0.07)');
    haloGrad.addColorStop(0.8, 'rgba(74, 18, 4, 0.025)');
    haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.beginPath();
    ctx.fillStyle = haloGrad;
    ctx.ellipse(lobeX, lobeY, size * 1.02, size * 0.86, particle.seed * 0.18, 0, Math.PI * 2);
    ctx.fill();

    const bodyGrad = ctx.createRadialGradient(0, size * 0.04, size * 0.04, 0, 0, size * 0.96);
    bodyGrad.addColorStop(0, 'rgba(201, 160, 74, 0.52)');
    bodyGrad.addColorStop(0.26, `${particle.color}99`);
    bodyGrad.addColorStop(0.5, 'rgba(138, 34, 8, 0.38)');
    bodyGrad.addColorStop(0.7, 'rgba(74, 18, 4, 0.14)');
    bodyGrad.addColorStop(0.86, 'rgba(42, 10, 2, 0.04)');
    bodyGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.beginPath();
    ctx.fillStyle = bodyGrad;
    ctx.ellipse(0, 0, size * 0.78, size * 0.66, -particle.seed * 0.14, 0, Math.PI * 2);
    ctx.fill();

    const lobeGrad = ctx.createRadialGradient(lobeX, lobeY, 0, lobeX, lobeY, size * 0.62);
    lobeGrad.addColorStop(0, 'rgba(184, 90, 24, 0.34)');
    lobeGrad.addColorStop(0.42, 'rgba(138, 34, 8, 0.16)');
    lobeGrad.addColorStop(0.72, 'rgba(74, 18, 4, 0.05)');
    lobeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.beginPath();
    ctx.fillStyle = lobeGrad;
    ctx.ellipse(lobeX, lobeY, size * 0.52, size * 0.44, particle.seed * 0.32, 0, Math.PI * 2);
    ctx.fill();

    const coreGrad = ctx.createRadialGradient(0, size * 0.06, 0, 0, 0, size * 0.4);
    coreGrad.addColorStop(0, 'rgba(210, 170, 90, 0.34)');
    coreGrad.addColorStop(0.48, 'rgba(168, 58, 12, 0.14)');
    coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.beginPath();
    ctx.fillStyle = coreGrad;
    ctx.ellipse(0, size * 0.04, size * 0.28, size * 0.22, particle.seed * 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawSmokePuff(ctx: CanvasRenderingContext2D, particle: Particle, progress: number) {
    const radius = particle.size * (0.95 + progress * 1.65);
    const inner = particle.smokeInner ?? '#ddd6ea';
    const mid = particle.smokeMid ?? particle.color;
    const outer = particle.smokeOuter ?? '#2f2d34';

    ctx.save();
    ctx.scale(particle.scaleX, particle.scaleY);

    const haloGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 1.35);
    haloGrad.addColorStop(0, 'rgba(0,0,0,0)');
    haloGrad.addColorStop(0.18, `${outer}18`);
    haloGrad.addColorStop(0.42, `${outer}28`);
    haloGrad.addColorStop(0.68, `${outer}14`);
    haloGrad.addColorStop(0.88, `${outer}06`);
    haloGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.beginPath();
    ctx.fillStyle = haloGrad;
    ctx.ellipse(0, 0, radius * 1.18, radius * 0.96, particle.seed * 0.2, 0, Math.PI * 2);
    ctx.fill();

    const bodyGrad = ctx.createRadialGradient(0, -radius * 0.06, radius * 0.05, 0, 0, radius * 0.92);
    bodyGrad.addColorStop(0, `${inner}55`);
    bodyGrad.addColorStop(0.28, `${mid}44`);
    bodyGrad.addColorStop(0.52, `${mid}22`);
    bodyGrad.addColorStop(0.74, `${outer}12`);
    bodyGrad.addColorStop(0.9, `${outer}05`);
    bodyGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.beginPath();
    ctx.fillStyle = bodyGrad;
    ctx.ellipse(0, -radius * 0.04, radius * 0.78, radius * 0.62, -particle.seed * 0.15, 0, Math.PI * 2);
    ctx.fill();

    const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.48);
    coreGrad.addColorStop(0, `${inner}66`);
    coreGrad.addColorStop(0.35, `${mid}33`);
    coreGrad.addColorStop(0.62, `${mid}14`);
    coreGrad.addColorStop(0.82, `${outer}06`);
    coreGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.beginPath();
    ctx.fillStyle = coreGrad;
    ctx.ellipse(radius * 0.06, 0, radius * 0.38, radius * 0.3, particle.seed, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawDebrisPiece(ctx: CanvasRenderingContext2D, particle: Particle) {
    const w = particle.width;
    const h = particle.height;
    const accent = particle.accentColor ?? '#12063a';
    const radius = w / 2;
    const capRy = radius * 0.38;
    const topY = -h / 2;
    const bottomY = h / 2;

    ctx.lineWidth = 2;
    ctx.strokeStyle = particle.stroke ?? '#040114';
    ctx.lineJoin = 'round';

    const sideGrad = ctx.createLinearGradient(0, topY, 0, bottomY);
    sideGrad.addColorStop(0, accent);
    sideGrad.addColorStop(0.2, particle.color);
    sideGrad.addColorStop(0.75, particle.color);
    sideGrad.addColorStop(1, '#040114');

    ctx.fillStyle = sideGrad;
    ctx.beginPath();
    ctx.moveTo(-radius, topY);
    ctx.lineTo(-radius, bottomY);
    ctx.ellipse(0, bottomY, radius, capRy, 0, Math.PI, 0, true);
    ctx.lineTo(radius, topY);
    ctx.ellipse(0, topY, radius, capRy, 0, 0, Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.ellipse(0, topY, radius, capRy, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'rgba(80, 60, 140, 0.14)';
    ctx.beginPath();
    ctx.ellipse(-radius * 0.25, topY - capRy * 0.15, radius * 0.32, capRy * 0.4, -0.35, 0, Math.PI * 2);
    ctx.fill();
}

function isDebrisOffScreen(particle: Particle, width: number, height: number) {
    const margin = Math.max(particle.width, particle.height);

    return (
        particle.x < -margin
        || particle.x > width + margin
        || particle.y < -margin
        || particle.y > height + margin
    );
}

function drawParticle(ctx: CanvasRenderingContext2D, particle: Particle) {
    const progress = 1 - particle.life / particle.maxLife;

    ctx.save();

    let alpha = particle.alpha;
    if (particle.type === 'smoke') {
        alpha *= 1 - progress * 0.85;
    } else if (particle.type !== 'debris') {
        alpha *= 1 - progress * 0.95;
    }

    ctx.globalAlpha = alpha;
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation);

    if (particle.type === 'fire') {
        drawFirePuff(ctx, particle, progress);
    } else if (particle.type === 'smoke') {
        drawSmokePuff(ctx, particle, progress);
    } else if (particle.type === 'debris') {
        drawDebrisPiece(ctx, particle);
    } else {
        ctx.strokeStyle = particle.stroke ?? '#ff7a00';
        ctx.lineWidth = particle.size;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(particle.vx * 1.8, particle.vy * 1.8);
        ctx.stroke();
    }

    ctx.restore();
}

function updateParticle(particle: Particle) {
    if (particle.type === 'fire') {
        particle.vx *= 0.955;
        particle.vy *= 0.955;
        particle.vy -= 0.035;
        particle.rotation += particle.rotationSpeed;
        particle.scaleX *= 1.004;
        particle.scaleY *= 1.005;
    } else if (particle.type === 'smoke') {
        particle.vx *= 0.985;
        particle.vy -= 0.028;
        particle.rotation += particle.rotationSpeed;
        particle.scaleX += 0.0025;
        particle.scaleY += 0.0018;
    } else if (particle.type === 'debris') {
        particle.vy += 0.2 * EXPLOSION_SCALE;
        particle.vx *= 0.992;
        particle.rotation += particle.rotationSpeed;
    } else {
        particle.vx *= 0.93;
        particle.vy *= 0.93;
        particle.vy += 0.08 * EXPLOSION_SCALE;
    }

    particle.x += particle.vx;
    particle.y += particle.vy;
}

function drawBurst(ctx: CanvasRenderingContext2D, cx: number, cy: number, progress: number) {
    const lines = 14;
    const length = s(36 + progress * 130);

    ctx.save();
    ctx.globalAlpha = 1 - progress;
    ctx.strokeStyle = '#fff6b0';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    for (let i = 0; i < lines; i += 1) {
        const angle = (Math.PI * 2 * i) / lines - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * length, cy + Math.sin(angle) * length);
        ctx.stroke();
    }

    ctx.restore();
}

export function playBillboardExplosion(
    canvas: HTMLCanvasElement,
    onComplete?: () => void,
): () => void {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        onComplete?.();
        return () => undefined;
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = width * 0.5;
    const cy = height * EXPLOSION_ANCHOR_Y;
    const particles: Particle[] = [];
    const startedAt = performance.now();
    const duration = 3400;
    let rafId = 0;
    let fireBurst = 0;
    let smokeBurst = 0;

    spawnFire(particles, cx, cy, 1.5);
    spawnSparks(particles, cx, cy);
    spawnDebris(particles, cx, cy);

    const tick = (now: number) => {
        const elapsed = now - startedAt;

        if (elapsed > 160 && fireBurst < 2) {
            spawnFire(particles, cx, cy, 1.1);
            fireBurst += 1;
        }

        if (elapsed > 300 && fireBurst < 3) {
            spawnFire(particles, cx, cy, 0.75);
            fireBurst += 1;
        }

        if (elapsed > 240 && smokeBurst < 1) {
            spawnSmoke(particles, cx, cy, 0.9);
            smokeBurst += 1;
        }

        if (elapsed > 650 && smokeBurst < 2) {
            spawnSmoke(particles, cx, cy, 1.1);
            smokeBurst += 1;
        }

        if (elapsed > 1050 && smokeBurst < 3) {
            spawnSmoke(particles, cx, cy, 1);
            smokeBurst += 1;
        }

        if (elapsed > 1450 && smokeBurst < 4) {
            spawnSmoke(particles, cx, cy, 1.3);
            smokeBurst += 1;
        }

        if (elapsed > 1900 && smokeBurst < 5) {
            spawnSmoke(particles, cx, cy, 1.5);
            smokeBurst += 1;
        }

        ctx.clearRect(0, 0, width, height);

        if (elapsed < 260) {
            drawBurst(ctx, cx, cy, elapsed / 260);
        }

        for (let i = particles.length - 1; i >= 0; i -= 1) {
            const particle = particles[i];

            if (particle.type === 'debris') {
                continue;
            }

            particle.life -= 16;
            if (particle.life <= 0) {
                particles.splice(i, 1);
            }
        }

        for (let i = 0; i < particles.length; i += 1) {
            updateParticle(particles[i]);
        }

        for (let i = particles.length - 1; i >= 0; i -= 1) {
            const particle = particles[i];

            if (particle.type === 'debris' && isDebrisOffScreen(particle, width, height)) {
                particles.splice(i, 1);
            }
        }

        particles
            .slice()
            .sort((a, b) => DRAW_ORDER[a.type] - DRAW_ORDER[b.type])
            .forEach((particle) => drawParticle(ctx, particle));

        if (elapsed < duration || particles.length > 0) {
            rafId = requestAnimationFrame(tick);
            return;
        }

        ctx.clearRect(0, 0, width, height);
        onComplete?.();
    };

    rafId = requestAnimationFrame(tick);

    return () => {
        cancelAnimationFrame(rafId);
    };
}
