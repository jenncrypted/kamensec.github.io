import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils.js";

const Navbar = () => {
    const [menuOpen, setmenuOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div>
                <a className={styles.title}></a>
            </div>
            <div className={styles.menu}>
                <img
                    className={styles.menuBtn}
                    src={
                        menuOpen
                            ? "assets/closeIcon.png"
                            : "assets/openIcon.png"
                    }
                    alt="menu-Icon"
                    onClick={() => setmenuOpen(!menuOpen)}
                />
                <ul
                    className={`${styles.menuItems} ${
                        menuOpen && styles.menuOpen
                    }`}
                    onClick={() => setmenuOpen(false)}
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
            </div>
        </nav>
    );
};

export default Navbar;
