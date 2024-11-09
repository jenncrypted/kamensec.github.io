import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <section>
      <hr />
      <section>
        <section className={styles.footerContainer}>
          <section className={styles.infoName}>
            Independent Security Researcher
          </section>
          <section className={styles.contactInfo}>
            <a href="mailto:kamensec@proton.me">kamensec@proton.me</a>
            <br />
          </section>
        </section>
      </section>
    </section>
  );
};

export default Footer;
