import React from "react";
import styles from "./Socials.module.css";
import Github from "./Github.svg";
import Twitter from "./Twitter.svg";
import Telegram from "./Telegram.svg";

const LINKS = [
    { href: "https://github.com/kamensec", label: "GitHub", icon: Github },
    {
        href: "https://telegram.me/kamensec",
        label: "Telegram",
        icon: Telegram,
    },
    { href: "https://x.com/kamensec", label: "X (Twitter)", icon: Twitter },
];

const Socials = () => {
    return (
        <div className={styles.redesContainer}>
            <div className={styles.lineContainer}>
                <hr />
            </div>
            <ul className={styles.logosSocialMedia}>
                {LINKS.map(({ href, label, icon }) => (
                    <li key={label}>
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                        >
                            <img
                                src={icon}
                                alt=""
                                width="24"
                                height="24"
                            />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Socials;
