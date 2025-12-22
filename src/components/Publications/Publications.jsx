import React, { useState } from 'react';
import publications from '../../data/publications.json';
import styles from './Publications.module.css';

export const Publications = () => {
    const [showAll, setShowAll] = useState(false);
    const displayedPublications = showAll ? publications : publications.slice(0, 3);

    return (
        <section className={styles.container} id='publications'>
            <h2 className={styles.title}>Publications</h2>
            
            <div className={styles.content}>
                <ul className={styles.publicationList}>
                    {displayedPublications.map((publication, id) => (
                        <li key={id} className={styles.publicationItem}>
                            <div className={styles.publicationDetails}>
                                <p className={styles.citation}>
                                    {publication.authors_display} ({publication.year}). <strong>{publication.title}</strong>. <em>{publication.venue}</em>
                                    {publication.volume && `, ${publication.volume}`}
                                    {publication.location && `, ${publication.location}`}
                                    {publication.publisher && `. ${publication.publisher}`}.
                                </p>
                                {publication.doi && (
                                    <a 
                                        href={publication.doi}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className={styles.doiLink}
                                    >
                                        {publication.doi} ↗
                                    </a>
                                )}
                                {publication.award && (
                                    <p className={styles.award}>🏆 {publication.award}</p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {publications.length > 3 && (
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
