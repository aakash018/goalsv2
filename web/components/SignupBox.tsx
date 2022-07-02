import React, { FormEvent, useRef } from "react";
import { useSignupMutation } from "../generated/graphql";
import IntputField from "./shared/IntputField";
import styles from "../styles/pages/signup.module.scss";
import Btn from "./shared/Btn";
import Header from "./Header";

import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Link from "next/link";

const SignupBox: React.FC = () => {
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const cpassword = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);

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
    <>
      <Header />
      <div className={styles.signupWrapper}>
        <div className={styles.signup}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formAndBtn}>
              <div className={styles.fildes}>
                <div>
                  <IntputField
                    label="Firstname"
                    input={firstname}
                    id="signupFirstname"
                  />
                  <IntputField
                    label="Lastname"
                    input={lastname}
                    id="signupLastname"
                  />
                </div>
                <div>
                  <IntputField
                    label="Username"
                    input={username}
                    id="signupUsername"
                  />
                  <IntputField label="Email" input={email} id="signupEmail" />
                </div>
                <div>
                  <IntputField
                    label="Password"
                    input={password}
                    id="signupPassword"
                  />
                  <IntputField
                    label="Confirm Password"
                    input={cpassword}
                    id="signupCPassword"
                  />
                </div>
              </div>
              <div className={styles.buttons}>
                <Btn type="submit" disabled={false}>
                  Signup
                </Btn>
                <Link href={"/"}>
                  <BsFillArrowLeftCircleFill
                    fontSize={"2.7rem"}
                    cursor="pointer"
                  />
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupBox;
