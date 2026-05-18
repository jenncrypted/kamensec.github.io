import React, { useState } from "react";
import styles from "./ContestCard.module.css";

const SEVERITY_LABEL = {
    high: "high",
    medium: "med",
    low: "low",
};

const ContestCard = ({ contest }) => {
    const { platform, title, date, findings = {} } = contest;
    const [expanded, setExpanded] = useState(false);

    // Flatten findings into a single ordered list with severity attached
    const allFindings = ["high", "medium", "low"].flatMap((severity) =>
        (findings[severity] || []).map((f) => ({ ...f, severity }))
    );

    const counts = {
        high: findings.high?.length || 0,
        medium: findings.medium?.length || 0,
        low: findings.low?.length || 0,
    };

    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <span className={styles.prompt}>$</span>contest{" "}
                <span className={styles.flag}>--platform</span>={platform}
            </header>

            <div className={styles.body}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.scope}>{date}</p>

                <div className={styles.summary}>
                    {counts.high > 0 && (
                        <span
                            className={`${styles.sevBadge} ${styles.high}`}
                        >
                            {counts.high} high
                        </span>
                    )}
                    {counts.medium > 0 && (
                        <span
                            className={`${styles.sevBadge} ${styles.med}`}
                        >
                            {counts.medium} med
                        </span>
                    )}
                    {counts.low > 0 && (
                        <span
                            className={`${styles.sevBadge} ${styles.low}`}
                        >
                            {counts.low} low
                        </span>
                    )}
                </div>

                <ul
                    className={`${styles.findingsList} ${
                        expanded ? styles.expanded : ""
                    }`}
                >
                    {allFindings.map((f, i) => (
                        <li key={i}>
                            <a
                                href={f.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.finding}
                            >
                                <span
                                    className={`${styles.dot} ${
                                        styles[
                                            f.severity === "medium"
                                                ? "med"
                                                : f.severity
                                        ]
                                    }`}
                                    aria-label={SEVERITY_LABEL[f.severity]}
                                ></span>
                                <span className={styles.titleText}>
                                    {f.title}
                                </span>
                                <span className={styles.arrow} aria-hidden="true">
                                    ↗
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>

                {allFindings.length > 0 && (
                    <button
                        type="button"
                        className={styles.toggleBtn}
                        onClick={() => setExpanded((v) => !v)}
                        aria-expanded={expanded}
                    >
                        {expanded
                            ? "hide findings ↑"
                            : `show findings ↓`}
                    </button>
                )}
            </div>
        </article>
    );
};

export default ContestCard;
