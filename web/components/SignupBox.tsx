import React, { FormEvent, useRef } from "react";
import { useSignupMutation } from "../generated/graphql";
import IntputField from "./shared/IntputField";

const SignupBox: React.FC = () => {
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const cpassword = useRef<HTMLInputElement>(null);

  const [{}, signup] = useSignupMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const resp = await signup({
      options: {
        firstName: firstname.current!.value,
        lastName: lastname.current!.value,
        username: username.current!.value,
        pasword: password.current!.value,
      },
    });

    console.log(resp.data?.signup);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <IntputField label="Firstname" input={firstname} />
        <IntputField label="Lastname" input={lastname} />
        <IntputField label="Username" input={username} />
        <IntputField label="Password" input={password} />
        <IntputField label="Confirm Password" input={cpassword} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupBox;
