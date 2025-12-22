import React from 'react';
import { getImageUrl } from '../../utils';
import styles from './Front.module.css';

export const Front = () => {
    return <section className={styles.container}>
        <div className={styles.content}>
            {/* <h1 className={styles.title}>
                Hi, I'm Manish
            </h1> */}
            <p className={styles.description}>
                Hi, I'm <span className={styles.name}>Manish Singh</span>. A Computer Engineering student at the University of Kansas. 
               
            </p>

            <div className={styles.buttonContainer}>
                <a href={getImageUrl("front/Manish_resume.pdf")} download="Manish_Singh_Resume.pdf" className={styles.contactBtn}>My Resume</a>
            </div>
        </div>

        <img 
        src={getImageUrl("front/profile.png")} 
        alt="profile" 
        className={styles.frontImg}
        />
        <div className={styles.topBlur} />
        <div className={styles.bottomBlur} />
    </section>
}