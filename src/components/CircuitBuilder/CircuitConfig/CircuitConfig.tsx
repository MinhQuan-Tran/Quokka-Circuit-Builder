import React from "react";
import styles from "./CircuitConfig.module.scss";
import CircuitArrangement from "./CircuitArrangement/CircuitArrangement";
import GateMenu from "./GateMenu/GateMenu";
import ViewOptions from "./ViewOptions/ViewOptions";
import {RootState} from '../../../redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import Footer from "src/components/Footer/Footer";

interface CircuitConfigProps {
  circuitBuilderStatus: boolean;
  viewOnly: boolean;
}

const CircuitConfig : React.FC <CircuitConfigProps> = (props) => {
    const {circuitBuilderStatus, viewOnly} = props;
    const {circuitState} = useSelector((state : RootState) => (state.circuitConfig));
    var circuitConfigStyle = styles.circuitConfig;
    if (circuitBuilderStatus) {
        circuitConfigStyle = styles.circuitConfig + ' ' + styles.disabled;
    }

    return (<div className={circuitConfigStyle}>
          <CircuitArrangement viewOnly={viewOnly}/>
          <GateMenu />
          <div>
            <ViewOptions circuitState={circuitState}/>
          </div>
    </div>
  );
};

export default CircuitConfig;
