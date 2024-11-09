import React from "react";
import project from "./Projects";
import styles from "./ProjectCard.module.css";
import classNames from "classnames";

/* @TODO: Please look over object destructuring, to properly understand what is happening
when we destructure props drilled down to ProjectCard */
const ProjectCard = ({
  id,
  project: { skills, title, description, source },
}) => {
  // const layoutClasses = classNames(styles.gridItem, styles[id]);

  console.log({ skills, title, description, source });
  return (
    <div className={classNames(styles.gridItem, styles["layout" + id])}>
      <div className={styles.container}>
        <div className={styles.skills}>
          {skills.map((skill, id) => {
            return (
              <div key={id} className={styles.skills}>
                <div className={styles.projectTextPadding}>{skill}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.projectTextPadding}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.linkMargin}>
            <a className={styles.github} href={source} target="_blank">
              Github
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
