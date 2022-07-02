import React from "react";
import styles from "../../styles/shared/AlertBox.module.scss";

interface Props {
  children: React.ReactNode;
  type: "message" | "error";
}

const AlertBox: React.FC<Props> = ({ children, type }) => {
  return (
    <div
      className={`${styles.alertBox}  ${
        type === "message" ? styles.alertMessage : styles.alertError
      }`}
    >
      {children}
    </div>
  );
};

export default AlertBox;
