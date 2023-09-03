import Modal from "../UI/Modal";
import FormRow from "./FormRow";
import Spinner from "../UI/Spinner";
import { useState } from "react";
import useInput from "../../hooks/useInput";
const SignUp = (props) => {
  const [show, setShow] = useState(false);

  const [enteredFullName, nameInputHandler, resetNameState] = useInput();
  const [enteredEmail, emailInputHandler, resetEmailState] = useInput();
  const [enteredPassword, passwordInputHandler, resetPasswordState] = useInput();
  const [
    enteredConfirmPassword,
    confirmPasswordInputHandler,
    resetConfirmPasswordState,
  ] = useInput();

  const signUpHandler = (event) => {
    setShow(true);
    event.preventDefault();
    console.log(enteredFullName, enteredEmail);
    resetNameState();
    resetEmailState();
    resetPasswordState();
    resetConfirmPasswordState();
  };

  return (
    <Modal setShow={props.setShow}>
      <form onSubmit={signUpHandler}>
        <FormRow
          label="full name"
          input={{
            type: "text",
            name: "full name",
            placeholder: "John Miller",
            id: "fullName",
            value: enteredFullName,
          }}
          onChange={nameInputHandler}
        />
        <FormRow
          label="email"
          input={{
            type: "email",
            name: "email",
            placeholder: "example@gmail.com",
            id: "email",
            value: enteredEmail,
          }}
          onChange={emailInputHandler}
        />
        <FormRow
          label="password"
          input={{
            type: "password",
            name: "password",
            id: "password",
            value: enteredPassword,
          }}
          onChange={passwordInputHandler}
        />
        <FormRow
          label="confirm password"
          input={{
            type: "password",
            name: "confirm password",
            id: "confirmpassword",
            value: enteredConfirmPassword,
          }}
          onChange={confirmPasswordInputHandler}
        />
        <button className="text-xl mb-4 mt-3 bg-cyan-900 text-white px-4 py-2 w-full rounded-md capitalize tracking-wide">
          {show ? <Spinner classes="w-8 h-8" /> : "register"}
        </button>
      </form>
    </Modal>
  );
};

export default SignUp;
