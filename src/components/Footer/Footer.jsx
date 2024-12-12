import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <section>
            <hr />
            <div>
                <div className={styles.footerContainer}>
                    <div className={styles.infoName}>Made with love</div>
                    <div className={styles.contactInfo}>
                        <a
                            // className={styles.blueText}
                            href="mailto:kamensec@proton.me"
                        >
                            <div className={styles.blueText}>
                                jenncrypted.io
                            </div>
                        </a>
                        <br />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
