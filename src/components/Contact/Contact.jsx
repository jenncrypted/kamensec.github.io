import React, { useState } from "react";
import { useRef } from "react";
import styles from "./Contact.module.css";
import emailjs from "@emailjs/browser";

const Contact = () => {
    const ref = useRef();
    const formRef = useRef();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm("service_l2ec1go", "template_akpsdpc", formRef.current, {
                publicKey: "-oPQh8c8iyXvpX7yO",
            })
            .then(
                (result) => {
                    setSuccess(true);
                },
                (error) => {
                    setError(true);
                    console.log(error.text);
                }
            );
    };

    return (
        // <div>hehehe</div>
        <section id="contact" className={styles.contactContainer}>
            <div className={styles.title}>
                <h2>
                    <span>#</span>contact
                </h2>
            </div>
            <div className={styles.horizontalContactContainer}>
                <p className={styles.contentInfo}>
                    If you are interested in working together, contact me here:
                </p>
                <div className={styles.formContainer}>
                    <form ref={formRef} onSubmit={sendEmail}>
                        <input
                            type="text"
                            required
                            placeholder="Name"
                            name="name"
                        />
                        <input
                            type="text"
                            required
                            placeholder="Email"
                            name="email"
                        />
                        <textarea
                            rows={8}
                            placeholder="Message"
                            name="message"
                        />
                        <button>{success ? "Sent" : "Submit"}</button>
                        {error && "Error"}
                    </form>
                </div>
            </div>
        </section>
    );
    // };
};

export default Contact;
