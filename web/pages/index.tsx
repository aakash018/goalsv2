import { useEffect, useState } from "react";
import LoginBox from "../components/LoginBox";

import styles from "../styles/Home.module.scss";
import { setToken } from "../utils/localTokenOP";
import Router from "next/router";

interface AuthTokenFetchProps {
  ok: boolean;
  authToken: string;
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortContorler = new AbortController();

    fetch("http://localhost:5000/refresh_token", {
      method: "POST",
      credentials: "include",
      signal: abortContorler.signal,
    })
      .then((responde) => responde.json())
      .then((data: AuthTokenFetchProps) => {
        console.log(data);
        if (data.ok) {
          setToken(data.authToken);
          Router.push("/dash");
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.log(err);
      });

    return () => abortContorler.abort();
  }, []);

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
