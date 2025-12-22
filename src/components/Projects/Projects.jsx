import React, { useState } from "react";

import styles from "./Projects.module.css";

import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.projects}>
        {displayedProjects.map((project, id) => {
          return <ProjectCard key={id} project={project} />;
        })}
      </div>
      {projects.length > 3 && (
        <div 
          className={styles.showMoreBtn} 
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "Show More"}
        </div>
      )}
    </section>
  );
};