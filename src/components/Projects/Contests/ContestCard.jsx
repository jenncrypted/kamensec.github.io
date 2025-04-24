import React from "react";
import project from "../Projects";
import styles from "./ContestCard.module.css";
import classNames from "classnames";

/* @TODO: Please look over object destructuring, to properly understand what is happening
when we destructure props drilled down to ProjectCard */
const ContestCard = ({
    id,
    // project: { skills, title, description, source },
}) => {
    // const layoutClasses = classNames(styles.gridItem, styles[id]);

    // console.log({ skills, title, description, source });
    return <div>CONTEST 1</div>;
};

export default ContestCard;
