import React from "react";
import Image from "next/image";

import styles from "../styles/shared/Header.module.scss";

const Header: React.FC = () => {
  return (
    <>
      <header className={styles.loginHeader}>
        <nav>
          <Image
            src={"/img/icon.png"}
            alt="icon"
            width={"50px"}
            height="50px"
            className={styles.icon}
          />
          <span className={`${styles.text} highlight`}>GOALS</span>
        </nav>
      </header>
    </>
  );
};

export default Header;
