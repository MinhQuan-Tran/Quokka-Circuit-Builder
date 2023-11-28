import React from 'react';
import styles from './CircuitBuilder.module.scss';
import Toolbar from './Toolbar/Toolbar';
import CircuitConfig from "./CircuitConfig/CircuitConfig";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import CircuitProcessingInfo from "./CircuitProcessingInfo/CircuitProcessingInfo";
import Cursor from "../Cursor/Cursor";
import SavedFiles from "../SavedFiles/SavedFiles";

const CircuitBuilder : React.FC = () => {
    const {status, circuitConfigMode, viewOnly} = useSelector((state : RootState) => (state.circuitConfig));

    return (
            <div className={styles.circuitBuilder}>
                        <Cursor/>
                        {
                            status ? <CircuitProcessingInfo/> : <Toolbar/>
                        }
                    {
                        circuitConfigMode === 'LoadFilesMode' ?
                            <SavedFiles loadFilesView={true}/>
                            :
                            <CircuitConfig circuitBuilderStatus={status} viewOnly={viewOnly}/>

                    }
            </div>
       )
}

export default CircuitBuilder;
