import React from 'react';
import styles from './BuildOutput.module.scss';
import {BrowserRouter, Link, Route} from "react-router-dom";
import bin from '../../../assets/bin.svg'
import {ROUTES} from "../../../common/constants";
import DateTime from 'luxon';
import APIClient from "../../../api/APIClient";
import {formattedDate} from "../../../common/helpers";
import {IBuildOutput, ICircuitState} from "../../../common/interfaces";
import {useDispatch} from "react-redux";
import {deleteCircuitBuildOutput} from "../../../redux/actions/circuitOutputsAction";

interface BuildOutputProps {
    id : string;
    title : string;
    buildOutputData : number[][];
    buildCircuitState : ICircuitState;
    buildDuration : number;
    runIterationCount : number;
    createdDate? : Date;
}

const BuildOutput : React.FC<BuildOutputProps> = (children) => {

    const {id, title, buildCircuitState, buildOutputData, buildDuration, runIterationCount, createdDate } = children;
    const apiClient = new APIClient();
    const dispatch = useDispatch();

    const handleDeleteCircuitBuild = async () => {
        const response = await apiClient.circuitBuilderAPIService.removeCircuitBuildOutput(id);
        if (response.status === 200) {
            dispatch(deleteCircuitBuildOutput(id));
        }
    }


    return (<div className={styles.buildOutput}>
        <p className={styles.buildName}> {title}</p>
        <p className={styles.date}>{formattedDate(createdDate)}</p>
        <p className={styles.processingTime}><strong>
            Processing time:
        </strong>{buildDuration / 1000} seconds</p>
        <button className={styles.downloadBtn}> Download CSV</button>
        <div className={styles.viewOrDelete}>
            <img className={styles.trashBin} src={bin} alt={'bin'} onClick={handleDeleteCircuitBuild}/>

            <Link  className={styles.viewOutputBtn}
                   to={`${ROUTES.CIRCUIT_OUTPUT}${ROUTES.BUILD_OUTPUT}/${id}`}
                   state={children}>
                View Output
            </Link>
        </div>

    </div>)
}

export default BuildOutput;
