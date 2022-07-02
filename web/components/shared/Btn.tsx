import React from "react";
import styles from "../../styles/shared/Btn.module.scss";

interface Props {
  children: React.ReactNode;
  disabled: boolean;
  type: "button" | "submit" | "reset";
}

const Btn: React.FC<Props> = ({ children, type, disabled, ...props }) => {
  return (
    <>
      <button
        type={type}
        {...props}
        className={styles.prmBtn}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

export default Btn;
