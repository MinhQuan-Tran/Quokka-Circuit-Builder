import React, { useState } from "react";
import { ModalProps } from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addCompoundGateDropdown,
  addDroppedGate,
  removeDroppedGates,
  updateCircuitConfigMode,
  updateSelectedGates,
} from "../../../redux/actions/circuitConfigAction";
import { closeModal } from "../../../redux/actions/modalsAction";
import { ModalState } from "../../../common/types";
import { Button } from "../../Button/Button";
import { RootState } from "../../../redux/reducers/rootReducer";
import StackLayout from "../../StackLayout/StackLayout";
import Input from "../../Input/Input";
import { renderCompoundGate } from "../../../utils/gate-renderer";

const SaveCompoundGateModal: React.FC<ModalProps> = (props) => {
  const dispatch = useDispatch();
  const [gateName, setGateName] = useState("");
  const { selectedGates, qubits } = useSelector(
    (state: RootState) => state.circuitConfig.circuitState
  );
  //   const { selectionBox, setSelectionBox } = useContext(
  //     CompoundGateSelectionContext
  //   );

  const handleKeyDown_SaveCompoundGateEntry = async (event: any) => {
    if (event.key === "Enter") {
      await handleSaveButtonClicked_SaveCompoundGateEntry();
    }
  };

  const handleKeyDown_EditCompoundGateName = async (event: any) => {
    if (event.key === "Enter") {
      await handleSaveButtonClicked_EditCompoundGateName();
    }
  };

  const handleInputChanged = (event: any) => {
    setGateName(event.target.value);
  };

  const handleSaveButtonClicked_SaveCompoundGateEntry = async () => {
    if (selectedGates.length <= 1) return;

    const newCompoundGate = renderCompoundGate(selectedGates, gateName);
    dispatch(addDroppedGate(newCompoundGate));

    dispatch(removeDroppedGates(selectedGates, qubits));

    // setSelectionBox(
    //   (selectionBoxState) => defaultSelectionBoxValue.selectionBox
    // );

    dispatch(addCompoundGateDropdown(newCompoundGate));
    dispatch(updateCircuitConfigMode("NoSelectionMode"));
    dispatch(updateSelectedGates([]));
    dispatch(closeModal(props.id));
  };

  const handleSaveButtonClicked_EditCompoundGateName = async () => {
    if (selectedGates.length !== 1) return;

    selectedGates[0].name = gateName;
    dispatch(updateCircuitConfigMode("NoSelectionMode"));
    dispatch(closeModal(props.id));
  };

  const handleBackButtonClicked = async () => {
    dispatch(closeModal(props.id));
  };

  const renderState = (state: ModalState) => {
    switch (state) {
      case "SaveCompoundGateEntry":
        return (
          <StackLayout orientation="vertical">
            <h1>Save Compound Gate Name</h1>
            <Input
              styleTypes={["default"]}
              type="text"
              onChange={handleInputChanged}
              onKeyDown={handleKeyDown_SaveCompoundGateEntry}
              placeholder="Name"
            />

            <StackLayout orientation="horizontal">
              <Button
                name="Back"
                types={["standardBtn"]}
                onClick={async () => handleBackButtonClicked()}
              ></Button>
              <Button
                name="Save"
                types={["standardBtn"]}
                onClick={async () =>
                  handleSaveButtonClicked_SaveCompoundGateEntry()
                }
              ></Button>
            </StackLayout>
          </StackLayout>
        );
      case "EditCompoundGateName":
        return (
          <StackLayout orientation="vertical">
            <h1>Edit Compound Gate Name</h1>
            <Input
              styleTypes={["default"]}
              type="text"
              onChange={handleInputChanged}
              onKeyDown={handleKeyDown_EditCompoundGateName}
              placeholder="Name"
            />

            <StackLayout orientation="horizontal">
              <Button
                name="Back"
                types={["standardBtn"]}
                onClick={async () => handleBackButtonClicked()}
              ></Button>
              <Button
                name="Save"
                types={["standardBtn"]}
                onClick={async () =>
                  handleSaveButtonClicked_EditCompoundGateName()
                }
              ></Button>
            </StackLayout>
          </StackLayout>
        );
      default:
        return (
          <div>
            <h1>Error Opening Modal</h1>
          </div>
        );
    }
  };

  return <div>{renderState(props.state)}</div>;
};

export default SaveCompoundGateModal;
