import React, { useEffect, useState } from "react";
import { useClient } from "urql";
import { getToken, setToken } from "../utils/localTokenOP";
import Router from "next/router";
import { refreshAuthToken } from "../utils/refreshAuthToken";
import { HelloQuery } from "../generated/graphql";

const Dash: React.FC = () => {
  const [loading, setLoading] = useState(true);

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

  if (loading) return <h1>Loading</h1>;

  return (
    <div>
      <h2>DASH</h2>
      <button onClick={handleCUNT}>CUNT</button>
    </div>
  );
};

export default Dash;
