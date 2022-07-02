import Router from "next/router";
import React, { FormEvent, useRef, useState } from "react";
import { useLoginMutation } from "../generated/graphql";
import { setToken } from "../utils/localTokenOP";
import IntputField from "./shared/IntputField";

import styles from "../styles/components/LoginBox.module.scss";
import Btn from "./shared/Btn";
import AlertBox from "./shared/AlertBox";

const LoginBox: React.FC = () => {
  const username = useRef<HTMLInputElement>(null);

  const password = useRef<HTMLInputElement>(null);

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState({
    display: false,
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [{}, login] = useLoginMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (username.current?.value.trim() === "") {
      setUsernameError(true);
      return setError({
        display: true,
        message: "empty username or password",
      });
    }

    if (password.current?.value.trim() === "") {
      setPasswordError(true);
      return setError({
        display: true,
        message: "empty username or password",
      });
    }

    if (
      username.current?.value.trim() !== "" ||
      password.current?.value.trim() !== ""
    ) {
      setUsernameError(false);
      setPasswordError(false);

      setError({
        display: false,
        message: "",
      });

      setLoading(true);
      try {
        const resp = await login({
          loginOptions: {
            username: username.current!.value,
            password: password.current!.value,
          },
        });

        //? Handle login error

        if (resp.data?.login.error) {
          if (resp.data.login.error.field === "username") {
            setUsernameError(true);
          } else if (resp.data.login.error.field === "password") {
            setPasswordError(true);
          }

          setLoading(false);
          return setError({
            display: true,
            message: resp.data.login.error.message,
          });
        }

        if (resp.data?.login.token) {
          setToken(resp.data?.login.token);
          Router.push("/dash");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className={`${styles.loginBox} highlight`}>
      {error.display && <AlertBox type="error">{error.message}</AlertBox>}

      <form onSubmit={handleSubmit}>
        <div>
          <IntputField
            label="username"
            input={username}
            id={styles.username}
            className={`${usernameError ? styles.error : ""}`}
          />
          <IntputField
            label="password"
            input={password}
            type="password"
            id={styles.password}
            className={` ${passwordError ? styles.error : ""}`}
          ></IntputField>
        </div>
        <div>
          <Btn type="submit" disabled={loading}>
            {!loading ? "login" : "loading"}
          </Btn>
        </div>
      </form>
    </div>
  );
};

export default LoginBox;
