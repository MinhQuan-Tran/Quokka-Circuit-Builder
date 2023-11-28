import React, {useContext, useEffect, useRef} from 'react';
import styles from './GateExtension.module.scss'
import {DIMENSIONS} from "../../../common/constants";
import {GateExtTypes} from "../../../common/types";
import {useDispatch, useSelector} from "react-redux";
import {updateDroppedGate, updateDroppedGateExtension} from "../../../redux/actions/circuitConfigAction";
import {RootState} from "../../../redux/reducers/rootReducer";
import {CursorContext} from "../../Providers/CursorContextProvider";

interface GateExtensionProps {
    gateId : string;
    droppedFromMenu : boolean;
    gateX : number;
    gateY : number;
    targetY : number;
    onTargetMove? : any;
    onTargetDragEnd : any;
    type : GateExtTypes;
}

export const GateExtension: React.FC<GateExtensionProps>= (props) => {
    const gateExtRef : any = useRef(null);
    const {gateX, gateY, targetY, onTargetMove, onTargetDragEnd, type, gateId, droppedFromMenu} = props;
    const {circuitState} = useSelector((state : RootState) => (state.circuitConfig));
    const {cursor ,setCursor } = useContext(CursorContext);
    const relativePos = `translate(0,0)`
    const dispatch = useDispatch();

    useEffect(() => {
        if (droppedFromMenu && type === 'CNOT_TARGET') {
            document.addEventListener('mousemove', handleTargetMouseMove.current);
        }
        return () => {
        }
    }, [])
    const handleTargetMouseDown = () => {
        document.addEventListener('mousemove', handleTargetMouseMove.current);
    }

    const handleTargetMouseMove = useRef((e : any) => {
        const newY = e.clientY - 168;
        onTargetMove(true, newY);
        dispatch(updateDroppedGateExtension(gateId, 'targetY', newY))

    });

    const handleTargetMouseUp = (e : any) => {
        document.removeEventListener('mousemove', handleTargetMouseMove.current);
        const newY = Math.floor(e.clientY / DIMENSIONS.GRID.HEIGHT) * DIMENSIONS.GRID.HEIGHT - 170 + DIMENSIONS.STD_GATE.HEIGHT/2;
        dispatch(updateDroppedGateExtension(gateId, 'targetY', newY));
        dispatch(updateDroppedGateExtension(gateId, 'qubitId', getQubitIdFromYCoordinate(newY)?.id))
        dispatch(updateDroppedGate(gateId, 'droppedFromMenu', false));
        onTargetMove(false);
        onTargetDragEnd(newY);
        setCursor((cursorContextStates) => ({attached: true}));
    }

    const getQubitIdFromYCoordinate = (y : number) => {
        return circuitState.qubits.find((item) => {
            return item.y === y;
        });
    }

    const renderGateExt = (type : GateExtTypes) => {
        if (type === 'CNOT_TARGET') {
            return <g
                className={styles.gateExtension}
                transform={relativePos}
                ref={gateExtRef}>

                <line
                    className={styles.innerStroke}
                    stroke="#5E6C87"  strokeWidth="4"
                    x1={gateX + DIMENSIONS.STD_GATE.WIDTH/2}
                    x2={gateX + DIMENSIONS.STD_GATE.WIDTH/2}
                    y1={gateY + DIMENSIONS.STD_GATE.HEIGHT/2}
                    y2={targetY}>
                </line>
                <circle
                    className={styles.target}
                    onMouseDown={handleTargetMouseDown}
                    onMouseUp={handleTargetMouseUp}
                    cx={gateX + DIMENSIONS.STD_GATE.WIDTH/2}
                    cy={targetY} r="13" fill="url(#paint0_linear_387_5131)"/>
                <defs>
                    <linearGradient id="paint0_linear_387_5131" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#1F2E4D"/>
                        <stop offset="1" stopColor="#63718B"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_387_5131" x1="20" y1="57" x2="20" y2="83" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#1F2E4D"/>
                        <stop offset="1" stopColor="#63718B"/>
                    </linearGradient>
                </defs>
            </g>
        } else {
            return null;
        }
    }

    return renderGateExt(type);
}

export default GateExtension;
