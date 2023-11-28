import React, { useCallback, useContext, useState } from "react";
import styles from "./CircuitArrangement.module.scss";
import Grid from "./Grid/Grid";
import Canvas from "./Canvas/Canvas";
import ContextMenu from "./ContextMenu/ContextMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducers/rootReducer";
import { CursorContext } from "../../../Providers/CursorContextProvider";
import { v4 } from "uuid";
import { IGate } from "src/common/interfaces";
import GatePreview from "../../Gate/GatePreview/GatePreview";
interface CircuitArrangementProps {
  viewOnly: boolean;
}

const CircuitArrangement: React.FC<CircuitArrangementProps> = (props) => {
  const { viewOnly } = props;
  const { circuitState, gatePreview } = useSelector(
    (state: RootState) => state.circuitConfig
  );
  const { cursor, setCursor } = useContext(CursorContext);
  const [contextMenuList, setContextMenuList] = useState(
    [] as {
      id: string;
      x: number;
      y: number;
      show: boolean;
      selectedGates: IGate[];
    }[]
  );
  const dispatch = useDispatch();

  const handleCursorEntered = useCallback(() => {
    setCursor((cursorContextStates) => ({ attached: true }));
  }, []);

  const handleCursorLeft = useCallback(() => {
    setCursor((cursorContextStates) => ({ attached: true }));
  }, []);

  const handleContextMenu = (event: any) => {
    event.preventDefault();
    const id = v4();
    // useState will run at the end of this function
    setContextMenuList((prev) => [
      ...contextMenuList,
      {
        id: id,
        x: event.clientX,
        y: event.clientY,
        show: true,
        selectedGates: circuitState.selectedGates,
      },
    ]);

    // this will run before the above useState
    // so at this point, the contextMenuList will still only have the previous contextMenu
    if (contextMenuList.length > 0) {
      setContextMenuList((prev) =>
        prev.map((contextMenu) =>
          contextMenu.id !== id ? { ...contextMenu, show: false } : contextMenu
        )
      );

      setTimeout(() => {
        setContextMenuList((prev) =>
          prev.filter((contextMenu) => contextMenu.show === true)
        );
      }, 300);
    }
  };

  const handleClick = (event: any) => {
    setContextMenuList((prev) =>
      prev.map((contextMenu) => ({ ...contextMenu, show: false }))
    );

    setTimeout(() => {
      setContextMenuList([]);
    }, 300);
  };

  return (
    <div
      className={styles.circuitArrangement}
      onMouseEnter={handleCursorEntered}
      onMouseLeave={handleCursorLeft}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      <Canvas />
      <Grid viewOnly={viewOnly} circuitState={circuitState} />
      {contextMenuList.map((contextMenu) => (
        <ContextMenu
          key={contextMenu.id}
          x={contextMenu.x}
          y={contextMenu.y}
          show={contextMenu.show}
          selectedGates={contextMenu.selectedGates}
        />
      ))}
      {gatePreview.show && <GatePreview gate={gatePreview.gate} />}
    </div>
  );
};

export default CircuitArrangement;
