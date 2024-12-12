import React, { useState } from "react";
import styles from "./Socials.module.css";
// import { getImageUrl } from "../../utils.js";
import Github from "./Github.svg";
import Twitter from "./Twitter.svg";
import Telegram from "./Telegram.svg";

const Socials = () => {
  return (
    <div className={styles.redesContainer}>
      <div className={styles.lineContainer}>
        <hr></hr>
      </div>
      <div className={styles.logosSocialMedia}>
        <div>
          <a href="https://github.com/kamensec" target="_blank">
            <img src={Github} />
          </a>
        </div>
        <div>
          <a href="https://telegram.me/kamensec" target="_blank">
            <img src={Telegram} />
          </a>
        </div>
        <div>
          <a href="https://x.com/kamensec" target="_blank">
            <img src={Twitter} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Socials;
