import React, {useEffect, useState} from "react";
import styles from './SavedFiles.module.scss';
import {RootState} from "../../redux/reducers/rootReducer";
import {useDispatch, useSelector} from "react-redux";
import SavedCircuitConfig from "./SavedCircuit/SavedCircuitConfig";
import {ICircuitConfigFile} from "../../common/interfaces";
import {fetchSavedCircuitConfigFiles} from "../../redux/actions/savedFilesAction";
import APIClient from "../../api/APIClient";
import underlay_quokka_icon from "../../assets/underlay_quokka_icon.svg";

interface SavedFilesProp {
    loadFilesView? : boolean
}

const SavedFiles : React.FC<SavedFilesProp> = (props) => {
    const {loadFilesView} = props;
    var styleTypes = [styles.savedFiles];
    if (loadFilesView) {
        styleTypes.push(styles.loadFilesView);
    }
    const {savedCircuitConfigs} = useSelector((state: RootState) => (state.savedFiles));
    const [fetching, setFetching] = useState(false);
    const apiClient = new APIClient();
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            setFetching(true);
            const response = await apiClient.circuitBuilderAPIService.getSavedCircuitConfigFiles();
            const responseData : ICircuitConfigFile[] = response.data;
            dispatch(fetchSavedCircuitConfigFiles(responseData));
            setFetching(false);
        })();
    }, [])




    return <div className={styleTypes.join(' ')}>
        {loadFilesView ? null
            :
            <h2>Saved Files</h2>
        }
        {
            savedCircuitConfigs.length !== 0 ?

            savedCircuitConfigs.map((savedCircuitConfig : ICircuitConfigFile, index) => {
                return <SavedCircuitConfig
                    loadFilesView={loadFilesView}
                    key={savedCircuitConfig.id}
                    id={savedCircuitConfig.id}
                    title={savedCircuitConfig.title}
                    compoundGates={savedCircuitConfig.compoundGates}
                    circuitState={savedCircuitConfig.circuitState}/>
            })
                :
                <div className={styles.prompt}>
                    <p>You don't have any saved files yet</p>
                </div>
        }
        <img className={styles.underlayImage} src={underlay_quokka_icon}/>

    </div>
}

export default SavedFiles;
