import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";

const STATUS = { idle: "idle", sending: "sending", success: "success", error: "error" };

const Contact = () => {
    const formRef = useRef();
    const [status, setStatus] = useState(STATUS.idle);
    const [errorMsg, setErrorMsg] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus(STATUS.sending);
        setErrorMsg("");

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
            )
            .then(
                () => {
                    setStatus(STATUS.success);
                    formRef.current?.reset();
                },
                (err) => {
                    setStatus(STATUS.error);
                    setErrorMsg(err?.text || "something went wrong");
                }
            );
    };

    const submitLabel = {
        [STATUS.idle]: "submit",
        [STATUS.sending]: "sending...",
        [STATUS.success]: "✓ sent",
        [STATUS.error]: "retry",
    }[status];

    return (
        <section id="contact" className={styles.contactContainer}>
            <h2 className={styles.title}>
                <span>#</span>contact
            </h2>

            <div className={styles.layout}>
                <div className={styles.intro}>
                    <p>
                        For audits, security research, or contest reviews,
                        drop a message below. Channels on the left for direct
                        contact.
                    </p>

                    <ul className={styles.altMethods}>
                        <li>
                            <span className={styles.key}>email</span>
                            <a href="mailto:kamensec@proton.me">
                                kamensec@proton.me
                            </a>
                        </li>
                        <li>
                            <span className={styles.key}>telegram</span>
                            <a
                                href="https://telegram.me/kamensec"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                @kamensec
                            </a>
                        </li>
                        <li>
                            <span className={styles.key}>x</span>
                            <a
                                href="https://x.com/kamensec"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                @kamensec
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={styles.terminal}>
                    <div className={styles.topbar}>
                        <span className={`${styles.dot} ${styles.dotR}`}></span>
                        <span className={`${styles.dot} ${styles.dotY}`}></span>
                        <span className={`${styles.dot} ${styles.dotG}`}></span>
                        <span className={styles.topbarTitle}>
                            kamensec ~ /contact
                        </span>
                    </div>

                    <form
                        ref={formRef}
                        onSubmit={sendEmail}
                        className={styles.form}
                        noValidate
                    >
                        <label className={styles.field}>
                            <span className={styles.prompt}>&gt; name:</span>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="your name"
                                autoComplete="name"
                            />
                        </label>

                        <label className={styles.field}>
                            <span className={styles.prompt}>&gt; email:</span>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="you@example.com"
                                autoComplete="email"
                            />
                        </label>

                        <label className={styles.field}>
                            <span className={styles.prompt}>&gt; message:</span>
                            <textarea
                                rows={6}
                                name="message"
                                required
                                placeholder="what's on your mind"
                            />
                        </label>

                        <button
                            type="submit"
                            className={styles.submit}
                            disabled={status === STATUS.sending}
                            data-status={status}
                        >
                            {submitLabel}
                        </button>

                        {status === STATUS.success && (
                            <p className={styles.success} role="status">
                                ✓ message sent — I&apos;ll reply soon
                            </p>
                        )}
                        {status === STATUS.error && (
                            <p className={styles.error} role="alert">
                                ✗ {errorMsg}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
