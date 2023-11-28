import React, {useState} from 'react';
import styles from './Accordion.module.scss';
import arrow_down_navy from '../../assets/arrow_down_navy.svg';
import arrow_up_navy from '../../assets/arrow_up_navy.svg';

interface AccordionProps {
    children : any;
    title: string;
    innerClassName?: string;
}

const Accordion : React.FC<AccordionProps> = (props) => {
    const {title, children, innerClassName} = props;
    const [expanded, setExpanded] = useState(false);


    const handleToggle = () => {
        setExpanded(!expanded);
    }

    return <div className={styles.accordion}>
        <div className={styles.heading} onClick={handleToggle}>
            {title}
            {
                !expanded ?
                    <img src={arrow_down_navy} alt={'arrow-down-navy'}/>
                :
                    <img src={arrow_up_navy} alt={'arrow-up-navy'}/>

            }
        </div>
        <div className={styles.content}>
            {
                !expanded ?
                    <div className={innerClassName}>
                        {children}
                    </div> :
                    null
            }

        </div>

    </div>
}

export default Accordion;
