import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const SECTIONS = [
    { id: "works", label: "projects" },
    { id: "about-me", label: "about-me" },
    { id: "contact", label: "contact" },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );

        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className={styles.navbar} aria-label="primary">
            <div className={styles.menu}>
                <button
                    type="button"
                    className={styles.menuBtn}
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label={menuOpen ? "close menu" : "open menu"}
                    aria-expanded={menuOpen}
                    aria-controls="primary-menu"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        {menuOpen ? (
                            <>
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </>
                        ) : (
                            <>
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </>
                        )}
                    </svg>
                </button>

                <ul
                    id="primary-menu"
                    className={`${styles.menuItems} ${
                        menuOpen ? styles.menuOpen : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                >
                    {SECTIONS.map(({ id, label }) => (
                        <li
                            key={id}
                            className={
                                activeId === id ? styles.activeItem : ""
                            }
                        >
                            #<a href={`#${id}`}>{label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
