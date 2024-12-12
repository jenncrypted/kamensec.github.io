import React, { useRef } from "react";
import styles from "./Projects.module.css";
import projects from "../data/projects.json";
import ProjectCard from "./ProjectCard";
import Slider from "react-slick";

const Projects = () => {
  const sliderRef = useRef();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    responsive: [
      {
        breakpoint: 796,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <section id="works" className={styles.container}>
      <h2 className={styles.title}>
        <span>#</span>projects
      </h2>
      <div className={styles.projectsContainer}>
        <div className={styles.projects}>
          {/* <Slider ref={sliderRef} {...settings}> */}
          {projects.map((project, id) => {
            return <ProjectCard key={id} id={id} project={project} />;
          })}
          {/* </Slider> */}
        </div>
      </div>
    </section>
  );
};

export default Projects;
