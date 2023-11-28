import React from "react";
import styles from "./CompoundGate.module.scss";
import AdaptiveTextBox from "../../../../AdaptiveTextbox/AdaptiveTextBox";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

interface CompoundGateProps {
  width: number;
  height: number;
  name: string | undefined;
}

const CompoundGate: React.FC<CompoundGateProps> = (props) => {
  const { width, height, name } = props;
  let gateName = "UNDEFINED";
  if (name) {
    gateName = name;
  }
  return (
    <OverlayTrigger
      overlay={
        width > height ? (
          <Tooltip id="button-tooltip2" className={styles.toottiptext}>
            {gateName}
          </Tooltip>
        ) : (
          <Tooltip style={{ display: "none" }} />
        )
      }
      placement="right"
    >
      <g className={styles.compoundGate}>
        <rect className={styles.rectBkg} width={width} height={height} rx="4" />
        <AdaptiveTextBox
          text={
            gateName.length > 2 && width > height
              ? gateName.slice(0, 2) + "..."
              : gateName
          }
          width={width}
          height={height}
        />
      </g>
    </OverlayTrigger>
  );
};

export default CompoundGate;
