import React, {useEffect, useState} from 'react';
import styles from './CircuitOutput.module.scss';
import BuildOutput from "./BuildOutput/BuildOutput";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import {IBuildOutput} from "../../common/interfaces";
import APIClient from "../../api/APIClient";
import {fetchCircuitBuildOutputs} from "../../redux/actions/circuitOutputsAction";
import underlay_quokka_icon from "../../assets/underlay_quokka_icon.svg";
import {updateCircuitConfigMode} from "../../redux/actions/circuitConfigAction";

const CircuitOutput : React.FC = () => {
    const [fetching, setFetching] = useState(false);
    const apiClient = new APIClient();
    const {authenticated, user} = useSelector((state: RootState) => state.auth);
    const {buildOutputs} = useSelector((state : RootState) => (state.circuitOutputs))
    const dispatch = useDispatch();

    useEffect(() => {
        (async() => {
            setFetching(true);
            dispatch(updateCircuitConfigMode("NoSelectionMode"));
            const response = await apiClient.circuitBuilderAPIService.getCircuitBuildOutputs();
            const responseData : IBuildOutput[] = response.data;
            dispatch(fetchCircuitBuildOutputs(responseData));
            setFetching(false);
        })();
    }, []);

    const renderBuildOutputs = () => {
        return (
            buildOutputs.length !== 0 ?
                buildOutputs.map((buildOutput : IBuildOutput, index : number) => {
                    return <BuildOutput
                        key={buildOutput.id}
                        id={buildOutput.id}
                        title={buildOutput.title}
                        buildCircuitState={buildOutput.buildCircuitState}
                        buildOutputData={buildOutput.buildOutputData}
                        buildDuration={buildOutput.buildDuration}
                        runIterationCount={buildOutput.runIterationCount}
                        createdDate={buildOutput.createdDate}
                    />
                })
                :
                <div className={styles.prompt}>
                    <p>Run a circuit in the Circuit Builder and visit this page again once complete to see the output.</p>

                </div>
        )
    }

    const renderContent = () => {
        if (fetching) {
            return 'Fetching data...';
        } else {
            return renderBuildOutputs();
        }
    }



    return (<div className={styles.circuitOutput}>
        <img className={styles.underlayImage} src={underlay_quokka_icon}/>
        <h2>Circuit Output</h2>
        {
            authenticated ? renderContent() : <div className={styles.prompt}>
                <p className={styles.warningMessage}>
                    Circuit output will only be accessible until cookies are cleared.
                    <span className={styles.underlined}>
                            Login or create an account to save circuit output.
                </span>
                </p>
            </div>
        }
    </div>)
}

export default CircuitOutput;
