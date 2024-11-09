import React from "react";
import { getImageUrl } from "../../utils";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.callToAction}>
          <h1 className={styles.title}>
            kamensec is an independent security researcher
          </h1>

          <p className={styles.description}>
            Dimitri is a security engineer with more than 3 years experience.
            His expertise is on EVM based projects with a range of work across
            staking, lending, options trading and AMM protocols.
          </p>
          <a href="mailto:kamensec@proton.me" className={styles.contactBtn}>
            contact
          </a>
        </div>
        <a href="#works">
          <div className={styles.scrollDown}></div>
        </a>

        <div className={styles.hackerWithLinesAndDotsContainer}>
          <img
            src={"assets/Hacker.png"}
            className={styles.heroImg}
            alt="Hacker"
          />
          <div className={styles.heroLines}>
            <img
              src={"assets/linesHacker.png"}
              className={styles.lineImg}
              alt="Lines"
            />
          </div>
          <div className={styles.heroDots}>
            <img
              src={"assets/Dots.png"}
              className={styles.dotImage}
              alt="dots"
            />
          </div>
          <div className={styles.linesPhrase}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
