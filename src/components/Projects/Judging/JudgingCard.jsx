import React from "react";
import project from "../Projects";
import styles from "./JudgingCard.module.css";
import classNames from "classnames";

/* @TODO: Please look over object destructuring, to properly understand what is happening
when we destructure props drilled down to ProjectCard */
const JudgingCard = ({
    id,
    project: { skills, title, description, source },
}) => {
    // const layoutClasses = classNames(styles.gridItem, styles[id]);

    console.log({ skills, title, description, source });
    return <div>JUDGING 1</div>;
};

export default JudgingCard;
