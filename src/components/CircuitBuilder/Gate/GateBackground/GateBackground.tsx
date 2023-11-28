import React from "react";
import styles from "../Gate.module.scss";

interface GateBackgroundProps {
  width: number;
  height: number;
  selected?: boolean;
}

const GateBackground: React.FC<GateBackgroundProps> = (props) => {
  const { width, height, selected } = props;
  return (
    <g>
      <rect
        width={width}
        height={height}
        rx="4"
        fill="url(#paint0_linear_349_5172)"
        stroke="#5C7DFF"
        strokeWidth={selected ? "4" : "0"}
        className={styles.gateBackground}
      />
      <defs>
        <linearGradient
          id="paint0_linear_349_5172"
          x1={0}
          y1={0}
          x2={20}
          y2={40}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F2E4D" />
          <stop offset="1" stopColor="#63718B" />
        </linearGradient>
      </defs>
    </g>
  );
};

export default GateBackground;
