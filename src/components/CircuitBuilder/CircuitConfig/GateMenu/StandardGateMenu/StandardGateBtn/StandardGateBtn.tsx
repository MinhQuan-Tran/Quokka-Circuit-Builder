import React, { useEffect, useRef, useState } from "react";
import styles from "./StandardGateBtn.module.scss";
import { Button } from "src/components/Button/Button";

interface StandardGateBtnProps {
  gateName: string;
  gateImage: string;
  gateDescription: string;
  selected: boolean;
  onClick: () => void;
}

const StandardGateBtn: React.FC<StandardGateBtnProps> = (props) => {
  const { gateName, gateImage, gateDescription, selected, onClick } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const tooltipWidth = 235;

  useEffect(() => {
    // hide it when component is mounted
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setX(rect.left);
      setY(rect.top);
    }
  }, []);

  var upddatePosition: any;

  const startUpdatePosition = () => {
    upddatePosition = setInterval(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setX(rect.left - tooltipWidth - 5);
        setY(rect.top);
      }
    }, 33);
    // 30 fps
  };

  const stopUpdatePosition = () => {
    clearInterval(upddatePosition);
  };

  return (
    <div
      className={styles.gate}
      ref={ref}
      onMouseOver={startUpdatePosition}
      onMouseLeave={stopUpdatePosition}
    >
      <Button
        types={["gateBtn"]}
        selected={selected}
        name=""
        leftImageSource={gateImage}
        onClick={onClick}
      />
      <div
        className={styles.tooltip}
        style={{
          top: y + "px",
          left: x + "px",
          width: tooltipWidth + "px",
        }}
      >
        <span className={styles.title}>{gateName}</span>
        <span>{gateDescription}</span>
      </div>
    </div>
  );
};

export default StandardGateBtn;
