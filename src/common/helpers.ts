import { IGate, IQubit } from "./interfaces";
import { SelectionBoxState } from "../components/Providers/CompoundGateSelectionContextProvider";
import { Qubit } from "./classes";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const findQubitIndex = (id: string, qubits: IQubit[]) => {
  return qubits.findIndex((qubit) => {
    return qubit.id === id;
  });
};

export const findQubitFromId = (
  id: string,
  qubits: IQubit[]
): IQubit | null => {
  const qubit = qubits.find((qubit) => {
    return qubit.id === id;
  });
  if (qubit) {
    return qubit;
  } else {
    return null;
  }
};

export const findMeasureGate = (
  gates: IGate[],
  qubit: IQubit
): IGate | undefined => {
  return gates.find(
    (gate) => gate.type === "Measurement Gate" && gate.qubitIds[0] === qubit.id
  );
};

export const gateToQASM = (gate: IGate) => {
  var qasmGateScript: string;
  if (gate.type === "CNOT") {
    qasmGateScript = `cx`;
  } else if (gate.rotAngle === null) {
    qasmGateScript = `${gate.type.toLowerCase()}`;
  } else if (gate.rotAngle) {
    qasmGateScript = `${gate.type.toLowerCase()}(${gate.rotAngle})`;
  } else if (gate.type === "H") {
    qasmGateScript = `${gate.type.toLowerCase()}`;
  } else if (gate.type === "Measurement Gate") {
    qasmGateScript = `measure`;
  } else {
    qasmGateScript = `undefined`;
  }
  console.log("qasmGateScript=", qasmGateScript);
  return qasmGateScript;
};

export const locateGatesInSelectionBox = (
  selectionBox: SelectionBoxState,
  droppedGates: IGate[]
): IGate[] => {
  var result: IGate[] = [] as IGate[];
  const box = {
    left:
      selectionBox.dimension.width >= 0
        ? selectionBox.mouseStartPosition.x
        : selectionBox.mouseStartPosition.x + selectionBox.dimension.width,
    top:
      selectionBox.dimension.height >= 0
        ? selectionBox.mouseStartPosition.y
        : selectionBox.mouseStartPosition.y + selectionBox.dimension.height,
    right:
      selectionBox.dimension.width >= 0
        ? selectionBox.mouseStartPosition.x + selectionBox.dimension.width
        : selectionBox.mouseStartPosition.x,
    bottom:
      selectionBox.dimension.height >= 0
        ? selectionBox.mouseStartPosition.y + selectionBox.dimension.height
        : selectionBox.mouseStartPosition.y,
  };

  droppedGates.forEach((gate, indexx) => {
    const gatePosition = {
      left: gate.x,
      top: gate.y,
      right: gate.x + gate.width,
      bottom: gate.y + gate.height,
    };

    // chatGPT :D
    // Check if either rectangle is actually a point
    if (
      (gatePosition.left === gatePosition.right &&
        gatePosition.top === gatePosition.bottom) ||
      (box.left === box.right && box.top === box.bottom)
    ) {
      // Check if the point is inside the other rectangle
      if (
        (gatePosition.left >= box.left &&
          gatePosition.left <= box.right &&
          gatePosition.top >= box.top &&
          gatePosition.top <= box.bottom) ||
        (box.left >= gatePosition.left &&
          box.left <= gatePosition.right &&
          box.top >= gatePosition.top &&
          box.top <= gatePosition.bottom)
      ) {
        result.push(gate);
      }
    } else {
      // Check for intersection
      if (
        !(
          gatePosition.left > box.right ||
          gatePosition.right < box.left ||
          gatePosition.top > box.bottom ||
          gatePosition.bottom < box.top
        )
      ) {
        result.push(gate);
      }
    }
  });

  return result;
};

export const checkGatesInSelectionBox = (
  selectionBox: SelectionBoxState,
  gate: IGate
): boolean => {
  const box = {
    left:
      selectionBox.dimension.width >= 0
        ? selectionBox.mouseStartPosition.x
        : selectionBox.mouseStartPosition.x + selectionBox.dimension.width,
    top:
      selectionBox.dimension.height >= 0
        ? selectionBox.mouseStartPosition.y
        : selectionBox.mouseStartPosition.y + selectionBox.dimension.height,
    right: selectionBox.mouseStartPosition.x + selectionBox.dimension.width,
    bottom: selectionBox.mouseStartPosition.y + selectionBox.dimension.height,
  };
  const gatePosition = {
    left: gate.x,
    top: gate.y,
    right: gate.x + gate.width,
    bottom: gate.y + gate.height,
  };
  if (
    gatePosition.left > box.left &&
    gatePosition.right < box.right &&
    gatePosition.top > box.top &&
    gatePosition.bottom < box.bottom
  ) {
    return true;
  } else {
    return false;
  }
};

export const countGatesHorizontally = (droppedGates: IGate[], yPos: number) => {
  return droppedGates.filter((gate) => gate.y === yPos).length;
};

/**
 * Get the number of qubits that the gates span across the circuit arrangement
 * @param droppedGates
 */
export const countQubitSpan = (droppedGates: IGate[]) => {
  const set = new Set(droppedGates.map((gate) => gate.y));
  return set.size;
};

export const getMaxGatesHorizontally = (
  gatesInSelection: IGate[],
  droppedGates: IGate[]
) => {
  var countArr: number[] = [] as number[];
  gatesInSelection.forEach((gate, index) => {
    // console.log(`count horizontally: ${countGatesHorizontally(droppedGates, gate.y)}`)
    countArr.push(countGatesHorizontally(droppedGates, gate.y));
  });
  return Math.max(...countArr);
};

export const formattedDate = (date?: Date) => {
  if (date) {
    return date.toString().replaceAll("-", "/");
  } else {
    return "undefined";
  }
};

// export const compressGates = (gates: IGate[], qubits: IQubit[]) => {
//   var compressedGates: IGate[] = [] as IGate[];
//   gates.forEach((gate, index) => {
//     if (gate.type === "Measurement Gate") {
//       const qubit = qubits.find((qubit) => qubit.id === gate.qubitIds[0]);
//       if (qubit) {
//         const newQubit = new Qubit();
//         newQubit.id = qubit.qubitId;
//         newQubit.y = qubit.cellYPos;
//         newQubit.size = qubit.colIndex;
//       }
//     }
//   });
//   return compressedGates;
// };
