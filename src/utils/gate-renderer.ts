import { IGate } from "src/common/interfaces";
import { countQubitSpan } from "src/common/helpers";
import { DIMENSIONS } from "../common/constants";
import { Gate, GateExtension } from "../common/classes";
import { calculateCompoundGateHeight, calculateQubitGap } from "./formula";
import { current } from "@reduxjs/toolkit";

export const renderCompoundGate = (
  gatesInSelection: IGate[],
  gateName: string
): IGate => {
  const compoundGatePosition = findFurthestTopLeftGateInArray(gatesInSelection);
  const qubitSpan = countQubitSpan(gatesInSelection);
  const qubitGap = calculateQubitGap(
    DIMENSIONS.GRID.HEIGHT,
    DIMENSIONS.STD_GATE.HEIGHT
  );
  let compoundGateDimension: { width: number; height: number };
  compoundGateDimension = {
    width: DIMENSIONS.STD_GATE.WIDTH,
    height: calculateCompoundGateHeight(
      qubitSpan,
      DIMENSIONS.STD_GATE.HEIGHT,
      qubitGap
    ),
  };
  const leftPosition = gatesInSelection.reduce(
    (min, gate) => (gate.x < min ? gate.x : min),
    gatesInSelection[0].x
  );
  const topPosition = gatesInSelection.reduce(
    (min, gate) => (gate.y < min ? gate.y : min),
    gatesInSelection[0].y
  );
  return new Gate(
    compoundGatePosition.x,
    compoundGatePosition.y,
    compoundGateDimension.width,
    compoundGateDimension.height,
    gatesInSelection
      .map((gate) => gate.qubitIds)
      .flat(1)
      .reduce((accumulator: string[], currentValue) => {
        if (!accumulator.includes(currentValue)) {
          accumulator.push(currentValue);
        }
        return accumulator;
      }, []),
    "Compound Gate",
    new GateExtension(0, "", "None"),
    false,
    null,
    gateName,
    gatesInSelection.map((gate) => {
      return {
        ...gate,
        x: gate.x - leftPosition,
        y: gate.y - topPosition,
      };
    })
  );
};

/**
 * Find the furthest top left gate in an array of gates
 * Condition:
 * #1 priority: gate is furthest to the left
 * #2 priority: gate is furthest to the top
 * @param droppedGates
 */
export const findFurthestTopLeftGateInArray = (
  droppedGates: IGate[]
): { x: number; y: number } => {
  var furthestLeft = droppedGates[0].x;
  var furthestTop = droppedGates[0].y;

  droppedGates.forEach((gate, index) => {
    if (gate.x < furthestLeft) {
      furthestLeft = gate.x;
    }
    if (gate.y < furthestTop) {
      furthestTop = gate.y;
    }
  });
  return { x: furthestLeft, y: furthestTop };
};
