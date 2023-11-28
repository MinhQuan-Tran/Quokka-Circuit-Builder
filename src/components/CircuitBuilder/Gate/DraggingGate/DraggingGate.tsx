/**
 * Copyright (c) University of Technology Sydney. All rights reserved.
 * See LICENSE file in the project root for full license information.
 *
 * Purpose: The Q Web App
 * Author: Thien Phuc Ho
 */

import React, { useRef, useState } from "react";
import styles from "./DraggingGate.module.scss";
import Gate from "../Gate";
import {
  Gate as GateClass,
  GateExtension as GateExtClass,
} from "src/common/classes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/reducers/rootReducer";
import {
  addDroppedGate,
  removeDraggingGate,
  updateDraggingGatePosition,
  updateSelectedGateId,
} from "src/redux/actions/circuitConfigAction";
import { DIMENSIONS } from "src/common/constants";
import DraggableGateExtension from "src/components/CircuitBuilder/GateExtension/DraggableGateExtension/DraggableGateExtension";

/**
 * @param xOffset x position relative to cursor pointer x
 * @param yOffset y position relative to cursor pointer y
 */
interface DraggingGateProps {
  xOffset: number;
  yOffset: number;
}

/**
 *
 * @param children
 * @constructor
 */
const DraggingGate: React.FC<DraggingGateProps> = (children) => {
  const { xOffset, yOffset } = children;
  const { draggingGate } = useSelector(
    (state: RootState) => state.circuitConfig.circuitState
  );
  const [isDragging, setIsDragging] = useState(false);
  const dispatch = useDispatch();
  const draggingGateRef: any = useRef(null);

  const handleDraggableMouseDown = (e: any) => {
    setIsDragging(true);
  };

  const handleDraggableMouseMove = (e: any) => {
    if (!isDragging) return;
    const newX = e.clientX - xOffset - draggingGate.width / 2;
    const newY = e.clientY - yOffset - draggingGate.height / 2;
    dispatch(updateDraggingGatePosition(newX, newY));
  };

  const handleDraggableMouseUp = (e: any) => {
    setIsDragging(false);

    let { newX, newY } = getSnapToGridPositionFloor(
      e.clientX - xOffset,
      e.clientY - yOffset - draggingGate.height / 2
    );

    let dist = newY - draggingGate.dragStartPosition.y;
    let offset;
    offset = draggingGate.gateExtension.targetY + dist;

    const newGateExt = new GateExtClass(
      offset,
      draggingGate.gateExtension.qubitId,
      draggingGate.gateExtension.type
    );
    const newDroppedGate = new GateClass(
      newX,
      newY,
      draggingGate.width,
      draggingGate.height,
      draggingGate.qubitIds,
      draggingGate.type,
      newGateExt,
      draggingGate.droppedFromMenu,
      draggingGate.rotAngle,
      draggingGate.name,
      draggingGate.includedGates
    );
    if (
      draggingGate.dragStartPosition.x === newX &&
      draggingGate.dragStartPosition.y === newY &&
      !draggingGate.droppedFromMenu
    ) {
      dispatch(updateSelectedGateId(newDroppedGate.id));
    }
    dispatch(addDroppedGate(newDroppedGate));
    dispatch(removeDraggingGate());
  };

  const handleDraggableMouseLeft = () => {
    if (
      draggingGate.dragStartPosition.x !== draggingGate.x &&
      draggingGate.dragStartPosition.y !== draggingGate.y
    ) {
      return;
    }

    const newGateExt = new GateExtClass(
      draggingGate.gateExtension.targetY,
      draggingGate.gateExtension.qubitId,
      draggingGate.gateExtension.type
    );
    const newDroppedGate = new GateClass(
      draggingGate.x,
      draggingGate.y,
      draggingGate.width,
      draggingGate.height,
      draggingGate.qubitIds,
      draggingGate.type,
      newGateExt,
      draggingGate.droppedFromMenu,
      draggingGate.rotAngle,
      draggingGate.name,
      draggingGate.includedGates
    );
    dispatch(removeDraggingGate());
    dispatch(addDroppedGate(newDroppedGate));
  };

  return (
    <g
      ref={draggingGateRef}
      className={styles.draggingGate}
      onMouseDown={handleDraggableMouseDown}
      onMouseMove={handleDraggableMouseMove}
      onMouseUp={handleDraggableMouseUp}
      onMouseLeave={handleDraggableMouseLeft}
    >
      {draggingGate.gateExtension ? (
        <DraggableGateExtension
          gateX={draggingGate.x}
          gateY={draggingGate.y}
          targetY={
            draggingGate.gateExtension.targetY +
            (draggingGate.y - draggingGate.dragStartPosition.y)
          }
          type={draggingGate.gateExtension.type}
        />
      ) : null}

      <Gate
        id={draggingGate.id}
        x={draggingGate.x}
        y={draggingGate.y}
        width={draggingGate.width}
        height={draggingGate.height}
        type={draggingGate.type}
        isAttachment={false}
        rotAngle={draggingGate.rotAngle}
        name={draggingGate.name}
      />
    </g>
  );
};

export default DraggingGate;

/**
 * This function takes x, y co-ordinates of a gate and
 * round those values to the nearest grid position (floor y)
 * @param x
 * @param y
 */
export const getSnapToGridPositionFloor = (x: number, y: number) => {
  const roundX = Math.floor(x / DIMENSIONS.GRID.WIDTH) * DIMENSIONS.GRID.WIDTH;
  const roundY =
    Math.floor(y / DIMENSIONS.GRID.HEIGHT) * DIMENSIONS.GRID.HEIGHT +
    DIMENSIONS.GRID.PADDING.TOP;
  return { newX: roundX, newY: roundY };
};

/**
 * This function takes y co-ordinate of a gate and
 * round those values to the nearest grid position (ceiling y)
 * @param y
 */
export const getSnapToGridPositionCeiling = (y: number) => {
  return (
    Math.ceil(y / DIMENSIONS.GRID.HEIGHT) * DIMENSIONS.GRID.HEIGHT +
    DIMENSIONS.GRID.PADDING.TOP
  );
};
