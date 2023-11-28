import React, { useEffect, useRef, useState } from "react";
import styles from "./DroppedGate.module.scss";
import Gate from "../../Gate";
import { DraggableGate } from "../../../../../common/classes";
import { GateTypes } from "../../../../../common/types";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDroppedGate,
  updateCircuitConfigMode,
  updateDraggingGate,
  updateDroppedGate,
  updateSelectedCompoundGate,
  updateSelectedGateId,
  updateSelectedStandardGate,
  updateGateEditing,
  updateCompoundGatePreview,
} from "src/redux/actions/circuitConfigAction";
import { IGate } from "../../../../../common/interfaces";
import GateExtension from "../../../GateExtension/GateExtension";
import { GateExtension as GateExtClass } from "../../../../../common/classes";
import { RootState } from "../../../../../redux/reducers/rootReducer";

interface DroppedGateProps {
  viewOnly?: boolean;
  selected: boolean;
  gate: IGate;
}

const DroppedGate: React.FC<DroppedGateProps> = (props) => {
  const { viewOnly, selected, gate } = props;
  const [targetMove, setTargetMove] = useState(false);
  const { circuitConfigMode } = useSelector(
    (state: RootState) => state.circuitConfig
  );
  const dispatch = useDispatch();

  const handleTargetMouseMove = useRef((e: any) => {
    const newY = e.clientY - 168;
    handleTargetMove(true, newY);
  });

  const handleTargetSet = useRef((e: any) => {
    document.removeEventListener("mousemove", handleTargetMouseMove.current);
    document.removeEventListener("mouseup", handleTargetSet.current);
  });

  var showPreview: any = null;

  const openPreview = () => {
    if (circuitConfigMode !== "NoSelectionMode") return;
    if (gate.type !== "Compound Gate") return;

    showPreview = setTimeout(
      () => dispatch(updateCompoundGatePreview(gate, true)),
      500
    );
    // Don't know what is this for
    // if (circuitConfigMode === "NoSelectionMode") {
    //   return;
    // }
    // if (viewOnly || targetMove || gate.droppedFromMenu) {
    //   return;
    // }
    // console.log(gate);
    // const gateExtToUpdate = new GateExtClass(
    //   gate.gateExtension.targetY,
    //   gate.gateExtension.qubitId,
    //   gate.gateExtension.type
    // );
    // const gateToUpdate = new DraggableGate(
    //   gate.x,
    //   gate.y,
    //   { x: gate.x, y: gate.y },
    //   gate.width,
    //   gate.height,
    //   gate.qubitIds,
    //   gate.type,
    //   gateExtToUpdate,
    //   gate.droppedFromMenu,
    //   gate.rotAngle,
    //   gate.name,
    //   gate.includedGates
    // );
    // dispatch(removeDroppedGate(gate.id));
    // dispatch(updateDraggingGate(gateToUpdate));
  };

  const closePreview = () => {
    if (circuitConfigMode !== "NoSelectionMode") return;
    if (gate.type !== "Compound Gate") return;

    console.log("close preview");
    clearTimeout(showPreview);
    dispatch(updateCompoundGatePreview(gate, false));
  };

  const handleTargetMove = (move: boolean, newY?: number) => {
    if (newY) {
      setTargetMove(true);
    }
  };

  useEffect(() => {
    if (circuitConfigMode === "GateSelectionMode") return;
    if (selected) {
      dispatch(updateSelectedGateId(gate.id));
    } else {
      dispatch(updateSelectedGateId(""));
    }
  }, [selected]);

  const handleTargetDragEnd = (newY: number) => {
    setTargetMove(false);
  };

  const handleDoubleClick = (event: any) => {
    if (gate === undefined) return;
    if (circuitConfigMode !== "NoSelectionMode") return;

    console.log("double click from dropped gate");

    dispatch(updateCircuitConfigMode("GateEditingMode"));
    closePreview();
    dispatch(updateGateEditing(gate));

    // if (gate.type === "Compound Gate") {
    //   dispatch(updateCircuitConfigMode("CompoundGateSelectionMode"));
    //   dispatch(updateSelectedStandardGate("Compound Gate"));
    //   dispatch(updateSelectedCompoundGate(gate));
    //   dispatch(removeDroppedGate(gate.id));
    // } else {
    //   dispatch(updateCircuitConfigMode("GateSelectionMode"));
    //   dispatch(updateSelectedStandardGate(gate.type));
    //   dispatch(removeDroppedGate(gate.id));
    // }
  };

  return (
    <g className={styles.DroppedGate} onDoubleClick={handleDoubleClick}>
      <GateExtension
        gateId={gate.id}
        droppedFromMenu={gate.droppedFromMenu}
        gateX={gate.x}
        gateY={gate.y}
        targetY={gate.gateExtension.targetY}
        onTargetMove={handleTargetMove}
        onTargetDragEnd={handleTargetDragEnd}
        type={gate.gateExtension.type}
      />
      <Gate
        id={gate.id}
        x={gate.x}
        y={gate.y}
        width={gate.width}
        height={gate.height}
        type={gate.type as GateTypes}
        rotAngle={gate.rotAngle}
        isAttachment={false}
        name={gate.name}
        selected={selected}
        onMouseEnter={openPreview}
        onMouseLeave={closePreview}
      />
    </g>
  );
};

export default DroppedGate;
