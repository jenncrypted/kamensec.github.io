import React, { useState } from "react";
import styles from "./Socials.module.css";
import { getImageUrl } from "../../utils.js";

const Socials = () => {
  return (
    <div className={styles.redesContainer}>
      <div className={styles.lineContainer}>
        <hr></hr>
      </div>
      <div className={styles.logosSocialMedia}>
        <div>
          <img
            className={styles.Github}
            src={"assets/Github.png"}
            alt={"Github"}
          />
          <a href="https://telegram.me/kamensec" target="_blank"></a>
        </div>
        <div>
          <img
            className={styles.telegram}
            src={"assets/telegram.png"}
            alt={"telegram"}
          />
          <a href="https://telegram.me/kamensec" target="_blank"></a>
        </div>
        <div>
          <img
            className={styles.twitter}
            src={"assets/twitter.png"}
            alt="twitter"
          />
          <a href="https://telegram.me/kamensec" target="_blank"></a>
        </div>
      </div>
    </div>
  );
};

export default Socials;
