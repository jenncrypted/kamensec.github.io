import styles from "./AuditCard.module.css";

const AuditCard = ({ audit }) => {
    const { title, scope, firm, year, tags, stack, source } = audit;

    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <span className={styles.prompt}>$</span>audit{" "}
                <span className={styles.flag}>--year</span>={year}
            </header>

            <div className={styles.body}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.scope}>{scope}</p>

                <dl className={styles.meta}>
                    <dt>firm</dt>
                    <dd>{firm}</dd>
                    <dt>stack</dt>
                    <dd>{stack}</dd>
                    {tags && tags.length > 0 && (
                        <>
                            <dt>scope</dt>
                            <dd>{tags.join(" · ")}</dd>
                        </>
                    )}
                </dl>
            </div>

            <footer className={styles.footer}>
                <a
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.reportLink}
                >
                    view report ↗
                </a>
            </footer>
        </article>
    );
};

export default AuditCard;
