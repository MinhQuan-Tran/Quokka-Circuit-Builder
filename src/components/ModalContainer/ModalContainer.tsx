import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import styles from "./ModalContainer.module.scss";
import { Modal } from "./Modal/Modal";

const ModalContainer: React.FC = () => {
  const { modals } = useSelector((state: RootState) => state.modals);

  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
      {modals.map((modal, index) => {
        return (
          <Modal
            key={modal.id}
            id={modal.id}
            type={modal.type}
            state={modal.state}
            extras={modal.extras}
          />
        );
      })}
    </div>,
    document.querySelector("#modal") as Element
  );
};

export default ModalContainer;
