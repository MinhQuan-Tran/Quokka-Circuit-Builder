import React, { useContext } from "react";
import styles from "./CursorAttachment.module.scss";
import { CursorContext } from "../../Providers/CursorContextProvider";
import useMousePosition from "../../hooks/useMousePosition";

interface CursorAttachmentProps {
  height: number;
  width: number;
}

const CursorAttachment: React.FC<CursorAttachmentProps> = (props) => {
  const { width, height } = props;
  // const { clientX, clientY } = useMousePosition();

  return (
    <svg
      width={width}
      height={height}
      className={styles.cursorAttachment}
      // style={{
      //   left: clientX,
      //   top: clientY,
      //   // TODO: extra check on clientX needed here
      // }}
    >
      {props.children}
    </svg>
  );
};

export default CursorAttachment;
