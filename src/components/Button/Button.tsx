import React from "react";
import styles from "./Button.module.scss";
import { ButtonTypes } from "../../common/types";
interface ButtonProps {
  name: string;
  types: ButtonTypes[];
  onClick: any;
  selected?: boolean;
  leftImageSource?: any;
  rightImageSource?: any;
  svgSource?: any;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    types,
    selected,
    onClick,
    name,
    leftImageSource,
    rightImageSource,
    svgSource,
  } = props;
  const buttonStyle = [styles.button];

  types.forEach((type: ButtonTypes) => {
    buttonStyle.push(styles[type]);
  });

  if (selected) {
    buttonStyle.push(styles["selected"]);
  }

  return (
    <div className={styles.button}>
      <button className={buttonStyle.join(" ")} onClick={onClick}>
        {leftImageSource ? (
          <img className={styles.leftImage} src={leftImageSource} />
        ) : null}
        {svgSource ? svgSource : null}
        <div className={styles.btnLbl}>{name}</div>
        {rightImageSource ? (
          <img className={styles.rightImage} src={rightImageSource} />
        ) : null}
      </button>
    </div>
  );
};
