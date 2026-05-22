import styles from "./Footer.module.css";

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className={styles.footer}>
            <hr className={styles.divider} />
            <p className={styles.signature}>
                Made with <span className={styles.heart}>♥</span> by{" "}
                <a
                    href="https://jenncrypted.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    jenncrypted.io
                </a>{" "}
                · © {year}
            </p>
        </footer>
    );
};

export default Footer;
