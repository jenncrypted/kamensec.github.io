import React, { useEffect, useRef } from "react";
import styles from "./HeroAnimation.module.css";
import { gsap } from "gsap";

const HeroAnimation = () => {
    const holeRef = useRef(null);
    const rabbitRef = useRef(null);

    useEffect(() => {
        const rabbitElement = rabbitRef.current;
        if (!rabbitElement) return;

        const isTouch = window.matchMedia(
            "(hover: none) and (pointer: coarse)"
        ).matches;
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        // hole size must match CSS (275 desktop / 220 mobile)
        const holeSize = isTouch ? 220 : 275;
        const halfHole = holeSize / 2;

        const rabbitRect = rabbitElement.getBoundingClientRect();
        const rabbitX =
            rabbitRect.left + rabbitRect.width / 2 - halfHole;
        const rabbitY =
            rabbitRect.top + rabbitRect.height / 2 - halfHole;

        let orbitTimeline = null;

        if (isTouch && !reducedMotion) {
            // Mobile: hole orbits the screen, then settles on the rabbit
            const w = window.innerWidth;
            const h = window.innerHeight;
            const offscreenMargin = 80; // keeps a piece of the hole on screen

            gsap.set(holeRef.current, {
                x: -offscreenMargin,
                y: 60,
            });

            orbitTimeline = gsap.timeline();
            orbitTimeline
                .to(holeRef.current, {
                    x: w - holeSize + offscreenMargin,
                    y: 60,
                    duration: 2.4,
                    ease: "sine.inOut",
                })
                .to(holeRef.current, {
                    x: w - holeSize + offscreenMargin,
                    y: h * 0.55,
                    duration: 1.8,
                    ease: "sine.inOut",
                })
                .to(holeRef.current, {
                    x: -offscreenMargin,
                    y: h * 0.55,
                    duration: 1.8,
                    ease: "sine.inOut",
                })
                .to(holeRef.current, {
                    x: rabbitX,
                    y: rabbitY,
                    duration: 1.8,
                    ease: "power2.out",
                });
        } else {
            // Desktop (or reduced-motion): centered on the rabbit
            gsap.set(holeRef.current, { x: rabbitX, y: rabbitY });
        }

        const handleMouseMove = (event) => {
            gsap.to(holeRef.current, {
                x: event.clientX - halfHole,
                y: event.clientY - halfHole,
                duration: 0.4,
                overwrite: true,
            });
        };

        const handleTouchMove = (event) => {
            if (orbitTimeline) {
                orbitTimeline.kill();
                orbitTimeline = null;
            }
            const touch = event.touches[0];
            if (!touch) return;
            gsap.to(holeRef.current, {
                x: touch.clientX - halfHole,
                y: touch.clientY - halfHole,
                duration: 0.3,
                overwrite: true,
            });
        };

        if (isTouch) {
            window.addEventListener("touchmove", handleTouchMove, {
                passive: true,
            });
        } else {
            window.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            if (orbitTimeline) orbitTimeline.kill();
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
                />
            </div>
        </div>
    );
};

export default HeroAnimation;
