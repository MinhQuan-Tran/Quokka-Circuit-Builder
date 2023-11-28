import React, {useEffect, useState} from 'react';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CircuitBuilder from './components/CircuitBuilder/CircuitBuilder';
import About from './components/About/About';
import Setup from './components/Setup/Setup';
import CircuitOutput from './components/CircuitOutput/CircuitOutput';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Footer from './components/Footer/Footer';
import LoginOrCreateAccount from "./components/LoginOrCreateAccount/LoginOrCreateAccount";
import ModalContainer from "./components/ModalContainer/ModalContainer";
import BuildOutputView from "./components/CircuitOutput/BuildOutputView/BuildOutputView";
import {ROUTES} from "./common/constants";
import SavedFiles from "./components/SavedFiles/SavedFiles";
import CompoundGateSelectionContextProvider from "./components/Providers/CompoundGateSelectionContextProvider";
import APIClient from "./api/APIClient";
import {useDispatch, useSelector} from "react-redux";
import {updateCurrentlyAuthenticatedUser, updateUserAuthentication} from "./redux/actions/authAction";
import CursorContextProvider from "./components/Providers/CursorContextProvider";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import useWindowDimensions from "./components/hooks/useWindowDimension";
import {openModal} from "./redux/actions/modalsAction";
import {Modal} from "./common/classes";
import {RootState} from "./redux/reducers/rootReducer";


function App() {
    const apiClient = new APIClient();
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();
    const { modals } = useSelector((state : RootState) => (state.modals));
    useEffect(() => {
        if (width < 770) {
            if (!modals.find((modal) => (modal.type === "WarningDeviceIncompatibleModal"))) {
                dispatch(openModal(new Modal('WarningDeviceIncompatibleModal', 'OkPrompt')));
            }
        }
    }, [height, width]);

    useEffect(() => {
        (async () => {
            try {
                const response = await apiClient.authService.getMe();
                if (response) {
                    dispatch(updateUserAuthentication(true));
                    dispatch(updateCurrentlyAuthenticatedUser({id: response.data.id, email: response.data.email}));
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);

  return (
    <div className={styles.App}>
            <CompoundGateSelectionContextProvider>
                <BrowserRouter>
                    <nav>
                        <Header/>
                    </nav>
                    <Routes>
                        <Route path={ROUTES.ABOUT} element={
                            <About/>
                        }/>
                        <Route path={ROUTES.SETUP} element={
                            <Setup/>
                        }/>
                        <Route path={ROUTES.CIRCUIT_BUILDER} element={
                            <CursorContextProvider>
                                <CircuitBuilder/>
                            </CursorContextProvider>
                        }/>
                        <Route path={ROUTES.CIRCUIT_OUTPUT} element=
                            {
                            <CircuitOutput/>
                            }
                        />
                        <Route path={ROUTES.SAVED_FILES} element={
                            <SavedFiles/>
                        }/>
                        <Route path={ROUTES.LOGIN} element={
                            <LoginOrCreateAccount/>
                        } />
                        <Route path={ROUTES.UPDATE_PASSWORD} element={
                            <UpdatePassword/>
                        }/>
                        <Route path={`${ROUTES.CIRCUIT_OUTPUT}${ROUTES.BUILD_OUTPUT}/:buildId`} element={
                            <BuildOutputView/>}
                        />
                        <Route path={``} element={
                            <About/>
                        }/>
                        <Route path="*" element={
                            <PageNotFound/>
                        }/>
                    </Routes>
                    <ModalContainer/>
                </BrowserRouter>
            </CompoundGateSelectionContextProvider>
        <Footer/>
    </div>
  );
}

export default App;
