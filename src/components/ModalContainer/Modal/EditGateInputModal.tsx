import React, {useState} from 'react';
import styles from './Modal.module.scss';
import {ModalState} from "../../../common/types";
import {ModalProps} from "./Modal";
import {closeModal} from "../../../redux/actions/modalsAction";
import {useDispatch} from "react-redux";
import {updateDroppedGate} from "../../../redux/actions/circuitConfigAction";
import {Button} from "../../Button/Button";
import StackLayout from "../../StackLayout/StackLayout";
import Input from "../../Input/Input";

const EditGateInputModal : React.FC<ModalProps> = (props) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const handleKeyDown = async (event : any) => {
        if (event.key === 'Enter') {
            await handleOkButtonClicked();
        }
    }

    const handleInputChanged = (event : any) => {
        console.log(`setting input value as ${event.target.value}`)
        setInputValue(event.target.value);
    }

    const handleOkButtonClicked = async () => {
        console.log(`update input value as ${inputValue}`)

        dispatch(updateDroppedGate(props.extras.gateId, 'rotAngle', inputValue));
        dispatch(closeModal(props.id));
    }

    const renderState = (state: ModalState) => {
        switch (state) {
            case 'StartEnterInput':
                return <StackLayout orientation="vertical">
                    <h1>{props.extras.gateType} Gate - Subroutine params</h1>
                    <Input
                        type="text"
                        styleTypes={['default']}
                        onChange={handleInputChanged}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter here"
                    />
                    <div className={styles.buttonGroup}>
                        <Button types={["standardBtn"]} name="OK" onClick={async () => handleOkButtonClicked()}>
                        </Button>
                    </div>
                </StackLayout>
            default:
                return <div><h1>Error Opening Modal</h1></div>;

        }
    }

    return <div>
        {renderState(props.state)}
    </div>
}

export default EditGateInputModal;
