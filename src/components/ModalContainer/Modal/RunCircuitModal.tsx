import React, {useState} from 'react';
import styles from './Modal.module.scss';
import {ModalState} from "../../../common/types";
import {ModalProps} from "./Modal";
import {closeModal} from "../../../redux/actions/modalsAction";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers/rootReducer";
import APIClient from "../../../api/APIClient";
import {updateCircuitEstimatedBuildTime, updateCircuitRunningStatus} from "../../../redux/actions/circuitConfigAction";
import {BuildOutput} from "../../../common/classes";
import {addBuildOutput} from "../../../redux/actions/circuitOutputsAction";
import {IBuildOutput, IGate} from "../../../common/interfaces";
import {Button} from "../../Button/Button";
import Input from "../../Input/Input";
import StackLayout from "../../StackLayout/StackLayout";

const RunCircuitModal : React.FC<ModalProps> = (props) => {
    const [modalState, setModalState] = useState(props.state);
    const [circuitRunCount, setCircuitRunCount] = useState(0);
    const {estimatedBuildTime} = useSelector((state :RootState) => (state.circuitConfig));
    const apiClient : APIClient = new APIClient();
    const dispatch = useDispatch();
    const circuitConfig = useSelector((state: RootState) => state.circuitConfig);
    const droppedGates = useSelector<RootState, IGate[]>((state: RootState) => (state.circuitConfig.circuitState.droppedGates));

    const handleKeyDown = async (event : any) => {
        if (event.key === 'Enter') {
            await handleRunBtnClicked();
        }
    }

    const handleInputChanged = (event : any) => {
        const runCountValue = parseInt(event.target.value);
        const estimatedTimeValue = (3.021*Math.pow(10, -7) * Math.exp(0.6204 * circuitConfig.circuitState.qubits.length));
        console.log(estimatedTimeValue);
        dispatch(updateCircuitEstimatedBuildTime(estimatedTimeValue));
        setCircuitRunCount(runCountValue);
    }

    const handleRunBtnClicked = async () => {
        const qasmScript = apiClient.qsimAPIService.createQASMScript(circuitConfig.circuitState.qubits,
            droppedGates);
        dispatch(updateCircuitRunningStatus(true));
        dispatch(closeModal(props.id));
        const runStartTime = Date.now();
        const response = await apiClient.qsimAPIService.runQASMScript(qasmScript, circuitRunCount, false);
        const runDuration = Date.now() - runStartTime;
        await createNewBuildOutput(response.data.result.c, runDuration);
        dispatch(updateCircuitRunningStatus(false));
    }

    const createNewBuildOutput = async (outputData : number[][], runDuration : number) => {
        const newBuildOutput = new BuildOutput(circuitConfig.circuitConfigTitle, outputData, runDuration,  circuitConfig.circuitState, circuitRunCount);
        const response : any = await apiClient.circuitBuilderAPIService.saveCircuitBuildOutput(newBuildOutput);
        const result = response.data;
        dispatch(addBuildOutput(result));
    }

    const handleCancelBtnClicked = async () => {
        dispatch(closeModal(props.id));
    }

    const renderState = (state : ModalState) => {
        switch (state) {
            case 'StartRunCircuit':
                return(<>
                    <StackLayout orientation="vertical">
                        <h1>Run circuit</h1>
                        <p>Enter how many times you want to run this circuit:</p>
                        <Input
                            type="text"
                            styleTypes={["default"]}
                            onChange={handleInputChanged}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter number"
                        />
                        <p className={styles.italic}>Estimated processing time = {estimatedBuildTime}</p>
                        <StackLayout orientation="horizontal">
                            <Button name={'Cancel'} types={['standardBtn']}
                                    onClick={async () => handleCancelBtnClicked()}/>
                            <Button name={'Run'} types={['standardBtn']}
                                    onClick={async () => handleRunBtnClicked()}/>
                        </StackLayout>
                    </StackLayout>
                </>)
            default:
                return <div><h1>Error Opening Modal</h1></div>;
        }
    }

    return <div>{
        renderState(modalState)
    }
    </div>
}

export default RunCircuitModal;
