import React from "react";
import NewCircuitToolbar from "./NewCircuitToolbar";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers/rootReducer";
import { CircuitConfigMode } from "../../../common/types";
import CompoundGateCreationToolbar from "./CompoundGateCreationToolbar";
import LoadFilesToolbar from "./LoadFilesToolbar";

const Toolbar: React.FC = () => {
  const { circuitConfigMode } = useSelector(
    (state: RootState) => state.circuitConfig
  );
  const renderToolbar = (mode: CircuitConfigMode) => {
    switch (mode) {
      case "GateSelectionMode":
      case "CompoundGateSelectionMode":
      case "NoSelectionMode":
      case "GateEditingMode":
        return <NewCircuitToolbar />;
      case "CompoundGateCreationMode":
        return <CompoundGateCreationToolbar />;
      case "LoadFilesMode":
        return <LoadFilesToolbar />;
    }
  };

  return renderToolbar(circuitConfigMode);
};

export default Toolbar;
