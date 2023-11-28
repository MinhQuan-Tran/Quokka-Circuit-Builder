import React from 'react';
import styles from './DropdownList.module.scss';
import {DropdownTypes} from "../../../common/types";
import DropdownItem from "./DropdownItem/DropdownItem";
import {IGate} from "../../../common/interfaces";
import {Gate} from "../../../common/classes";
interface DropdownProps {
    list: string[] | IGate[];
    type?: DropdownTypes;
    onDropdownItemClicked : any;
}

const DropdownList : React.FC<DropdownProps> = (props) => {
    const {list, type, onDropdownItemClicked} = props;
    const dropdownListStyle = [styles.dropdownList];
    if (type) {
        dropdownListStyle.push(styles[type]);
    }

    const renderDropdownName = (dropdownListItem : IGate | string) => {
        if (dropdownListItem instanceof Gate
            && dropdownListItem.name
            || typeof dropdownListItem === 'object' ) {
            return dropdownListItem.name;
        } else {
            return dropdownListItem.toString();
        }
    }


    return <div className={dropdownListStyle.join(' ')} >
        {
            list.map((dropdownItem, index) => {
                return <DropdownItem key={index}
                                     label={renderDropdownName(dropdownItem)}
                                     type={type}
                                     onClick={() => onDropdownItemClicked(dropdownItem)}
                                     isLastItem={index === list.length-1}>
                </DropdownItem>
                }
            )
        }
        {
            type === 'compoundGateDropdown' ?
                <DropdownItem label={'+ Create New'}
                              onClick={() => onDropdownItemClicked('+ Create New')}/>
                : null
        }
    </div>
}

export default DropdownList;
