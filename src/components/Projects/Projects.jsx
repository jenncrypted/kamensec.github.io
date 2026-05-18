import React, { useMemo } from "react";
import styles from "./Projects.module.css";
import projects from "../data/projects.json";
import ProjectCard from "./ProjectCard";

const Projects = () => {
    const stats = useMemo(() => {
        const firms = new Set(projects.map((p) => p.firm));
        const years = projects.map((p) => p.year).filter(Boolean);
        const yearsSpan = years.length
            ? `${Math.max(...years) - Math.min(...years) + 1}y+`
            : "—";
        return {
            audits: projects.length,
            firms: firms.size,
            experience: yearsSpan,
        };
    }, []);

    return (
        <section id="works" className={styles.container}>
            <h2 className={styles.title}>
                <span>#</span>projects
            </h2>

            <div className={styles.stats} aria-label="audit summary">
                <div className={styles.stat}>
                    <div className={styles.statNum}>{stats.audits}</div>
                    <div className={styles.statLabel}>audits</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.statNum}>{stats.firms}</div>
                    <div className={styles.statLabel}>firms</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.statNum}>{stats.experience}</div>
                    <div className={styles.statLabel}>experience</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.statNum}>EVM</div>
                    <div className={styles.statLabel}>specialty</div>
                </div>
            </div>

            <div className={styles.grid}>
                {projects.map((project, id) => (
                    <ProjectCard key={id} project={project} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
