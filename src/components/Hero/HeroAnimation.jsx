import React, { useEffect, useRef } from "react";
import styles from "./HeroAnimation.module.css";
import { gsap } from "gsap";
// import { getImageUrl } from "../../utils.js";

const HeroAnimation = () => {
    const holeRef = useRef(null);
    const rabbitRef = useRef(null);

    useEffect(() => {
        const rabbitElement = rabbitRef.current;
        const rabbitRect = rabbitElement.getBoundingClientRect();

        gsap.set(holeRef.current, {
            x: rabbitRect.left + rabbitRect.width / 2 - 170, // Center hole on rabbit
            y: rabbitRect.top + rabbitRect.height / 2 - 50, // Center hole on rabbit
        });

        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            gsap.to(holeRef.current, {
                start: "top 50%",
                x: clientX - 200 / 2,
                y: clientY - 200 / 2,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className={styles.animationContainer}>
            {/* <div className={styles.relativeContainer}> */}
            <div className={styles.wall}>
                <div ref={holeRef} className={styles.hole}></div>
            </div>
            <div className={styles.rabbitContainer}>
                <img
                    ref={rabbitRef}
                    src={"assets/white-rabbit.png"}
                    className={styles.rabbitImage}
                    alt="Hacker"
                />
            </div>
            <div className={styles.linesPhrase}></div>
        </div>
    );
};

export default HeroAnimation;
