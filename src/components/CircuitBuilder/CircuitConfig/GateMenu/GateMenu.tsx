import React, { useEffect, useState } from "react";
import styles from "./GateMenu.module.scss";
import StandardGateMenu from "./StandardGateMenu/StandardGateMenu";
import CompoundGateMenu from "./CompoundGateMenu/CompoundGateMenu";

// To who ever is reading this, good luck. I'm sorry for what you are about to see.

const GateMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.gateMenu + " " + (open ? "" : styles.close)}>
      <div
        className={styles.openBtn}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span>Gate Menu</span>
      </div>
      <div className={styles.content}>
        <StandardGateMenu />
        <CompoundGateMenu />
      </div>
    </div>
  );
};

export default GateMenu;
