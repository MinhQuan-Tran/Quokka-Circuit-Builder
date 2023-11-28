import { DeviceConnectionState } from "../redux/reducers/deviceConnectionReducer";
import {
  IBaseInterface,
  IBuildOutput,
  ICircuitConfigFile,
  ICircuitState,
  ICoordinate,
  IDraggableGate,
  IGate,
  IGateExtension,
  IModal,
  IQubit,
  IQubitCell,
} from "./interfaces";
import { GateExtTypes, GateTypes, ModalState, ModalType } from "./types";
import { v4 } from "uuid";
import { DIMENSIONS } from "./constants";

export class DeviceConnection implements DeviceConnectionState {
  connected: boolean;
  deviceName: string;
  constructor(connected: boolean, deviceName: string) {
    this.connected = connected;
    this.deviceName = deviceName;
  }
}

export class BaseClass implements IBaseInterface {
  id: string;
  constructor() {
    this.id = v4();
  }
}

export class CircuitConfigFile extends BaseClass implements ICircuitConfigFile {
  title: string;
  compoundGates: IGate[];
  circuitState: ICircuitState | null;
  constructor(
    name: string,
    compoundGates: IGate[],
    circuitState: ICircuitState | null
  ) {
    super();
    this.title = name;
    this.compoundGates = compoundGates;
    this.circuitState = circuitState;
  }
}

export class Gate extends BaseClass implements IGate {
  x: number;
  y: number;
  width: number;
  height: number;
  type: GateTypes;
  rotAngle?: string | null;
  qubitIds: string[];
  gateExtension: IGateExtension;
  droppedFromMenu: boolean;
  name?: string;
  includedGates?: IGate[];

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    qubitIds: string[],
    type: GateTypes,
    gateExtension: IGateExtension,
    droppedFromMenu: boolean,
    rotAngle?: string | null,
    name?: string,
    includedGates?: IGate[]
  ) {
    super();
    this.qubitIds = qubitIds;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
    this.rotAngle = rotAngle;
    this.gateExtension = gateExtension;
    this.droppedFromMenu = droppedFromMenu;
    this.name = name;
    this.includedGates = includedGates;
  }
}

export class DraggableGate extends Gate implements IDraggableGate {
  dragStartPosition: ICoordinate;
  constructor(
    x: number,
    y: number,
    dragStartPosition: ICoordinate,
    width: number,
    height: number,
    qubitIds: string[],
    type: GateTypes,
    gateExtension: IGateExtension,
    droppedFromMenu: boolean,
    rotAngle?: string | null,
    name?: string,
    includedGates?: IGate[]
  ) {
    super(
      x,
      y,
      width,
      height,
      qubitIds,
      type,
      gateExtension,
      droppedFromMenu,
      rotAngle,
      name,
      includedGates
    );
    this.dragStartPosition = dragStartPosition;
  }
}

export class GateExtension extends BaseClass implements IGateExtension {
  targetY: number;
  qubitId: string;
  type: GateExtTypes;

  constructor(targetY: number, qubitId: string, type: GateExtTypes) {
    super();
    this.targetY = targetY;
    this.qubitId = qubitId;
    this.type = type;
  }
}

export class Qubit extends BaseClass implements IQubit {
  y: number;
  size: number;
  qubitCells: IQubitCell[];

  constructor(size: number) {
    super();
    this.y = 0;
    this.size = size;
    const cols = Array.from(Array(size).keys());
    var tempQubitCells = [] as IQubitCell[];
    cols.map((col) => {
      tempQubitCells.push(new QubitCell(DIMENSIONS.GRID.WIDTH * col));
    });
    this.qubitCells = tempQubitCells;
  }
}

export class QubitCell extends BaseClass implements IQubitCell {
  x: number;

  constructor(x: number) {
    super();
    this.x = x;
  }
}

export class Modal extends BaseClass implements IModal {
  type: ModalType;
  state: ModalState;
  extras?: any;

  constructor(type: ModalType, state: ModalState, extras?: any) {
    super();
    this.type = type;
    this.state = state;
    this.extras = extras;
  }
}

export class BuildOutput extends BaseClass implements IBuildOutput {
  title: string;
  buildCircuitState: ICircuitState;
  buildOutputData: number[][];
  buildDuration: number;
  runIterationCount: number;
  createdDate?: Date;
  updatedDate?: Date;
  measurement?: number;

  constructor(
    title: string,
    buildOutputData: number[][],
    buildDuration: number,
    buildCircuitState: ICircuitState,
    runIterationCount: number
  ) {
    super();
    this.title = title;
    this.buildCircuitState = buildCircuitState;
    this.buildOutputData = buildOutputData;
    this.buildDuration = buildDuration;
    this.runIterationCount = runIterationCount;
  }
}
