import React, { useState } from 'react';
import publications from '../../data/publications.json';
import styles from './Publications.module.css';

// Maps a publication's `type` field (in data/publications.json) to the
// group heading it should appear under, and controls group order.
const PUBLICATION_GROUPS = [
    { type: 'journal', heading: 'Journal Articles' },
    { type: 'poster', heading: 'Conference Proceedings' },
];

const PublicationEntry = ({ publication, number }) => (
    <li className={styles.publicationItem}>
        <span className={styles.number}>{number}.</span>
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
                <p className={styles.award}>{publication.award}</p>
            )}
        </div>
    </li>
);

export const Publications = () => {
    const [showAll, setShowAll] = useState(false);

    const groups = PUBLICATION_GROUPS
        .map(({ type, heading }) => ({
            heading,
            items: publications.filter((publication) => publication.type === type),
        }))
        .filter((group) => group.items.length > 0);

    const totalPublications = groups.reduce((total, group) => total + group.items.length, 0);
    let remaining = showAll ? totalPublications : 3;
    const visibleGroups = groups.map(group => {
        const items = group.items.slice(0, remaining);
        remaining -= items.length;
        return { ...group, items };
    }).filter(group => group.items.length > 0);

    return (
        <section className={styles.container} id='publications'>
            <h2 className={styles.title}>Publications</h2>

            <div className={styles.content} id="publication-list">
                {visibleGroups.map((group) => {
                    return (
                        <div key={group.heading} className={styles.group}>
                            <h3 className={styles.groupHeading}>{group.heading}</h3>
                            <ul className={styles.publicationList}>
                                {group.items.map((publication, id) => (
                                    <PublicationEntry key={id} publication={publication} number={id + 1} />
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
            {totalPublications > 3 && (
                <button
                    type="button"
                    className={styles.showMoreBtn}
                    aria-expanded={showAll}
                    aria-controls="publication-list"
                    onClick={() => setShowAll(value => !value)}
                >
                    {showAll ? "Show Less" : "Show More"}
                </button>
            )}
        </section>
    );
};
