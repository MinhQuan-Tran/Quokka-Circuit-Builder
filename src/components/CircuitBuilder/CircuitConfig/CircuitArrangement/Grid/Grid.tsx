import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Grid.module.scss";
import Qubit from "./Qubit/Qubit";
import DraggingGate from "src/components/CircuitBuilder/Gate/DraggingGate/DraggingGate";
import DroppedGates from "src/components/CircuitBuilder/Gate/DroppedGates/DroppedGates";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/reducers/rootReducer";
import AddQubitActionBtn from "./Qubit/AddQubitActionBtn";
import {
  updateSelectedGates,
  addQubit,
  removeDroppedGate,
  removeQubit,
  updateQubit,
  updateSelectedQubit,
  removeDroppedGates,
} from "../../../../../redux/actions/circuitConfigAction";
import { DIMENSIONS } from "../../../../../common/constants";
import {
  findQubitFromId,
  locateGatesInSelectionBox,
} from "../../../../../common/helpers";
import {
  CompoundGateSelectionContext,
  defaultSelectionBoxValue,
} from "src/components/Providers/CompoundGateSelectionContextProvider";
import { ICircuitState, IQubit } from "../../../../../common/interfaces";

const getElOffset = (el: any) => {
  const rect = el.getBoundingClientRect();

  return {
    left: rect.x,
    top: rect.y,
  };
};

interface GridProps {
  circuitState: ICircuitState;
  viewOnly?: boolean;
}

