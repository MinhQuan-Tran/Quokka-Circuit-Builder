import React, {useEffect} from 'react';
import styles from './BuildOutputView.module.scss';
import {useLocation} from "react-router-dom";
import {IBuildOutput} from "../../../common/interfaces";
import Accordion from "../../Accordion/Accordion";
import BuildOutputChart from "./BuildOutputChart/BuildOutputChart";
import Grid from "../../CircuitBuilder/CircuitConfig/CircuitArrangement/Grid/Grid";
import {formattedDate} from "../../../common/helpers";

interface BuildOutputViewProps {
}

const BuildOutputView : React.FC<BuildOutputViewProps> = (props) => {
    const location = useLocation();
    const buildOutput = location.state as IBuildOutput;

    return <div className={styles.buildOutputView} >
        <div className={styles.outputHeader}>
            <h2 className={styles.outputName}>{buildOutput.title}</h2>
            <div className={styles.metaDataAndDownload}>
                <p>{formattedDate(buildOutput.createdDate)}</p>
                <p className={styles.buildDuration} >
                    <strong>Processing time:</strong>{buildOutput.buildDuration/1000} seconds</p>
                <button className={styles.downloadCSVButton}>Download CSV</button>
            </div>
        </div>
        <Accordion title={'View Circuit Arrangement'}>
            <Grid viewOnly={true} circuitState={buildOutput.buildCircuitState}/>
        </Accordion>
        <BuildOutputChart qubitsCount={buildOutput.buildCircuitState.qubits.length} outputData={buildOutput.buildOutputData}/>
    </div>
}

export default BuildOutputView;
