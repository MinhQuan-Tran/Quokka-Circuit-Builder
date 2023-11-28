import React from "react";
import styles from "./GatePreview.module.scss";
import { IGate, IQubit } from "src/common/interfaces";
import DroppedGates from "../DroppedGates/DroppedGates";
import Qubit from "src/components/CircuitBuilder/CircuitConfig/CircuitArrangement/Grid/Qubit/Qubit";
import { DIMENSIONS } from "src/common/constants";

interface GatePreviewProps {
  gate: IGate;
}

const GatePreview: React.FC<GatePreviewProps> = (props) => {
  const { gate } = props;

  if (gate.includedGates === undefined)
    return (
      <div
        className={styles.GatePreview}
        style={{ left: props.gate.x + props.gate.width, top: props.gate.y }}
      >
        Error! No gate found insde.
      </div>
    );

  const rightPosition = gate.includedGates.reduce(
    (max, gate) => (gate.x + gate.width > max ? gate.x + gate.width : max),
    gate.includedGates[0].x
  );
  const bottomPostion = gate.includedGates.reduce(
    (max, gate) => (gate.y + gate.height > max ? gate.y + gate.height : max),
    gate.includedGates[0].y
  );

  const qubitIds = new Set<string>();

  gate.includedGates.forEach((gate) =>
    gate.qubitIds.forEach((id) => {
      qubitIds.add(id);
    })
  );

  const qubits = [] as {
    id: string;
    size: number;
  }[];

  Array.from(qubitIds).forEach((id, index) => {
    qubits.push({
      id: id,
      size: 48,
    });
  });

  return (
    <div
      className={styles.GatePreview}
      style={{ left: props.gate.x + props.gate.width, top: props.gate.y }}
    >
      <svg
        style={{
          width: rightPosition + DIMENSIONS.STD_GATE.WIDTH,
          height: bottomPostion,
        }}
      >
        <g>
          {qubits.map((qubit, index) => {
            return (
              <line
                key={qubit.id}
                x1={0}
                y1={
                  index * DIMENSIONS.GRID.HEIGHT +
                  DIMENSIONS.STD_GATE.HEIGHT / 2
                }
                x2={48 * DIMENSIONS.GRID.WIDTH + DIMENSIONS.STD_GATE.WIDTH}
                y2={
                  index * DIMENSIONS.GRID.HEIGHT +
                  DIMENSIONS.STD_GATE.HEIGHT / 2
                }
              />
            );
          })}
        </g>
        <DroppedGates
          droppedGates={
            gate.includedGates !== undefined
              ? gate.includedGates.map((gate) => {
                  return { ...gate, x: gate.x + DIMENSIONS.STD_GATE.WIDTH / 2 };
                })
              : []
          }
          viewOnly={true}
        />
      </svg>
    </div>
  );
};

export default GatePreview;
