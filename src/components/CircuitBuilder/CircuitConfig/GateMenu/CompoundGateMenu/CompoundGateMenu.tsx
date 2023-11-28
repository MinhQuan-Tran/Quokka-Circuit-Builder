import React from "react";
import styles from "./CompoundGateMenu.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/reducers/rootReducer";
import {
  updateCircuitConfigMode,
  updateSelectedCompoundGate,
  updateSelectedStandardGate,
} from "src/redux/actions/circuitConfigAction";
import { Button } from "src/components/Button/Button";
import { IGate } from "src/common/interfaces";
import AdaptiveTextBox from "src/components/AdaptiveTextbox/AdaptiveTextBox";

const CompoundGateMenu: React.FC = () => {
  const { circuitConfigMode, selectedCompoundGate, compoundGates } =
    useSelector((state: RootState) => state.circuitConfig);
  const dispatch = useDispatch();

  const handleGateClicked = (gate: IGate) => {
    if (gate === undefined) return;
    if (circuitConfigMode === "CompoundGateSelectionMode") {
      if (gate === selectedCompoundGate) {
        dispatch(updateCircuitConfigMode("NoSelectionMode"));
      } else {
        dispatch(updateSelectedStandardGate("Compound Gate"));
        dispatch(updateSelectedCompoundGate(gate));
      }
    } else if (
      circuitConfigMode === "NoSelectionMode" ||
      circuitConfigMode === "GateSelectionMode"
    ) {
      dispatch(updateCircuitConfigMode("CompoundGateSelectionMode"));
      dispatch(updateSelectedStandardGate("Compound Gate"));
      dispatch(updateSelectedCompoundGate(gate));
    }
  };

  return (
    <div className={styles.compoundGate}>
      <h3>Compound Gate</h3>
      <div className={styles.gateList}>
        {compoundGates.map((gate) => {
          if (gate.name === undefined) return null;
          let gateImage = (
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="40"
                height="40"
                rx="4"
                fill="url(#paint0_linear_349_5192)"
              />
              <AdaptiveTextBox
                text={
                  gate.name.length > 2
                    ? gate.name.slice(0, 2) + "..."
                    : gate.name
                }
                width={40}
                height={40}
              />
              <defs>
                <linearGradient
                  id="paint0_linear_349_5192"
                  x1="20"
                  y1="0"
                  x2="20"
                  y2="40"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1F2E4D" />
                  <stop offset="1" stopColor="#63718B" />
                </linearGradient>
              </defs>
            </svg>
          );
          return (
            <Button
              types={["gateBtn"]}
              selected={
                selectedCompoundGate === gate &&
                circuitConfigMode === "CompoundGateSelectionMode"
              }
              name=""
              svgSource={gateImage}
              onClick={() => handleGateClicked(gate)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CompoundGateMenu;
