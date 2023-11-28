import React, { useContext, useEffect, useState } from "react";
import useMousePosition from "../hooks/useMousePosition";
import styles from "./Cursor.module.scss";
import { CursorContext } from "../Providers/CursorContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import { updateDefaultStandardGate } from "src/redux/actions/circuitConfigAction";
import CursorAttachment from "./CursorAttachment/CursorAttachment";
import Gate from "../CircuitBuilder/Gate/Gate";
import { DIMENSIONS } from "../../common/constants";

const Cursor: React.FC = () => {
  const { clientX, clientY } = useMousePosition();
  const { cursor, setCursor } = useContext(CursorContext);
  const { selectedGate, circuitConfigMode, selectedCompoundGate, editingGate } =
    useSelector((state: RootState) => state.circuitConfig);
  const dispatch = useDispatch();

  const [attachmentWidth, setAttachmentWidth] = useState(0);
  const [attachmentHeight, setAttachmentHeight] = useState(0);

  useEffect(() => {
    if (
      circuitConfigMode === "GateSelectionMode" ||
      circuitConfigMode === "CompoundGateSelectionMode" ||
      circuitConfigMode === "GateEditingMode"
    ) {
      setCursor({ attached: true });
      if (circuitConfigMode === "GateEditingMode") {
        setAttachmentWidth(
          editingGate.type === "Compound Gate"
            ? editingGate.width
            : DIMENSIONS.STD_GATE.WIDTH
        );
        setAttachmentHeight(
          editingGate.type === "Compound Gate"
            ? editingGate.height
            : DIMENSIONS.STD_GATE.HEIGHT
        );
      } else {
        setAttachmentWidth(
          selectedGate === "Compound Gate"
            ? selectedCompoundGate.width
            : DIMENSIONS.STD_GATE.WIDTH
        );
        setAttachmentHeight(
          selectedGate === "Compound Gate"
            ? selectedCompoundGate.height
            : DIMENSIONS.STD_GATE.HEIGHT
        );
      }
    } else {
      setCursor({ attached: false });
      dispatch(updateDefaultStandardGate());
    }
  }, [selectedCompoundGate, selectedGate, circuitConfigMode]);

  return (
    <div className={styles.cursor} style={{ top: clientY, left: clientX }}>
      {cursor.attached ? (
        <CursorAttachment width={attachmentWidth} height={attachmentHeight}>
          <Gate
            id=""
            x={0}
            y={0}
            width={attachmentWidth}
            height={attachmentHeight}
            type={
              circuitConfigMode === "GateEditingMode"
                ? editingGate.type
                : selectedGate === "Compound Gate"
                ? selectedCompoundGate.type
                : selectedGate
            }
            rotAngle="pi/2"
            isAttachment={true}
            name={
              circuitConfigMode === "GateEditingMode"
                ? editingGate.name
                : selectedGate === "Compound Gate"
                ? selectedCompoundGate.name
                : selectedGate
            }
          />
        </CursorAttachment>
      ) : null}
    </div>
  );
};

export default Cursor;
