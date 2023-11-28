import React, {useState} from 'react';
import styles from './Dropdown.module.scss';
import {DropdownTypes} from "../../common/types";
interface DropdownProps {
    type?: DropdownTypes
}


export const Dropdown : React.FC<DropdownProps> = (props) => {
    const {type, children} = props;
    const dropdownStyle = [styles.dropdown];
    if (type === 'accountMenuDropdown') {
        dropdownStyle.push(styles[type]);
    }
    return <div className={dropdownStyle.join(' ')}>
        {
            children
        }
    </div>
}
