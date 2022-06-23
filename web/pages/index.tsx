import { useState } from "react";
import LoginBox from "../components/LoginBox";

import styles from "../styles/Home.module.scss";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <>
        <h1>LOADING!!!</h1>
      </>
    );
  }

  return (
    <div className={styles.home}>
      <LoginBox />
    </div>
  );
};

export default Home;
