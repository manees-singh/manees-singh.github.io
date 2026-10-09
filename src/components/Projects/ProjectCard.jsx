import React, { useId, useState } from "react";

import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source },
}) => {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <article className={styles.container} data-expanded={expanded}>
      <img
        src={getImageUrl(imageSrc)}
        alt={`Image of ${title}`}
        className={styles.image}
      />
      <div className={styles.panel}>
        <h3 className={styles.title}>
          <button
            type="button"
            className={styles.titleButton}
            aria-expanded={expanded}
            aria-controls={detailsId}
            onClick={() => setExpanded(value => !value)}
          >
            {title}
          </button>
        </h3>
        <div className={styles.details} id={detailsId}>
          <p className={styles.description}>{description}</p>
          <ul className={styles.skills}>
            {skills.map((skill, id) => (
              <li key={id} className={styles.skill}>{skill}</li>
            ))}
          </ul>
          <div className={styles.links}>
            {demo && (
              <a href={demo} className={styles.link} target="_blank" rel="noopener noreferrer">
                Demo
              </a>
            )}
            {source && (
              <a href={source} className={styles.link} target="_blank" rel="noopener noreferrer">
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
