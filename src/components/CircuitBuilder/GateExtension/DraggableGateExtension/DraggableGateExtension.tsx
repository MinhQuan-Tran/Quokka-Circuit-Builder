import React, {useRef} from 'react';
import {DIMENSIONS} from "../../../../common/constants";
import styles from "../GateExtension.module.scss";
import {GateExtTypes} from "../../../../common/types";

interface DraggableGateExtensionProps {
    gateX : number;
    gateY : number;
    targetY : number;
    type : GateExtTypes
}

const DraggableGateExtension : React.FC<DraggableGateExtensionProps> = (props) => {
    const gateExtRef : any = useRef(null);
    const {gateX, gateY, targetY, type} = props;
    const relativePos = `translate(0,0)`

    const renderDraggableGateExt = (type : GateExtTypes) => {
        if (type === 'CNOT_TARGET') {
            return <g
                className={styles.gateExtension}
                transform={relativePos}
                ref={gateExtRef}>

                <line
                    className={styles.outerStroke}
                    x1={gateX + DIMENSIONS.STD_GATE.WIDTH/2-3}
                    x2={gateX + DIMENSIONS.STD_GATE.WIDTH/2-3}
                    y1={gateY + DIMENSIONS.STD_GATE.HEIGHT}
                    y2={targetY}>
                </line>

                <line
                    className={styles.innerStroke}
                    stroke="#5E6C87"  strokeWidth="4"
                    x1={gateX + DIMENSIONS.STD_GATE.WIDTH/2}
                    x2={gateX + DIMENSIONS.STD_GATE.WIDTH/2}
                    y1={gateY + DIMENSIONS.STD_GATE.HEIGHT/2}
                    y2={targetY}>
                </line>

                <line
                    className={styles.outerStroke}
                    x1={gateX + DIMENSIONS.STD_GATE.WIDTH/2+3}
                    x2={gateX + DIMENSIONS.STD_GATE.WIDTH/2+3}
                    y1={gateY + DIMENSIONS.STD_GATE.HEIGHT/2}
                    y2={targetY}>
                </line>

                <circle
                    className={styles.target}
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

    return renderDraggableGateExt(type)
}

export default DraggableGateExtension;
