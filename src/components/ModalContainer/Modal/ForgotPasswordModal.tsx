import React, {useState} from 'react';
import styles from './Modal.module.scss';
import {ModalProps} from "./Modal";
import {useDispatch} from "react-redux";
import {ModalState} from "../../../common/types";
import {updateDroppedGate} from "../../../redux/actions/circuitConfigAction";
import {closeModal} from "../../../redux/actions/modalsAction";
import {Button} from "../../Button/Button";
import StackLayout from "../../StackLayout/StackLayout";

const ForgotPasswordModal : React.FC<ModalProps> = (props) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [modalState, setModalState] = useState(props.state);

    const handleKeyDown = async (event : any) => {
        if (event.key === 'Enter') {
            await handleResetPasswordButtonClicked();
        }
    }

    const handleEmailInputChanged = (event : any) => {
        console.log(`setting input value as ${event.target.value}`)
        setInputValue(event.target.value);
    }

    const handleResetPasswordButtonClicked = async () => {
        console.log(`update input value as ${inputValue}`)
        setModalState('EmailPasswordSent');
    }

    const handleOkButtonClicked = async () => {
        console.log(`update input value as ${inputValue}`)

        dispatch(closeModal(props.id));
    }

    const renderState = (state: ModalState) => {
        switch (state) {
            case 'EmailPasswordEntry':
                return <>
                    <h3>Forgot Password?</h3>
                    <p>Enter the email address linked to your account to reset <br/>
                        your password. You’ll recieve an email with instructions <br/> on
                        what to do next.</p>
                    <input
                        type="text"
                        onChange={handleEmailInputChanged}
                        onKeyDown={handleKeyDown}
                        placeholder="Email Address"
                    />
                    <StackLayout orientation='horizontal'>
                        <Button types={['standardBtn']} name="Reset Password" onClick={async () => handleResetPasswordButtonClicked()}>
                            RESET PASSWORD
                        </Button>
                    </StackLayout>

                </>
            case 'EmailPasswordSent':
                return <>
                    <h3>Email Sent</h3>
                    <p>Check your inbox for the email to reset your password and <br/>
                        following the directions inside,.</p>
                    <StackLayout orientation={'horizontal'}>
                        <Button types={['standardBtn']} name="OK" onClick={async () => handleOkButtonClicked()}>
                            OK
                        </Button>
                    </StackLayout>

                </>
            default:
                return <div><h1>Error Opening Modal</h1></div>;

        }
    }

    return (<div >
        {renderState(modalState)}
    </div>)
}

export default ForgotPasswordModal;
