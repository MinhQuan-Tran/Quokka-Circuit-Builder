import React from 'react';
import styles from './StackLayout.module.scss';
interface StackLayoutProps {
    orientation: string;
}

const StackLayout : React.FC<StackLayoutProps> = (props) => {
    const {orientation, children} = props;
    var stackLayoutStyles = [styles.stackLayout];
    stackLayoutStyles.push(styles[orientation]);

    return <div className={stackLayoutStyles.join(' ')}>
        {children}
    </div>
}

export default StackLayout;
