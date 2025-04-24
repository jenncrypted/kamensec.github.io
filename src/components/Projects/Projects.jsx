import React, { useRef, useState } from "react";
import styles from "./Projects.module.css";
import audits from "../data/audits.json";
// import judging from "../data/judging.json";
// import contests from "../data/contests.json";
import AuditCard from "./Audits/AuditCard";
import ContestCard from "./Contests/ContestCard";
// import Slider from "react-slick";
import JudgingCard from "./Judging/JudgingCard";

const CardType = ({ category, data }) => {
    console.log({ category });
    if (category == "Audits") {
        return (
            <div className={styles.projects}>
                audits
                {data.map((audit, id) => {
                    return <AuditCard key={id} id={id} audit={data} />;
                })}
            </div>
        );
    } else if (category == "Judging") {
        return <JudgingCard />;
    } else {
        console.log("we are here");
        // return (
        //     <div className={styles.projects}>
        //         {data.map((audit, id) => {
        //             return <AuditCard key={id} id={id} audit={data} />;
        //         })}
        //     </div>
        // );
        return <ContestCard />;
    }
};

const Projects = () => {
    // const sliderRef = useRef();
    // const settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 4,
    //     arrows: true,
    //     responsive: [
    //         {
    //             breakpoint: 796,
    //             settings: {
    //                 slidesToShow: 3,
    //                 slidesToScroll: 2,
    //             },
    //         },
    //     ],
    // };

    const [activeCategory, setActiveCategory] = useState();

    const cardData = audits;
    console.log({ activeCategory, cardData });

    return (
        <section id="works" className={styles.container}>
            <h2 className={styles.title}>
                <span>#</span>projects
            </h2>
            <div className={styles.buttons}>
                <div>
                    <input
                        type="button"
                        value="Audits"
                        onClick={() => setActiveCategory("Audits")}
                    />
                    <input
                        type="button"
                        value="Judging"
                        onClick={() => setActiveCategory("Judging")}
                    />
                    <input
                        type="button"
                        value="Contests"
                        onClick={() => setActiveCategory("Contests")}
                    />
                </div>
            </div>

            {activeCategory ? (
                <CardType category={activeCategory} data={cardData} />
            ) : (
                <div>test</div>
            )}
        </section>
    );
};

export default Projects;

/*
1. Understand how to render a component conditionally
2. Display 1 of 3 components based on the button selected 
3. Get the right data set for the selected component 
4. Add the data as props to the component you are rendering
5. then move to the contest component and try to use the data you are passing

*/
