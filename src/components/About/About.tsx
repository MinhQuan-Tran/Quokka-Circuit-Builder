import React from 'react';
import styles from './About.module.scss';
const About : React.FC = () => {
    return (<div className={styles.about}>
        <p>Marketing information about what Quokka is and where to get it.</p>
        <p>Cater for standard text and images. This page needs to work on all devices.</p>
    </div>)
}

export default About;
