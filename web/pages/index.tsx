import { useEffect, useState } from "react";
import LoginBox from "../components/LoginBox";

import { setToken } from "../utils/localTokenOP";
import Router from "next/router";
import Image from "next/image";
import styles from "../styles/pages/index.module.scss";
import Header from "../components/Header";
import Head from "next/head";

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
    <>
      <Head>
        <title>Goals || Login</title>
      </Head>
      <Header />
      <div className={styles.home}>
        <div className={styles.hero}>
          <div className={styles.heroImg}>
            <Image
              src={"/img/goals.jpg"}
              layout="fill"
              className={styles.img}
              priority={true}
            />
          </div>
        </div>
        <div className={styles.login}>
          <LoginBox />
        </div>
      </div>
    </>
  );
};

export default Home;
