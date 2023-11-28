import React, { useRef } from "react";
import styles from "./Modal.module.scss";
import { ModalState, ModalType } from "../../../common/types";
import close_modal_icon from "../../../assets/close_modal_icon.svg";
import ConnectionModal from "./ConnectionModal";
import RunCircuitModal from "./RunCircuitModal";
import EditGateInputModal from "./EditGateInputModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import SaveCircuitModal from "./SaveCircuitModal";
import SaveCompoundGateModal from "./SaveCompoundGateModal";
import { closeModal } from "../../../redux/actions/modalsAction";
import { useDispatch } from "react-redux";
import StackLayout from "../../StackLayout/StackLayout";
import { Button } from "../../Button/Button";

export interface ModalProps {
  id: string;
  type: ModalType;
  state: ModalState;
  extras?: any;
}

export const Modal: React.FC<ModalProps> = (children) => {
  const { id, type, state, extras } = children;
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const renderModal = (id: string, type: ModalType, state: ModalState) => {
    switch (type) {
      case "ConnectionModal":
        return <ConnectionModal id={id} type={type} state={state} />;
      case "RunCircuitModal":
        return <RunCircuitModal id={id} type={type} state={state} />;
      case "EditGateInputModal":
        return (
          <EditGateInputModal
            id={id}
            type={type}
            state={state}
            extras={extras}
          />
        );
      case "LoginModal":
        return (
          <>
            <h1> Login Modal </h1>
          </>
        );
      case "ForgotPasswordModal":
        return <ForgotPasswordModal id={id} type={type} state={state} />;
      case "SaveCircuitModal":
        return <SaveCircuitModal id={id} type={type} state={state} />;
      case "SaveCompoundGateModal":
        return <SaveCompoundGateModal id={id} type={type} state={state} />;
      case "WarningDeviceIncompatibleModal":
        return (
          <StackLayout orientation="vertical">
            <h2>Warning Device Incompatible!</h2>
            <p>
              {" "}
              Quokka is designed exclusively for laptop or desktop use. We have
              detected that you are accessing on a device which is incompatible
              with the minimum screen requirements (13”) and where you will be
              unable to interact with the interface to it’s full potential.
              <br />
              Please visit these pages on a desktop or laptop to continue.
            </p>
            <StackLayout orientation="horizontal">
              <Button
                types={["standardBtn"]}
                name="Ok"
                onClick={async () => dispatch(closeModal(id))}
              >
                Ok
              </Button>
            </StackLayout>
          </StackLayout>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div ref={modalRef} className={styles.modal}>
      <div className={styles.content}>
        <img
          className={styles.closeModalIcon}
          src={close_modal_icon}
          onClick={() => {
            dispatch(closeModal(id));
          }}
          alt="closeModalIcon"
        />
        {renderModal(id, type, state)}
      </div>
    </div>
  );
};
