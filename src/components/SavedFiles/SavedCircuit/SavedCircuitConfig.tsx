import React from 'react';
import styles from './SavedCircuitConfig.module.scss';
import trash_bin from "../../../assets/trash_bin.svg";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../../../common/constants";
import {ICircuitState, IGate} from "../../../common/interfaces";
import {Button} from "../../Button/Button";
import {useDispatch} from "react-redux";
import {loadCircuitConfig, updateCircuitConfigMode} from "../../../redux/actions/circuitConfigAction";
import APIClient from "../../../api/APIClient";
import {deleteSavedCircuitConfigFile} from "../../../redux/actions/savedFilesAction";

interface SavedCircuitProps {
    loadFilesView? : boolean;
    id : string;
    title : string;
    compoundGates : IGate[]
    circuitState : ICircuitState | null
}

const SavedCircuitConfig : React.FC<SavedCircuitProps> = (props) => {
    const {loadFilesView, id, title, circuitState, compoundGates, children} = props;
    const apiClient = new APIClient();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const openCircuitConfig = () => {
        dispatch(loadCircuitConfig(title, circuitState,  compoundGates));
        dispatch(updateCircuitConfigMode('NoSelectionMode'));
        navigate('../../circuitBuilder')
    }

    const deleteCircuitConfig = async () => {
        const response = await apiClient.circuitBuilderAPIService.removeCircuitConfigFile(id);
        if (response.status === 200) {
            await dispatch(deleteSavedCircuitConfigFile(id))
        }
    }

    return <div className={styles.savedCircuitConfig}>
        <p className={styles.circuitName}> {title}</p>
        <p className={styles.date}>25/03/2022</p>
        <div className={styles.openOrDelete}>
            {
                loadFilesView ? null :
                    <img src={trash_bin} alt={'trash_bin'} onClick={deleteCircuitConfig}/>
            }
            <Button
                name="Open"
                types={['underlinedUppercaseBtn']}
                onClick={openCircuitConfig}
            >
            </Button>
        </div>
    </div>
}

export default SavedCircuitConfig;
