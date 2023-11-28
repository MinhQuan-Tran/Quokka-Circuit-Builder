import React, {useState} from 'react';
import styles from './Modal.module.scss';
import {sleep} from "../../../common/helpers";
import {updateDeviceConnectionStatus, updateDeviceName} from "../../../redux/actions/deviceConnectionAction";
import {DeviceConnection} from "../../../common/classes";
import {closeModal} from "../../../redux/actions/modalsAction";
import logo from "../../../assets/logo.svg";
import {useDispatch, useSelector} from "react-redux";
import APIClient from "../../../api/APIClient";
import {ModalState} from "../../../common/types";
import {ModalProps} from "./Modal";
import {Button} from "../../Button/Button";
import Input from "../../Input/Input";
import {RootState} from "../../../redux/reducers/rootReducer";
import {Exception} from "sass";
import StackLayout from "../../StackLayout/StackLayout";


const ConnectionModal : React.FC<ModalProps>= (props) => {
    const dispatch = useDispatch();
    const {deviceName} = useSelector((state : RootState) => (state.deviceConnection));
    const [modalState, setModalState] = useState(props.state);
    const apiClient : APIClient = new APIClient();

    const handleKeyDown = async (event : any) => {
        if (event.key === 'Enter') {
            await handleConnectBtnClicked();
        }
    }

    const handleConnectBtnClicked = async () => {
        setModalState('Connecting');
        try {
            await sleep(1500);
            const connectionResponse =
                await apiClient.qsimAPIService.getDeviceConnectionStatus(deviceName);

        } catch (e : any) {
            if (e.response.status === 404) {
                dispatch(updateDeviceConnectionStatus(new DeviceConnection(true, deviceName)));
                window.sessionStorage.setItem('deviceName', deviceName);
                setModalState('Connected');
                await sleep(1000);
                dispatch(closeModal(props.id));
            }
            console.log('no connection response', e);
        }

    }

    const handleInputChanged = (event : any) => {
        dispatch(updateDeviceName(event.target.value));

        window.sessionStorage.setItem('deviceName', event.target.value);
    }

    const renderState = (state : ModalState) => {
        switch (state) {
            case 'StartConnection':
                return(<>
                    <h1>Connect to a Quokka Device</h1>
                    <p>Instructions about what the user should do or expect
                        when connecting to a Quokka device.</p>
                    <p>Connect a Quokka device to use the circuit builder.</p>
                    <StackLayout orientation="vertical">
                        <Input
                            type="text"
                            styleTypes={['default']}
                            onChange={handleInputChanged}
                            onKeyDown={handleKeyDown}
                            placeholder="Device name"
                        />
                        <Button selected={false} name='Connect' onClick={async() => handleConnectBtnClicked()}
                                types={['standardBtn']}
                        />
                    </StackLayout>
                </>)
            case 'Connecting':
                return (
                    <StackLayout orientation="vertical">
                        <h1>Connecting to Quokka device</h1>
                        <p>Please wait while we connect to {deviceName}</p>
                        <div className={`${styles.spinner} ${styles['black']} ${styles['sm']}`}>
                        </div>
                    </StackLayout>);
            case 'Connected':
                return ( <StackLayout orientation="vertical">
                    <h1>Successfully Connected to a Quokka</h1>
                    <p>You are now connected to {deviceName}</p>
                    <img src={logo}>
                    </img>
                </StackLayout>);
            default:
                return <><h1>Error Opening Modal</h1></>;
        }
    }


    return <div>{
        renderState(modalState)
    }</div>

}

export default ConnectionModal;
