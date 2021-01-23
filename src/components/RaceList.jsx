import React from 'react';
import styles from '../assets/css/RaceList.module.css';

export const RaceList = ({race, image}) => {

    return (
        <div className={styles.container}>

            {(!!race.length && image) && <div className={styles.head}>
            <h1>{`${race[0].race}s`}</h1>
            <img src={image} alt={''}/>
            </div>}

            {!!race.length && race.map(el =>
                <div key={el.id} className={styles.itemContainer}>
                    <span>{el.name}</span>
                    <div className={styles.buttons}>
                        <button className={styles.change}>Change name</button>
                        <button className={styles.delete}>Delete</button>
                    </div>
                </div>
            )}
            <button className={styles.add}>+ Add</button>
        </div>
    );
};