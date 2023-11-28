import React from 'react';
import styles from './GateInput.module.scss';
import {DIMENSIONS} from "../../../../common/constants";
import {openModal} from "../../../../redux/actions/modalsAction";
import {useDispatch} from "react-redux";
import {Modal} from "../../../../common/classes";
import {GateTypes} from "../../../../common/types";

interface GateInputProps {
    gateId: string;
    gateType: GateTypes;
    rotAngle?: string | null
}

const GateInput : React.FC<GateInputProps> = (props) => {
    const {gateId, gateType, rotAngle} = props;
    const dispatch = useDispatch();
    const handleGateInputClicked = () => {
        console.log("gate input clicked! id = ", gateId);
        const extras = {gateId: gateId, gateType: gateType};
        dispatch(openModal(new Modal('EditGateInputModal', 'StartEnterInput', extras)));
    }

    return   <g className={styles.gateInput} onClick={handleGateInputClicked} cursor="text">
        <rect
            className={styles.inputBoundingBox}
            x={DIMENSIONS.GATE_INPUT.WIDTH/2 - DIMENSIONS.GATE_INPUT.MARGIN.LEFT} y={DIMENSIONS.STD_GATE.HEIGHT + DIMENSIONS.GATE_INPUT.MARGIN.TOP}
            width={DIMENSIONS.GATE_INPUT.WIDTH}
            height={DIMENSIONS.GATE_INPUT.HEIGHT}
            rx={2}/>
        <text
            className={styles.inputText}
            x={DIMENSIONS.GATE_INPUT.WIDTH/2 - DIMENSIONS.GATE_INPUT.PADDING.LEFT}
              y={DIMENSIONS.STD_GATE.HEIGHT +
              DIMENSIONS.GATE_INPUT.TEXT.MARGIN.TOP +
              DIMENSIONS.GATE_INPUT.MARGIN.TOP +
              DIMENSIONS.GATE_INPUT.PADDING.TOP}>{rotAngle}</text>
    </g>
}

export default GateInput;
