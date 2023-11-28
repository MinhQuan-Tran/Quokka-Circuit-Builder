import React from "react";
import styles from "./StandardGateMenu.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/reducers/rootReducer";
import { useDispatch } from "react-redux";
import {
  updateCircuitConfigMode,
  updateSelectedStandardGate,
} from "src/redux/actions/circuitConfigAction";
import { ALL_STD_GATES } from "src/common/types";
import GateDescriptions from "src/assets/gate_description.json";
import StandardGateBtn from "./StandardGateBtn/StandardGateBtn";
import x_gate from "src/assets/x_gate.svg";
import y_gate from "src/assets/y_gate.svg";
import z_gate from "src/assets/z_gate.svg";
import rx_gate from "src/assets/rx_gate.svg";
import ry_gate from "src/assets/ry_gate.svg";
import rz_gate from "src/assets/rz_gate.svg";
import cnot_gate from "src/assets/cnot_gate.svg";
import h_gate from "src/assets/h_gate.svg";
import measure_gate from "src/assets/measure_gate.svg";

const StandardGate: React.FC = () => {
  const { circuitConfigMode, selectedGate } = useSelector(
    (state: RootState) => state.circuitConfig
  );

  const dispatch = useDispatch();

  const handleGateClicked = (gate: string) => {
    if (circuitConfigMode === "GateSelectionMode") {
      if (gate === selectedGate) {
        dispatch(updateCircuitConfigMode("NoSelectionMode"));
      } else {
        dispatch(updateSelectedStandardGate(gate));
      }
    } else if (
      circuitConfigMode === "NoSelectionMode" ||
      circuitConfigMode === "CompoundGateSelectionMode"
    ) {
      dispatch(updateCircuitConfigMode("GateSelectionMode"));
      dispatch(updateSelectedStandardGate(gate));
    }
  };

  return (
    <div className={styles.standardGate}>
      <h3>Standard Gate</h3>
      <div className={styles.gateList}>
        {ALL_STD_GATES.map((gate) => {
          let gateImage;
          switch (gate) {
            case "X":
              gateImage = x_gate;
              break;
            case "Y":
              gateImage = y_gate;
              break;
            case "Z":
              gateImage = z_gate;
              break;
            case "RX":
              gateImage = rx_gate;
              break;
            case "RY":
              gateImage = ry_gate;
              break;
            case "RZ":
              gateImage = rz_gate;
              break;
            case "CNOT":
              gateImage = cnot_gate;
              break;
            case "H":
              gateImage = h_gate;
              break;
            case "Measurement Gate":
              gateImage = measure_gate;
              break;
            default:
              gateImage = "";
          }
          return (
            <StandardGateBtn
              // @ts-ignore
              gateName={GateDescriptions[gate].name}
              gateImage={gateImage}
              // @ts-ignore
              gateDescription={GateDescriptions[gate].description}
              selected={
                selectedGate === gate &&
                circuitConfigMode === "GateSelectionMode"
              }
              onClick={() => {
                handleGateClicked(gate);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StandardGate;
