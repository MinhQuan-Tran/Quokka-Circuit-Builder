import React from 'react';
import styles from './DropdownItem.module.scss';

interface DropdownItemProps {
    onClick : any;
    label?: string;
    type?: string;
    isLastItem? : boolean;
}

const DropdownItem : React.FC<DropdownItemProps> = (props) => {
   const {label, onClick, type, isLastItem, children} = props;
    var dropdownItemStyle = [styles.dropdownItem];

    if (type){
        dropdownItemStyle.push(styles[type]);
    }
    if (isLastItem) {
        dropdownItemStyle.push(styles['lastItem']);
    }

    const renderDropdownContent = (label? : string) => {
        if (type === 'compoundGateDropdown' && label !== '+ Create New') {
            return <div className={styles.listItemRow}>
                {label}
                <svg className={styles.editButton} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.97949 10.6067L12.0709 1.06075C12.6288 0.474962 13.5333 0.474962 14.0912 1.06075C14.6491 1.64653 14.6491 2.59628 14.0912 3.18207L4.9998 12.728L2.97949 10.6067Z" fill="#1F2E4D"/>
                    <path d="M4.32626 13.4351L2.30595 11.3137L1.2958 14.4957L4.32626 13.4351Z" fill="#1F2E4D"/>
                </svg>
                <svg className={styles.removeButton} width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.80111 0H4.98292V0.842105H0.0478516V2.52632H11.4764V0.842105H6.80111V0ZM3.42448 3.36842H0.827073L2.38552 16H3.42448H8.09981H9.13877L10.6972 3.36842H8.09981H3.42448Z" fill="#1F2E4D"/>
                </svg>
            </div>
        }
        else if (label === 'Measurement Gate') {
            return <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 8.99994C15 5.2614 11.866 2.23071 8 2.23071C4.13401 2.23071 1 5.2614 1 8.99994" stroke="#222225"/>
                <path d="M7.6958 7.76923L15.0001 1" stroke="#222225"/>
            </svg>
        } else if (type === "burgerMenuDropdown") {
            return <div className={styles.burgerMenuDropdownNavButton} >{children}</div>
        }
        return <p>{label}</p>;
    }

    return <div className={dropdownItemStyle.join(' ')} onClick={onClick}>
        {renderDropdownContent(label)}
    </div>
}


export default DropdownItem;
