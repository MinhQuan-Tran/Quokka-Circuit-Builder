import React from "react";
import styles from "./DroppedGates.module.scss";
import DroppedGate from "./DroppedGate/DroppedGate";
import { IGate } from "../../../../common/interfaces";
import { RootState } from "src/redux/reducers/rootReducer";
import { useSelector } from "react-redux";

interface DroppedGatesProps {
  droppedGates: IGate[];
  viewOnly?: boolean;
}

const DroppedGates: React.FC<DroppedGatesProps> = (props) => {
  const { droppedGates, viewOnly } = props;
  // console.log(droppedGates);
  const { selectedGates } = useSelector(
    (state: RootState) => state.circuitConfig.circuitState
  );

  return (
    <g className={styles.droppedGates}>
      {droppedGates.map((gate) => {
        return (
          <DroppedGate
            key={gate.id}
            gate={gate}
            viewOnly={viewOnly}
            selected={selectedGates.includes(gate)}
          />
        );
      })}
    </g>
  );
};

export default DroppedGates;
