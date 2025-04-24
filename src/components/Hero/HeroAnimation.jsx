import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./HeroAnimation.module.css";

const HeroAnimation = () => {
    const holeRef = useRef(null);
    const rabbitRef = useRef(null);
    // keep the last mouse position
    const lastMouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const holeEl = holeRef.current;
        const rabbitEl = rabbitRef.current;
        const holeRadius = 125;
        const navBarHeight = 75;
        const offsetX = window.innerWidth * 0.05;

        // ensure absolute positioning
        holeEl.style.position = "absolute";

        // helper to move the hole based on page coords
        const moveHole = (pageX, pageY) => {
            gsap.to(holeEl, {
                duration: 0.3,
                x: pageX - holeRadius - offsetX,
                y: pageY - holeRadius - navBarHeight / 2,
                overwrite: true,
            });
        };

        // initial placement at rabbit center (on mount/resize)
        const placeAtRabbit = () => {
            const rect = rabbitEl.getBoundingClientRect();
            const centerX = rect.left + 100;
            const centerY = rect.top + 200;
            moveHole(centerX, centerY);
        };
        placeAtRabbit();
        window.addEventListener("resize", placeAtRabbit);

        // track mouse
        const onMouseMove = (e) => {
            lastMouse.current = { x: e.clientX, y: e.clientY };
            moveHole(e.pageX, e.pageY);
        };
        window.addEventListener("mousemove", onMouseMove);

        // on scroll, re‐apply at last mouse position + new scroll
        // (throttle via requestAnimationFrame for perf)
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const { x, y } = lastMouse.current;
                    moveHole(x + window.scrollX, y + window.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("resize", placeAtRabbit);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("scroll", onScroll);
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
                    src="assets/white-rabbit.png"
                    className={styles.rabbitImage}
                    alt="Hacker"
                />
            </div>
            <div className={styles.linesPhrase}></div>
        </div>
    );
};

export default HeroAnimation;