const Grid: React.FC<GridProps> = (props) => {
  const { viewOnly, circuitState } = props;
  const { circuitConfigMode, selectedQubit } = useSelector(
    (state: RootState) => state.circuitConfig
  );
  const { droppedGates, selectedGates } = useSelector(
    (state: RootState) => state.circuitConfig.circuitState
  );
  const gridRef: any = useRef(null);
  const { selectionBox, setSelectionBox } = useContext(
    CompoundGateSelectionContext
  );
  const [gridPosition, setGridPosition] = useState({
    x: 0,
    y: 168,
  });
  const dispatch = useDispatch();

  const handleAddQubitActionBtnClicked = () => {
    dispatch(addQubit());
  };

  const handleQubitSelected = (qubit: IQubit) => {
    if (viewOnly) {
      return;
    }

    if (selectedQubit.id === qubit.id) {
      dispatch(updateSelectedQubit(qubit));
    } // unselect if already selected
    else {
      dispatch(updateSelectedQubit(qubit));
    }
  };

  // useEffect(() => {
  //   const handleQubitDeleted = async (event: any) => {
  //     if (event.keyCode === 46) {
  //       //DELETE KEY
  //       dispatch(removeQubit(selectedQubitId));
  //       circuitState.droppedGates.forEach((gate, index) => {
  //         if (gate.qubitIds.includes(selectedQubitId)) {
  //           dispatch(removeDroppedGate(gate.id));
  //         }
  //       });
  //     }
  //   };
  //   window.addEventListener("keydown", handleQubitDeleted);
  //   return () => {
  //     window.removeEventListener("keydown", handleQubitDeleted);
  //   };
  // }, [selectedQubitId]);

  // useEffect(() => {
  //   const handleGateDeleted = async (event: any) => {
  //     if (event.keyCode === 46 || event.keyCode === 8) {
  //       // Delete key and backspace key
  //       dispatch(removeDroppedGates(selectedGates, circuitState.qubits));
  //       // const gateToDelete = circuitState.droppedGates.find(
  //       //   (gate) => gate.id === selectedGateId
  //       // );
  //       // if (gateToDelete) {
  //       //   console.log(gateToDelete);
  //       //   let newQubit = new QubitClass(48);
  //       //   let targetQubit: IQubit | null = findQubitFromId(
  //       //     gateToDelete.qubitIds[0],
  //       //     circuitState.qubits
  //       //   );
  //       //   if (targetQubit) {
  //       //     newQubit.id = targetQubit.id;
  //       //     newQubit.y = targetQubit.y;
  //       //     newQubit.size = 48;
  //       //     dispatch(
  //       //       updateQubit(targetQubit.id, "qubitCells", newQubit.qubitCells)
  //       //     );
  //       //   }
  //       //   dispatch(removeDroppedGate(selectedGateId));
  //       // }
  //     }
  //   };
  //   window.addEventListener("keydown", handleGateDeleted);
  //   return () => {
  //     window.removeEventListener("keydown", handleGateDeleted);
  //   };
  // }, [selectedGateId]);

  useEffect(() => {
    if (selectionBox.isDrawing) {
      dispatch(
        updateSelectedGates(
          locateGatesInSelectionBox(selectionBox, droppedGates)
        )
      );
    }
  }, [selectionBox, droppedGates]);

  const handleKeyDownCapture = (event: any) => {
    if (event.keyCode === 46 || event.keyCode === 8) {
      dispatch(removeDroppedGates(selectedGates, circuitState.qubits));
      dispatch(removeQubit(selectedQubit));
    }
  };

  const showGridPattern = () => {
    return (
      <>
        <pattern
          id="grid-pattern"
          x="0"
          y="0"
          width={DIMENSIONS.GRID.WIDTH}
          height={DIMENSIONS.GRID.HEIGHT}
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="0"
            y={DIMENSIONS.GRID.PADDING.TOP}
            width={DIMENSIONS.STD_GATE.WIDTH}
            height={DIMENSIONS.STD_GATE.HEIGHT}
            fill="#B5C2D7"
            opacity="0.1"
          />
          <rect
            x="0"
            y="0"
            width={DIMENSIONS.GRID.WIDTH}
            height={DIMENSIONS.GRID.HEIGHT}
            stroke="#B5C2D7"
            fill="transparent"
            opacity="1"
          />
        </pattern>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#grid-pattern)"
        />
      </>
    );
  };

  // check selected gates in selection box above
  const handleMouseDown = (event: any) => {
    if (circuitConfigMode === "GateSelectionMode") return; // ignore if in gate dropping mode
    if (event.button === 2) return; // ignore right click
    let offset = getElOffset(gridRef.current);
    const mouseStartPos = {
      x: event.clientX - offset.left,
      y: event.clientY - offset.top,
    };

    setSelectionBox(() => ({
      mouseStartPosition: { x: mouseStartPos.x, y: mouseStartPos.y },
      dimension: { width: 0, height: 0 },
      offset: offset,
      isDrawing: true,
    }));
  };

  const handleMouseMove = (event: any) => {
    if (!selectionBox.isDrawing) return;

    let currMousePos = {
      x: event.clientX - selectionBox.offset.left,
      y: event.clientY - selectionBox.offset.top,
    };

    let newDimension = {
      width: currMousePos.x - selectionBox.mouseStartPosition.x,
      height: currMousePos.y - selectionBox.mouseStartPosition.y,
    };

    setSelectionBox((prev) => ({
      ...prev,
      dimension: { width: newDimension.width, height: newDimension.height },
    }));
  };

  const handleMouseUp = (event: any) => {
    if (!selectionBox.isDrawing) return;
    setSelectionBox(() => defaultSelectionBoxValue.selectionBox);
  };

  return (
    <svg
      className={styles.grid}
      ref={gridRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDownCapture}
      style={{ height: viewOnly ? `20%` : `100%` }}
      tabIndex={0}
      focusable={true}
    >
      {/*{showGridPattern()}*/}
      {circuitState.qubits.map((qubit, index) => {
        return (
          <Qubit
            key={qubit.id}
            qubit={qubit}
            rowVerticalOffset={
              DIMENSIONS.GRID.HEIGHT * index + DIMENSIONS.GRID.PADDING.TOP
            }
            qubitCells={qubit.qubitCells}
            onQubitSelected={handleQubitSelected}
            rowIndex={index}
          />
        );
      })}

      {viewOnly ? null : (
        <AddQubitActionBtn
          x={DIMENSIONS.ADD_QUBIT_BTN.X_OFFSET}
          y={
            circuitState.qubits.length * DIMENSIONS.GRID.HEIGHT +
            DIMENSIONS.ADD_QUBIT_BTN.Y_OFFSET +
            DIMENSIONS.GRID.PADDING.TOP
          }
          onClick={handleAddQubitActionBtnClicked}
        />
      )}

      <DroppedGates
        droppedGates={circuitState.droppedGates}
        viewOnly={viewOnly}
      />
      <DraggingGate xOffset={gridPosition.x} yOffset={gridPosition.y} />

      <rect
        className={styles.selectionBox}
        x={
          selectionBox.dimension.width >= 0
            ? selectionBox.mouseStartPosition.x
            : selectionBox.mouseStartPosition.x + selectionBox.dimension.width
        }
        y={
          selectionBox.dimension.height >= 0
            ? selectionBox.mouseStartPosition.y
            : selectionBox.mouseStartPosition.y + selectionBox.dimension.height
        }
        width={
          selectionBox.dimension.width >= 0
            ? selectionBox.dimension.width
            : -selectionBox.dimension.width
        }
        height={
          selectionBox.dimension.height >= 0
            ? selectionBox.dimension.height
            : -selectionBox.dimension.height
        }
      />
    </svg>
  );
};

export default Grid;
