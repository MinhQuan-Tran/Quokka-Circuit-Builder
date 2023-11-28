import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
interface ISelectionBoxContext {}

export type SelectionBoxState = {
  mouseStartPosition: { x: number; y: number };
  dimension: { width: number; height: number };
  offset: { left: number; top: number };
  isDrawing: boolean;
};

type SelectionBoxValue = {
  selectionBox: SelectionBoxState;
  setSelectionBox: Dispatch<SetStateAction<SelectionBoxState>>;
};

export const defaultSelectionBoxValue: SelectionBoxValue = {
  selectionBox: {
    mouseStartPosition: { x: 0, y: 0 },
    dimension: { width: 0, height: 0 },
    offset: { left: 0, top: 0 },
    isDrawing: false,
  },
  setSelectionBox: (selectionBox: ISelectionBoxContext) => {},
};

export const CompoundGateSelectionContext = createContext(
  defaultSelectionBoxValue
);

interface CompoundGateSelectionContextProviderProps {}
export const CompoundGateSelectionContextProvider: React.FC<
  CompoundGateSelectionContextProviderProps
> = (props) => {
  const { children } = props;
  const [selectionBox, setSelectionBox] = useState(
    defaultSelectionBoxValue.selectionBox
  );

  const context = { selectionBox, setSelectionBox };
  return (
    <CompoundGateSelectionContext.Provider value={context}>
      {children}
    </CompoundGateSelectionContext.Provider>
  );
};
export default CompoundGateSelectionContextProvider;
