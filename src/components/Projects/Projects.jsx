import React, { useMemo, useState } from "react";
import styles from "./Projects.module.css";
import audits from "../data/projects.json";
import contests from "../data/contests.json";
import judging from "../data/judging.json";
import AuditCard from "./AuditCard";
import ContestCard from "./ContestCard";

const TABS = [
    { id: "audits", label: "audits" },
    { id: "contests", label: "contests" },
    { id: "judging", label: "judging" },
];

const Projects = () => {
    const [activeTab, setActiveTab] = useState("audits");

    const auditStats = useMemo(() => {
        const firms = new Set(audits.map((a) => a.firm));
        const years = audits.map((a) => a.year).filter(Boolean);
        const yearsSpan = years.length
            ? `${Math.max(...years) - Math.min(...years) + 1}y+`
            : "—";
        return [
            { num: audits.length, label: "audits" },
            { num: firms.size, label: "firms" },
            { num: yearsSpan, label: "experience" },
            { num: "EVM", label: "specialty" },
        ];
    }, []);

    const contestStats = useMemo(() => {
        const platforms = new Set(contests.map((c) => c.platform));
        const highFindings = contests.reduce(
            (sum, c) => sum + (c.findings?.high?.length || 0),
            0
        );
        return [
            { num: contests.length, label: "contests" },
            { num: platforms.size, label: "platforms" },
            { num: highFindings, label: "high findings" },
        ];
    }, []);

    const judgingStats = useMemo(
        () => [
            { num: judging.length || "—", label: "reviewed" },
            { num: "—", label: "contests judged" },
            { num: "—", label: "platforms" },
        ],
        []
    );

    const stats =
        activeTab === "audits"
            ? auditStats
            : activeTab === "contests"
            ? contestStats
            : judgingStats;

    const tabCounts = {
        audits: audits.length,
        contests: contests.length,
        judging: judging.length || "soon",
    };

    return (
        <section id="works" className={styles.container}>
            <h2 className={styles.title}>
                <span>#</span>projects
            </h2>

            {/* Tabs */}
            <div className={styles.tabs} role="tablist" aria-label="project categories">
                {TABS.map(({ id, label }) => (
                    <button
                        key={id}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === id}
                        aria-controls={`panel-${id}`}
                        id={`tab-${id}`}
                        className={`${styles.tab} ${
                            activeTab === id ? styles.activeTab : ""
                        }`}
                        onClick={() => setActiveTab(id)}
                    >
                        <span className={styles.hash}>#</span>
                        {label}
                        <span className={styles.count}>
                            {tabCounts[id]}
                        </span>
                    </button>
                ))}
            </div>

            {/* Stat block (dynamic per tab) */}
            <div className={styles.stats} aria-label="summary">
                {stats.map((s) => (
                    <div key={s.label} className={styles.stat}>
                        <div className={styles.statNum}>{s.num}</div>
                        <div className={styles.statLabel}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Panel */}
            <div
                role="tabpanel"
                id={`panel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
            >
                {activeTab === "audits" && (
                    <div className={styles.grid}>
                        {audits.map((audit, id) => (
                            <AuditCard key={id} audit={audit} />
                        ))}
                    </div>
                )}

                {activeTab === "contests" && (
                    <div className={styles.grid}>
                        {contests.map((contest, id) => (
                            <ContestCard key={id} contest={contest} />
                        ))}
                    </div>
                )}

                {activeTab === "judging" && (
                    <div className={styles.placeholder}>
                        <p className={styles.phTitle}>
                            <span>// </span>coming soon
                        </p>
                        <p className={styles.phSub}>
                            Judging history will appear here as it's added.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
