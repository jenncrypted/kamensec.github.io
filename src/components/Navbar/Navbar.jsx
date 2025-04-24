import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils.js";

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 668px)"); // You can adjust the breakpoint

        const handleResize = () => setIsMobile(mediaQuery.matches);

        // Set initial value
        handleResize();

        // Listen for changes
        mediaQuery.addEventListener("change", handleResize);

        return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);

    return (
        <nav className={styles.navbar}>
            <div>
                <a className={styles.title}></a>
            </div>
            <div className={styles.menu}>
                {isMobile ? (
                    <img
                        className={styles.menuBtn}
                        src={
                            isMenuOpen
                                ? "public/assets/closeIcon.png"
                                : "public/assets/openIcon.png"
                        }
                        alt={isMenuOpen ? "Close menu" : "Open menu"}
                        onClick={() => setMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    />
                ) : (
                    <></>
                )}

                {isMenuOpen || !isMobile ? (
                    <ul
                        className={`${styles.menuItems}`}
                        // onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <li>
                            #<a href="#works">projects</a>
                        </li>
                        <li>
                            #<a href="#about-me">about-me</a>
                        </li>
                        <li>
                            #<a href="#contact">contact</a>
                        </li>
                    </ul>
                ) : (
                    <></>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
