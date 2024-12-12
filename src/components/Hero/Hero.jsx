import React from "react";
import { getImageUrl } from "../../utils";
import styles from "./Hero.module.css";
import HeroAnimation from "./HeroAnimation";

const Hero = () => {
    return (
        <section className={styles.containerNoPadding}>
            <div className={styles.contentRelativeContainer}>
                <div className={styles.content}>
                    <div className={styles.callToAction}>
                        <h1 className={styles.title}>
                            kamensec is an{" "}
                            <span>independent security researcher</span>
                        </h1>

                        <p className={styles.description}>
                            Dimitri is a security engineer with more than 3
                            years experience. His expertise is on EVM based
                            projects with a range of work across staking,
                            lending, options trading and AMM protocols.
                        </p>
                        <a
                            href="mailto:kamensec@proton.me"
                            className={styles.contactBtn}
                        >
                            contact
                        </a>
                    </div>
                    <a href="#works">
                        <div className={styles.scrollDown}></div>
                    </a>
                </div>
            </div>

            <HeroAnimation />
        </section>
    );
};

export default Hero;
