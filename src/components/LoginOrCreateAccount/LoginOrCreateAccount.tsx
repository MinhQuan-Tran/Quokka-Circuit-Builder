import React, {useState} from 'react';
import styles from './LoginOrCreateAccount.module.scss';
import underlay_quokka_icon from '../../assets/underlay_quokka_icon.svg';
import {useDispatch} from "react-redux";
import {openModal} from "../../redux/actions/modalsAction";
import {Modal} from "../../common/classes";
import {Button} from "../Button/Button";
import {updateCurrentlyAuthenticatedUser, updateUserAuthentication} from "../../redux/actions/authAction";
import {useNavigate} from "react-router-dom";
import APIClient from "../../api/APIClient";
import Input from "../Input/Input";

const LoginOrCreateAccount : React.FC = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const apiClient : APIClient = new APIClient();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regConfirmPassword, setRegConfirmPassword] = useState("");

    const handleLoginBtnClicked = async () => {
        console.log("log in button clicked");
        await handleLogin(loginEmail, loginPassword);
    }

    const handleLogin = async (email : string, password : string) => {
        try {
            console.log("Log in");
            const response = await apiClient.authService.login({
                email: email,
                password: password
            });
            if (response?.status === 201) {
                if (response.data.access_token) {
                    localStorage.setItem("access_token", response.data.access_token);
                    localStorage.setItem("userEmail", email);
                }
                history('/circuitBuilder');

                dispatch(updateUserAuthentication(true));
                dispatch(updateCurrentlyAuthenticatedUser({
                    id: "0",
                    email: email

                }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLoginBtnClickedForNewAccount = async () => {
        const response = await apiClient.authService.register({
            email: regEmail,
            password : regPassword,
            confirmPassword : regConfirmPassword
        });

        console.log("register response", response);
        await handleLogin(regEmail, regPassword);
    }

    const handleForgotButtonClicked = () => {
        dispatch(openModal(new Modal('ForgotPasswordModal', 'EmailPasswordEntry')));
    }

    return (
        <div className={styles.container}>
            <img src={underlay_quokka_icon}/>
            <hr className={styles.divider}/>
            <div className={styles.loginOrCreateAccount}>
                <div className={styles.login}>
                    <h2>Login to Quokka</h2>
                    <Input
                        type="text"
                        styleTypes={['default']}
                        onChange={(event) =>
                        {
                            setLoginEmail(event.target.value)
                        }}
                        placeholder="Email Address"/>
                    <Input
                        type="password"
                        styleTypes={['default']}
                        onChange={(event) =>
                        {
                            setLoginPassword(event.target.value)
                        }}
                        placeholder="Password"/>
                    <Button
                        name="Login"
                        types={["loginBtn"]}
                        onClick={handleLoginBtnClicked}/>
                    <button
                        className={styles.forgotBtn}
                        onClick={handleForgotButtonClicked}>Forgot Password?
                    </button>

                </div>
                <div className={styles.createAccount}>
                    <h2>Create account</h2>
                    <p>
                        Creating an account allows you to access <br/>
                        the full functionality of the Quokka <br/>
                        interface including the ability to save <br/>
                        circuits and compound gates.
                    </p>
                    <Input
                        placeholder="Email Address"
                        type="text"
                        onChange={(event) =>
                        {
                            setRegEmail(event.target.value)
                        }}
                        styleTypes={['default']}
                    />
                    <Input
                        type="password"
                        styleTypes={['default']}
                        onChange={(event) =>
                        {
                            setRegPassword(event.target.value)
                        }}
                        placeholder="Create Password"
                    />
                    <Input
                        type="password"
                        styleTypes={['default']}
                        onChange={(event) =>
                        {
                            setRegConfirmPassword(event.target.value)
                        }}
                        placeholder="Confirm Password"
                    />
                    <Button
                        name="Login"
                        types={["loginBtn"]}
                        onClick={handleLoginBtnClickedForNewAccount}/>

                </div>
        </div>
    </div>)
}

export default LoginOrCreateAccount;
