import React from 'react';
import styles from './CircuitProcessingInfo.module.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers/rootReducer";

const CircuitProcessingInfo : React.FC = () => {
    const {circuitConfigTitle, estimatedBuildTime} = useSelector((state : RootState) => (state.circuitConfig));


    return <div className={styles.circuitProcessingInfo}>
        <div className={styles.firstLine}>
            <h4>Circuit builder is currently processing: {estimatedBuildTime}</h4>
            <p>Estimated time </p>
            <progress/>
        </div>
        <p>It is not possible to use the circuit builder whilst processing. Please return once processing is complete to interact with the circuit builder again.</p>

        <h3>Processing: {circuitConfigTitle}</h3>
    </div>
}

export default CircuitProcessingInfo;
