import React from "react";
import styles from "./Toolbar.module.scss";
import DropdownButton from "../../DropdownButton/DropdownButton";
import arrow_down from "../../../assets/arrow_down.svg";
import { Dropdown } from "../../Dropdown/Dropdown";
import DropdownList from "../../Dropdown/DropdownList/DropdownList";
import { openModal } from "../../../redux/actions/modalsAction";
import { Modal } from "../../../common/classes";
import { useDispatch } from "react-redux";
import { updateCircuitConfigMode } from "../../../redux/actions/circuitConfigAction";
const LoadFilesToolbar: React.FC = () => {
  const dispatch = useDispatch();
  const handleDropdownItemClicked = (dropdownItem: string) => {
    switch (dropdownItem) {
      case "New":
        dispatch(updateCircuitConfigMode("NoSelectionMode"));
        break;

      case "Load":
        break;

      case "Save":
        dispatch(
          openModal(new Modal("SaveCircuitModal", "SaveCircuitNameEntry"))
        );
        break;

      default:
    }
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.fileManager}>
        <h3>Q</h3>
        <DropdownButton
          name={""}
          buttonTypes={["imageBtn"]}
          imageButtonDropdownSource={arrow_down}
        >
          <Dropdown>
            <DropdownList
              list={["New", "Load", "Save", "Save as"]}
              onDropdownItemClicked={handleDropdownItemClicked}
            />
          </Dropdown>
        </DropdownButton>
        <h3>Load</h3>
      </div>
    </div>
  );
};

export default LoadFilesToolbar;
