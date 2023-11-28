import React, {useState} from 'react';
import styles from './DropdownButton.module.scss';
import {Button} from "../Button/Button";
import {ButtonTypes} from "../../common/types";
interface DropdownButtonProps {
    name : string;
    buttonTypes: ButtonTypes[];
    imageButtonDropdownSource? : any;
    leftImageSource? : any;
    rightImageSource? : any;
}

const DropdownButton : React.FC<DropdownButtonProps> = (props) => {
    const {name, buttonTypes, imageButtonDropdownSource, leftImageSource, rightImageSource, children} = props;
    const [toggleDropdown, setToggleDropdown] = useState(false);

    const handleDropdownClicked = () => {
        setToggleDropdown(!toggleDropdown);
    }

    const renderButton = (buttonTypes: ButtonTypes[]) => {
        if (buttonTypes.includes( 'imageBtn')) {
            return <img src={imageButtonDropdownSource} onClick={handleDropdownClicked}/>
        }
        else {
            return <Button types={buttonTypes} selected={toggleDropdown} onClick={handleDropdownClicked}
                           name={name} leftImageSource={leftImageSource} rightImageSource={rightImageSource}>
            </Button>
        }
    }

    return <div className={styles.dropdownButton}>
        {
            renderButton(buttonTypes)
        }
        {
            toggleDropdown ?
            children :
                null
        }
    </div>
}

export default DropdownButton;
