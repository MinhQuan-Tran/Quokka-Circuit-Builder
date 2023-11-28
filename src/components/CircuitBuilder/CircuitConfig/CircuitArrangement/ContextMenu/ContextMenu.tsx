import React from "react";
import styles from "./ContextMenu.module.scss";
import { IGate } from "src/common/interfaces";
import { removeDroppedGates } from "src/redux/actions/circuitConfigAction";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "src/redux/actions/modalsAction";
import { Modal } from "src/common/classes";
import { RootState } from "src/redux/reducers/rootReducer";

interface ContextMenuProps {
  x: number;
  y: number;
  show: boolean;
  selectedGates: IGate[];
}

const ContextMenu: React.FC<ContextMenuProps> = (props) => {
  const { x, y, show, selectedGates } = props;
  const { circuitState } = useSelector(
    (state: RootState) => state.circuitConfig
  );
  const dispatch = useDispatch();

  const handleCreateComponentGate = () => {
    console.log("Component Gate from Context Menu");
    dispatch(
      openModal(new Modal("SaveCompoundGateModal", "SaveCompoundGateEntry"))
    );
  };

  const handleRename = () => {
    console.log("Gate rename from Context Menu");
    dispatch(
      openModal(new Modal("SaveCompoundGateModal", "EditCompoundGateName"))
    );
  };

  const handleDelete = () => {
    console.log("Gate delete from Context Menu");
    dispatch(removeDroppedGates(selectedGates, circuitState.qubits));
  };

  return (
    <div
      className={styles.contextMenu + (show ? " " + styles.show : "")}
      style={{ top: y + "px", left: x + "px" }}
    >
      <button
        className={styles.contextMenu__item}
        onClick={handleCreateComponentGate}
        disabled={selectedGates.length <= 1}
      >
        Create Component Gate
      </button>
      <button
        className={styles.contextMenu__item}
        onClick={handleRename}
        disabled={
          selectedGates.length !== 1 ||
          selectedGates[0].type !== "Compound Gate"
        }
      >
        Rename
      </button>
      <button
        className={styles.contextMenu__item}
        onClick={handleDelete}
        disabled={selectedGates.length <= 0}
      >
        Delete
      </button>
    </div>
  );
};

export default ContextMenu;
