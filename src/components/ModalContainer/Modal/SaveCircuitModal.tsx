import React, {useState} from 'react';
import {ModalProps} from "./Modal";
import {ModalState} from "../../../common/types";
import {closeModal} from "../../../redux/actions/modalsAction";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "../../Button/Button";
import Input from "../../Input/Input";
import StackLayout from "../../StackLayout/StackLayout";
import {useNavigate} from "react-router-dom";
import {RootState} from "../../../redux/reducers/rootReducer";
import {loadCircuitConfig, updateCircuitConfigTitle} from "../../../redux/actions/circuitConfigAction";
import APIClient from "../../../api/APIClient";

const SaveCircuitModal : React.FC<ModalProps> = (props) => {
    const [modalState, setModalState] = useState(props.state);
    const apiClient = new APIClient();
    const {circuitConfigTitle, circuitState, compoundGates} = useSelector((state : RootState) => (state.circuitConfig));
    const history = useNavigate();
    const dispatch = useDispatch();


    const handleKeyDown = async (event : any) => {
        if (event.key === 'Enter') {
            await handleSaveButtonClicked();
        }
    }

    const handleInputChanged = (event : any) => {
        dispatch(updateCircuitConfigTitle(event.target.value));
    }

    const handleSaveButtonClicked = async () => {
        const response = await apiClient.circuitBuilderAPIService.saveCircuitConfigFile({
            title: circuitConfigTitle,
            compoundGates: compoundGates,
            circuitState: circuitState,
        })
        setModalState('SaveCircuitSuccessfully');
    }

    const close = async () => {
        dispatch(closeModal(props.id));
    }

    const handleGoToSaveFilesBtnClicked = async () => {
        history('/account/savedFiles')
        dispatch(closeModal(props.id));
    }

    const renderState = (state : ModalState) => {
        switch (state) {
            case 'SaveCircuitNameEntry':
                return(<StackLayout orientation="vertical">
                    <h3>Save File</h3>
                    <Input
                        type="text"
                        styleTypes={["default"]}
                        onChange={handleInputChanged}
                        onKeyDown={handleKeyDown}
                        placeholder='Enter circuit title'
                        defaultValue={circuitConfigTitle}
                    />
                    <StackLayout orientation="horizontal">
                        <Button name='Back'
                                types={['standardBtn']}
                                onClick={async () => close()}>
                        </Button>
                        <Button name='Save'
                                types={['standardBtn']}
                                onClick={async () => handleSaveButtonClicked()}>
                        </Button>
                    </StackLayout>
                </StackLayout>)
            case 'SaveCircuitSuccessfully':
                return <>
                    <h3>File Successfully Saved</h3>
                    <p>Do you want to continue in the Circuit Builder or go to all
                        Saved Files?</p>

                    <StackLayout orientation='vertical'>
                        <Button
                            name="Go to saved files"
                            types={['standardBtn', 'large']}
                            onClick={async() => handleGoToSaveFilesBtnClicked()}>
                        </Button>
                        <Button
                            name="Stay in Circuit Builder"
                            types={['standardBtn', 'large']}
                            onClick={async() => close()}>
                        </Button>
                    </StackLayout>

                </>
            default:
                return <div><h1>Error Opening Modal</h1></div>;
        }
    }
    return <div>{
        renderState(modalState)
    }
    </div>
}

export default SaveCircuitModal;
