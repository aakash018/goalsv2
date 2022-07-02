import React, { useEffect, useState } from "react";
import { useClient } from "urql";
import { setToken } from "../utils/localTokenOP";
import Router from "next/router";
import { refreshAuthToken } from "../utils/refreshAuthToken";
import { HelloQuery, useLogoutMutation } from "../generated/graphql";

import styles from "../styles/pages/dash.module.scss";
import { generateRandom } from "../utils/randomNum";

type Fuck = {
  cordT: number;
  cordL: number;
};

const Dash: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [fucks, setFucks] = useState<Fuck[]>([]);

  const [{}, logout] = useLogoutMutation();

  useEffect(() => {
    const abortControllerIntervalRefres = new AbortController();
    const req = async () => {
      const token = await refreshAuthToken(abortControllerIntervalRefres);

      if (token) {
        setToken(token);
        setLoading(false);
      } else {
        Router.push("/");
      }
    };
    req();

    return () => abortControllerIntervalRefres.abort();
  }, []);

  useEffect(() => {
    const abortControllerIntervalRefresh = new AbortController();

    const tokenRefresh = setInterval(async () => {
      try {
        const token = await refreshAuthToken(abortControllerIntervalRefresh);

        if (token) {
          setToken(token);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        Router.push("/");
      }
    }, 13 * 1000 * 60);

    return () => {
      abortControllerIntervalRefresh.abort();
      clearInterval(tokenRefresh);
    };
  }, []);

  const client = useClient();

  const handleCUNT = () => {
    setFucks((prev) =>
      prev.concat({
        cordT: generateRandom(0, 500),
        cordL: generateRandom(0, 1000),
      })
    );

    client
      .query<HelloQuery>(
        `query Hello {
          hello
        }`,
        {},
        { requestPolicy: "network-only" }
      )
      .toPromise()
      .then((result) => console.log(result));

    // refreshAuthToken();
  };

  const handleLogout = async () => {
    const resp = await logout();
    if (resp.data?.logout.ok) {
      setToken("");
      Router.push("/");
    }
  };

  if (loading) return <h1>Loading</h1>;

  return (
    <div>
      <h2>DASH</h2>
      <button onClick={handleCUNT}>SHIT</button>
      <button onClick={handleLogout}>Logout</button>

      <div className={styles.fuckHouse}>
        {fucks.map((fuck, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: fuck.cordT,
              left: fuck.cordL,
              fontSize: 80,
            }}
          >
            FUCK
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dash;
