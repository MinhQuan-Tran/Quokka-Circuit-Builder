import { GateExtTypes, GateTypes, ModalState, ModalType } from "./types";

export interface IBaseInterface {
  id: string;
}

export interface IUser {
  id: string;
  email: string;
}

export interface ICircuitConfigFile extends IBaseInterface {
  title: string;
  compoundGates: IGate[];
  circuitState: ICircuitState | null;
}

export interface IGate extends IBaseInterface {
  x: number;
  y: number;
  width: number;
  height: number;
  qubitIds: string[];
  type: GateTypes;
  gateExtension: IGateExtension;
  droppedFromMenu: boolean;
  rotAngle?: string | null;
  name?: string;
  includedGates?: IGate[];
}

export interface IDraggableGate extends IGate {
  dragStartPosition: ICoordinate;
}

export interface IGateExtension {
  id: string;
  targetY: number;
  qubitId: string;
  type: GateExtTypes;
}

export interface IQubit {
  id: string;
  y: number;
  qubitCells: IQubitCell[];
  size: number;
}

export interface IQubitCell {
  id: string;
  x: number;
}

export interface ICircuitState {
  qubits: IQubit[];
  droppedGates: IGate[];
  selectedGates: IGate[];
  draggingGate: IDraggableGate;
}

export interface ICoordinate {
  x: number;
  y: number;
}

export interface IQASMRequestBody {
  script: string;
  count: number;
  state_vector: boolean;
}

export interface IModal {
  id: string;
  type: ModalType;
  state: ModalState;
  extras?: any;
}

export interface IBuildOutput {
  id: string;
  title: string;
  buildCircuitState: ICircuitState;
  buildOutputData: number[][];
  buildDuration: number;
  runIterationCount: number;
  createdDate?: Date;
  updatedDate?: Date;
  measurement?: number;
}

export interface IConnectionResponse {
  error: string;
  statusCode: number;
}

export interface IGatePreview {
  gate: IGate;
  show: boolean;
}
