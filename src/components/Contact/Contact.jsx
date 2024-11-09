import React from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <section id="contact" className={styles.contactContainer}>
      <div className={styles.title}>
        <h2>#contact</h2>
        <p className={styles.contentInfo}>
          If you're interested in working together, don’t hesitate to contact me
        </p>
        <ul>
          <div className={styles.linksContainer}>
            <li className={styles.link}>
              <img src={"assets/telegramIcon.png"} alt="telegram icon" />
              <a href="https://telegram.me/kamensec" target="_blank"></a>
            </li>
            <li className={styles.link}>
              <img src={"assets/XLogo.png"} alt="X icon" />
              <a href="https://x.com/kamensec?s=11" target="_blank"></a>
            </li>
          </div>
        </ul>
      </div>
    </section>
  );
};

export default Contact;
