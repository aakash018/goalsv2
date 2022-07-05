import React, { FormEvent, useRef, useState } from "react";
import { useSignupMutation } from "../generated/graphql";
import IntputField from "./shared/IntputField";
import styles from "../styles/pages/signup.module.scss";
import Btn from "./shared/Btn";
import Header from "./Header";

import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Link from "next/link";
import AlertBox from "./shared/AlertBox";

const SignupBox: React.FC = () => {
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const cpassword = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);

  const [{}, signup] = useSignupMutation();

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [cpasswordError, setCpasswordError] = useState(false);

  const [error, setError] = useState({
    display: false,
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (username.current!.value.trim() === "") {
      setError({
        display: true,
        message: "empty fields",
      });
      setUsernameError(true);
    }
    if (lastname.current!.value.trim() === "") {
      setError({
        display: true,
        message: "empty fields",
      });
      setLastNameError(true);
    }
    if (firstname.current!.value.trim() === "") {
      setError({
        display: true,
        message: "empty fields",
      });
      setFirstNameError(true);
    }
    if (password.current!.value.trim() === "") {
      setError({
        display: true,
        message: "empty fields",
      });
      setPasswordError(true);
    }
    if (email.current!.value.trim() === "") {
      setError({
        display: true,
        message: "empty fields",
      });
      setEmailError(true);
    }
    if (cpassword.current!.value.trim() === "") {
      setError({
        display: true,
        message: "empty fields",
      });
      setCpasswordError(true);
    }

    if (password.current?.value !== cpassword.current?.value) {
      setError({
        display: true,
        message: "comfirm password didn't match",
      });
      setCpasswordError(true);
      return;
    }

    if (
      firstname.current!.value.trim() !== "" &&
      lastname.current!.value.trim() !== "" &&
      username.current!.value.trim() !== "" &&
      password.current!.value.trim() !== "" &&
      email.current!.value.trim() !== ""
    ) {
      try {
        const resp = await signup({
          options: {
            firstName: firstname.current!.value,
            lastName: lastname.current!.value,
            username: username.current!.value,
            pasword: password.current!.value,
          },
        });

        if (resp.data?.signup.error) {
          setError({
            display: true,
            message: resp.data?.signup.error.message,
          });
          return;
        }

        console.log(resp.data?.signup);
      } catch (err) {
        setError({
          display: true,
          message: "error!! try again !!!",
        });

        console.log(err);
      }
    }
  };

  return (
    <>
      <Header />
      <div className={styles.signupWrapper}>
        <div className={styles.signup}>
          {error.display && (
            <div className={styles.errorContainer}>
              <AlertBox type="error">{error.message}</AlertBox>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className={styles.formAndBtn}>
              <div className={styles.fildes}>
                <div>
                  <IntputField
                    label="Firstname"
                    input={firstname}
                    id="signupFirstname"
                    className={firstNameError ? "errorShake" : ""}
                  />
                  <IntputField
                    label="Lastname"
                    input={lastname}
                    id="signupLastname"
                    className={lastNameError ? "errorShake" : ""}
                  />
                </div>
                <div>
                  <IntputField
                    label="Username"
                    input={username}
                    id="signupUsername"
                    className={usernameError ? "errorShake" : ""}
                  />
                  <IntputField
                    label="Email"
                    input={email}
                    id="signupEmail"
                    className={emailError ? "errorShake" : ""}
                  />
                </div>
                <div>
                  <IntputField
                    label="Password"
                    input={password}
                    id="signupPassword"
                    className={passwordError ? "errorShake" : ""}
                    type="password"
                  />
                  <IntputField
                    label="Confirm Password"
                    input={cpassword}
                    id="signupCPassword"
                    className={cpasswordError ? "errorShake" : ""}
                    type="password"
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
