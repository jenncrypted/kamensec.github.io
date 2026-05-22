import { useEffect, useRef } from "react";
import styles from "./HeroAnimation.module.css";

const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

const HeroAnimation = () => {
    const holeRef = useRef(null);
    const rabbitRef = useRef(null);

    useEffect(() => {
        const hole = holeRef.current;
        const rabbit = rabbitRef.current;
        if (!hole || !rabbit) return;

        const isTouch = window.matchMedia(
            "(hover: none) and (pointer: coarse)"
        ).matches;
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const holeSize = isTouch ? 220 : 275;
        const halfHole = holeSize / 2;

        const rabbitRect = rabbit.getBoundingClientRect();
        const rabbitX = rabbitRect.left + rabbitRect.width / 2 - halfHole;
        const rabbitY = rabbitRect.top + rabbitRect.height / 2 - halfHole;

        let currentX = rabbitX;
        let currentY = rabbitY;
        let targetX = rabbitX;
        let targetY = rabbitY;
        let rafId = null;
        let orbitAborted = false;

        const applyTransform = () => {
            hole.style.transform = `translate(${currentX}px, ${currentY}px)`;
        };

        applyTransform();

        // Smooth follow loop (lerp) — used for mouse / touch input
        const followLerp = () => {
            const dx = targetX - currentX;
            const dy = targetY - currentY;

            if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
                currentX = targetX;
                currentY = targetY;
                applyTransform();
                rafId = null;
                return;
            }

            currentX += dx * 0.18;
            currentY += dy * 0.18;
            applyTransform();
            rafId = requestAnimationFrame(followLerp);
        };

        const setTarget = (x, y) => {
            targetX = x;
            targetY = y;
            if (rafId === null) {
                rafId = requestAnimationFrame(followLerp);
            }
        };

        // Timed animate-to (used for the mobile orbit segments)
        const animateTo = (toX, toY, duration) =>
            new Promise((resolve) => {
                const fromX = currentX;
                const fromY = currentY;
                const start = performance.now();

                const tick = (now) => {
                    if (orbitAborted) {
                        resolve();
                        return;
                    }
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = easeInOutSine(progress);

                    currentX = fromX + (toX - fromX) * eased;
                    currentY = fromY + (toY - fromY) * eased;
                    applyTransform();

                    if (progress < 1) {
                        requestAnimationFrame(tick);
                    } else {
                        targetX = currentX;
                        targetY = currentY;
                        resolve();
                    }
                };

                requestAnimationFrame(tick);
            });

        const runOrbit = async () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const offscreenMargin = 80;

            currentX = -offscreenMargin;
            currentY = 60;
            applyTransform();

            const points = [
                { x: w - holeSize + offscreenMargin, y: 60, dur: 2400 },
                { x: w - holeSize + offscreenMargin, y: h * 0.55, dur: 1800 },
                { x: -offscreenMargin, y: h * 0.55, dur: 1800 },
                { x: rabbitX, y: rabbitY, dur: 1800 },
            ];

            for (const p of points) {
                if (orbitAborted) return;
                await animateTo(p.x, p.y, p.dur);
            }
        };

        if (isTouch && !reducedMotion) {
            runOrbit();
        }

        // ===== Event handlers =====
        const handleMouseMove = (event) => {
            setTarget(event.clientX - halfHole, event.clientY - halfHole);
        };

        const handleTouchStart = (event) => {
            // Kill the orbit instantly on first touch
            orbitAborted = true;
            const touch = event.touches[0];
            if (touch) {
                setTarget(
                    touch.clientX - halfHole,
                    touch.clientY - halfHole
                );
            }
        };

        const handleTouchMove = (event) => {
            orbitAborted = true;
            const touch = event.touches[0];
            if (!touch) return;
            setTarget(touch.clientX - halfHole, touch.clientY - halfHole);
        };

        if (isTouch) {
            window.addEventListener("touchstart", handleTouchStart, {
                passive: true,
            });
            window.addEventListener("touchmove", handleTouchMove, {
                passive: true,
            });
        } else {
            window.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchstart", handleTouchStart);
            orbitAborted = true;
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className={styles.animationContainer}>
            <div className={styles.wall}>
                <div ref={holeRef} className={styles.hole}></div>
            </div>
            <div className={styles.rabbitContainer}>
                <img
                    ref={rabbitRef}
                    src={"assets/white-rabbit.png"}
                    className={styles.rabbitImage}
                    alt=""
                    width="500"
                    height="500"
                    fetchPriority="high"
                />
            </div>
        </div>
    );
};

export default HeroAnimation;
