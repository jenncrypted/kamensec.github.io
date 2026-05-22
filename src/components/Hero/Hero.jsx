import styles from "./Hero.module.css";
import HeroAnimation from "./HeroAnimation";

const Hero = () => {
    return (
        <section className={styles.containerNoPadding}>
            <div className={styles.contentRelativeContainer}>
                <div className={styles.content}>
                    <div className={styles.callToAction}>
                        <h1 className={styles.title}>
                            kamensec<span className={styles.cursor} aria-hidden="true"></span>
                        </h1>
                        <p className={styles.subtitle}>
                            independent <span>security researcher</span>
                        </p>

                        <p className={styles.description}>
                            Dimitri is a security engineer with more than 3
                            years experience. His expertise is on EVM based
                            projects with a range of work across staking,
                            lending, options trading and AMM protocols.
                        </p>

                        <div className={styles.ctas}>
                            <a
                                href="https://telegram.me/kamensec"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.contactBtn}
                            >
                                contact
                            </a>
                            <a
                                href="#works"
                                className={styles.ghostBtn}
                            >
                                view audits ↓
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <HeroAnimation />
        </section>
    );
};

export default Hero;
