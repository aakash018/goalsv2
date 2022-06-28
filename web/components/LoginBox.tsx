import Router from "next/router";
import React, { FormEvent, useRef } from "react";
import { useLoginMutation } from "../generated/graphql";
import { setToken } from "../utils/localTokenOP";
import IntputField from "./shared/IntputField";

const LoginBox: React.FC = () => {
  const username = useRef<HTMLInputElement>(null);

  const password = useRef<HTMLInputElement>(null);

  const [{}, login] = useLoginMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      username.current?.value.trim() !== "" ||
      password.current?.value.trim() !== ""
    ) {
      try {
        const resp = await login({
          loginOptions: {
            username: username.current!.value,
            password: password.current!.value,
          },
        });

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
    <div>
      <form onSubmit={handleSubmit}>
        <IntputField label="Username" input={username} />
        <IntputField
          label="Password"
          input={password}
          type="password"
        ></IntputField>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginBox;
