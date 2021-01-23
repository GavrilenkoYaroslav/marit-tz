import React from 'react';
import styles from '../assets/css/HomePage.module.css';
import {useSelector} from "react-redux";
import {RaceList} from "../components/RaceList";
import aragorn from '../assets/images/aragorn.png';
import legolas from '../assets/images/legolas.png';
import frodo from '../assets/images/frodo.png';
import gimli from '../assets/images/gimli.png';

export const HomePage = () => {
    const heroes = useSelector(state => state.heroes.heroes);

    const elfs = heroes.filter(char => char.race === 'Elf');
    const dworfs = heroes.filter(char => char.race === 'Dworf');
    const humans = heroes.filter(char => char.race === 'Human');
    const hobbits = heroes.filter(char => char.race === 'Hobbit');

    return (
        <div className={styles.homeContainer}>
            {!!heroes.length ? <>
            <RaceList race={elfs} image={legolas}/>
            <RaceList race={dworfs} image={gimli}/>
            <RaceList race={humans} image={aragorn}/>
            <RaceList race={hobbits} image={frodo}/>
            </> : 'Loading...'}
        </div>
    );
};