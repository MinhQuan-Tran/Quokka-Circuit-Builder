import React from "react";
import styles from "./Gate.module.scss";
import { GateTypes } from "../../../common/types";
import { DIMENSIONS } from "../../../common/constants";
import GateBackground from "./GateBackground/GateBackground";
import {
  HGateSymbol,
  XGateSymbol,
  YGateSymbol,
  ZGateSymbol,
} from "./GateSymbols/GateSymbols";
import GateInput from "./GateInput/GateInput";
import CompoundGate from "./GateDefinitions/CompoundGate/CompoundGate";

interface GateProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: GateTypes;
  isAttachment: boolean;
  onMouseEnter?: any;
  onMouseLeave?: any;
  rotAngle?: string | null;
  name?: string;
  selected?: boolean;
}

const Gate: React.FC<GateProps> = (props) => {
  const {
    id,
    x,
    y,
    width,
    height,
    type,
    rotAngle,
    isAttachment,
    onMouseEnter,
    onMouseLeave,
    name,
    selected,
  } = props;

  const Gate = (
    x: number,
    y: number,
    width: number,
    height: number,
    gateType: GateTypes
  ) => {
    const relativePosition = isAttachment
      ? "translate(0,0)"
      : `translate(${x},${y})`;
    switch (gateType) {
      case "X":
        return (
          <g transform={relativePosition}>
            <GateBackground
              width={DIMENSIONS.STD_GATE.WIDTH}
              height={DIMENSIONS.STD_GATE.HEIGHT}
              selected={selected}
            />
            <XGateSymbol />
          </g>
        );

      case "Y":
        return (
          <g transform={relativePosition}>
            <GateBackground
              width={DIMENSIONS.STD_GATE.WIDTH}
              height={DIMENSIONS.STD_GATE.HEIGHT}
              selected={selected}
            />
            <YGateSymbol />
          </g>
        );
      case "Z":
        return (
          <g transform={relativePosition}>
            <GateBackground
              width={DIMENSIONS.STD_GATE.WIDTH}
              height={DIMENSIONS.STD_GATE.HEIGHT}
              selected={selected}
            />
            <ZGateSymbol />
          </g>
        );
      case "RX":
        return (
          <g transform={relativePosition}>
            <GateBackground
              width={DIMENSIONS.STD_GATE.WIDTH}
              height={DIMENSIONS.STD_GATE.HEIGHT}
              selected={selected}
            />
            <XGateSymbol />
            <GateInput gateId={id} gateType={type} rotAngle={rotAngle} />
          </g>
        );
      case "RY":
        return (
          <g transform={relativePosition}>
            <GateBackground
              width={DIMENSIONS.STD_GATE.WIDTH}
              height={DIMENSIONS.STD_GATE.HEIGHT}
              selected={selected}
            />
            <YGateSymbol />
            <GateInput gateId={id} gateType={type} rotAngle={rotAngle} />
          </g>
        );
      case "RZ":
        return (
          <g transform={relativePosition}>
            <GateBackground
              width={DIMENSIONS.STD_GATE.WIDTH}
              height={DIMENSIONS.STD_GATE.HEIGHT}
              selected={selected}
            />
            <ZGateSymbol />
            <GateInput gateId={id} gateType={type} rotAngle={rotAngle} />
          </g>
        );
      case "H":
        return (
          <g transform={relativePosition}>
            <GateBackground
              width={DIMENSIONS.STD_GATE.WIDTH}
              height={DIMENSIONS.STD_GATE.HEIGHT}
              selected={selected}
            />
            <HGateSymbol />
          </g>
        );
      case "CNOT":
        return (
          <g transform={relativePosition}>
            <GateBackground
              width={DIMENSIONS.STD_GATE.WIDTH}
              height={DIMENSIONS.STD_GATE.HEIGHT}
              selected={selected}
            />
            <XGateSymbol />
            <defs>
              <linearGradient
                id="paint0_linear_387_5131"
                x1="20"
                y1="0"
                x2="20"
                y2="40"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1F2E4D" />
                <stop offset="1" stopColor="#63718B" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_387_5131"
                x1="20"
                y1="57"
                x2="20"
                y2="83"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1F2E4D" />
                <stop offset="1" stopColor="#63718B" />
              </linearGradient>
            </defs>
          </g>
        );
      case "Measurement Gate":
        return (
          <g transform={relativePosition} fill="none">
            <GateBackground
              width={DIMENSIONS.STD_GATE.WIDTH}
              height={DIMENSIONS.STD_GATE.HEIGHT}
              selected={selected}
            />
            <path
              d="M32 26C32 19.9249 26.8513 15 20.5 15C14.1487 15 9 19.9249 9 26"
              stroke="white"
              strokeWidth="2"
            />
            <path d="M20 24L32 13" stroke="white" strokeWidth="2" />
          </g>
        );
      case "Compound Gate":
        return (
          <g transform={relativePosition}>
            <GateBackground width={width} height={height} selected={selected} />
            <CompoundGate width={width} height={height} name={name} />
          </g>
        );
      default:
        return "None";
    }
  };

  return (
    <g
      className={styles.gate}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {Gate(x, y, width, height, type)}
    </g>
  );
};

export default Gate;
