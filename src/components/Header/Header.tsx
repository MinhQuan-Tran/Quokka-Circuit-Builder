import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg'
import { RootState } from '../../redux/reducers/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import account_icon from '../../assets/account_icon.svg';
import arrow_down_black from '../../assets/arrow_down_black.svg';
import burger_menu from '../../assets/burger_menu.svg';
import {ROUTES} from "../../common/constants";
import DropdownButton from "../DropdownButton/DropdownButton";
import {Dropdown} from "../Dropdown/Dropdown";
import DropdownList from "../Dropdown/DropdownList/DropdownList";
import {updateCurrentlyAuthenticatedUser, updateUserAuthentication} from "../../redux/actions/authAction";
import APIClient from "../../api/APIClient";
import {updateDeviceConnectionStatus} from "../../redux/actions/deviceConnectionAction";
import {DeviceConnection} from "../../common/classes";
import DropdownItem from "../Dropdown/DropdownList/DropdownItem/DropdownItem";

const Header : React.VFC  = () => {
    const deviceConn = useSelector((state: RootState) => state.deviceConnection);
    const {authenticated, user} = useSelector((state: RootState) => state.auth);
    const [accountMenuClicked, setAccountMenuClicked] = useState(false);
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const history = useNavigate();
    const apiClient = new APIClient();
    var connDotStyle = styles.connectionDot;
    var statusStyle = styles.status;


    useEffect(() => {
        (async () => {
            const deviceName = window.sessionStorage.getItem('deviceName');
            if (!deviceName) return;
            try {
                const connectionResponse =
                    await apiClient.qsimAPIService.getDeviceConnectionStatus(deviceName);
            } catch (e : any) {
                if (e.response.status === 404) {
                    dispatch(updateDeviceConnectionStatus(new DeviceConnection(true, deviceName)));
                    window.sessionStorage.setItem('deviceName', deviceName);
                }
                console.log('no connection response', e);
            }

        })();
    }, []);

    if (deviceConn.connected){
        connDotStyle = styles.connectionDot + ' ' + styles.connected;
        statusStyle = styles.statusInfo + ' ' + styles.connected;
    }

    const handleAccountMenuItemClicked = (dropdownItem : string) => {
        console.log(dropdownItem);
        switch (dropdownItem) {
            case 'Logout' :
                dispatch(updateUserAuthentication(false));
                dispatch(updateCurrentlyAuthenticatedUser(null));
                localStorage.clear();
                history('login');
                break;
            case 'Saved Files':
                history('account/savedFiles')
                break;
            case 'Connect to a Quokka device':
                history('setup');
                break;
            case 'Update password':
                history('updatePassword');
                break;
            default:
                break;
        }
        setAccountMenuClicked(!accountMenuClicked);
    }

    const renderAccountMenuButton = () => {
        return <div className={styles.accountMenuDropdown}>
            <DropdownButton name={'Account'} buttonTypes={['accountMenuBtn']} leftImageSource={account_icon}
                            rightImageSource={arrow_down_black}>
                    <Dropdown type={'accountMenuDropdown'}>
                        <div> Welcome <br/>{user?.email}</div>
                        <DropdownList type={'accountMenuDropdown'}
                                      list={['Saved Files', 'Connect to a Quokka device', 'Update password', 'Logout']}
                                      onDropdownItemClicked={(dropdownItem : string) => handleAccountMenuItemClicked(dropdownItem)}/>
                    </Dropdown>
                </DropdownButton>
            </div>
    }

    return (<div className={styles.header}>
        <div className={styles.horizontalContainer}>
            <div className={styles.logo}>
                <img alt="Quokka" src={logo}/>
                <h1>Quokka</h1>
            </div>

            <div className={styles.menu}>
                <div className={styles.status} >
                    <p className={styles.statusLbl}>Quokka Status:</p>
                    <div className={connDotStyle}/>
                    <NavLink to="/setup" className={statusStyle}>
                        {
                            deviceConn.connected ?
                                `Connected to ${deviceConn.deviceName}` :
                                "Not connected"
                        }
                    </NavLink>
                </div>

                <div className={styles.accountMenu}>
                    {
                        !authenticated ?
                            <div className={styles.loginNavLink}>
                                <img src={account_icon} />
                                <NavLink to="/login" className={(navData) => styles.loginLbl}>Login/Create Account</NavLink>

                            </div>
                            :
                            renderAccountMenuButton()
                    }
                </div>
                <div className={styles.navButtons}>
                    <NavLink to={ROUTES.ABOUT} className={(navData) => navData.isActive ? styles.selected : ""}>About</NavLink>
                    <NavLink to={ROUTES.SETUP} className={(navData) => navData.isActive ? styles.selected : ""}>Setup Quokka</NavLink>
                    <NavLink to={ROUTES.CIRCUIT_BUILDER} className={(navData) => navData.isActive ? styles.selected : ""}>Circuit Builder</NavLink>
                    <NavLink to={ROUTES.CIRCUIT_OUTPUT} className={(navData) => navData.isActive ? styles.selected : ""}>Circuit Output</NavLink>
                </div>
            </div>
            <div className={styles.burgerMenu}
                onClick={() => {setBurgerMenuOpen(!burgerMenuOpen)}}>
                <img src={burger_menu} />
            </div>
        </div>

        {
            burgerMenuOpen ?
                <div className={styles.burgerMenuDropdown}>
                    <hr/>
                    <DropdownItem label={'About'} onClick={() => {}} type='burgerMenuDropdown'>
                        <NavLink to={ROUTES.ABOUT} className={(navData) => navData.isActive ? styles.selected : ""}>About</NavLink>
                    </DropdownItem>
                    <DropdownItem label={'Set up Quokka'} onClick={() => {}} type='burgerMenuDropdown'>
                        <NavLink to={ROUTES.SETUP} className={(navData) => navData.isActive ? styles.selected : ""}>Setup Quokka</NavLink>
                    </DropdownItem>
                </div> : null
        }
    </div>)
}


export default Header;
