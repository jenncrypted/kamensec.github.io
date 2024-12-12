import React from "react";
import styles from "./About.module.css";

const About = () => {
    return (
        <section id="about-me" className={styles.aboutContainer}>
            <h2 className={styles.title}>
                <span>#</span>about-me
            </h2>
            <div className={styles.contentContainer}>
                <div className={styles.aboutHackerWithDots}>
                    <img
                        src={"assets/hooded-hacker-2.png"}
                        className={styles.heroImg}
                        alt="Hacker"
                    />
                </div>
                <div className={styles.descriptionContainer}>
                    <p>
                        I’m Dimitri Kamenski, a cybersecurity researcher and
                        auditor specializing in web3 and blockchain security.
                        With a background in both traditional Web2 security and
                        advanced blockchain ecosystems, I bring a rigorous,
                        test-centric approach to smart contract auditing and
                        protocol security.{" "}
                    </p>
                    <br />
                    <p>
                        Over the years, I’ve led security assessments for high
                        TVL projects like EigenLayer, Renzo, and RocketPool,
                        honing a deep understanding of DeFi, staking, lending,
                        and options protocols. My work combines hands-on
                        expertise in EVM and beyond, ensuring that each audit
                        delivers resilience, precision, and insight for today’s
                        rapidly evolving decentralized landscape.
                    </p>
                </div>
            </div>
        </section>
    );
};
export default About;
