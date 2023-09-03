import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import FormRow from "./FormRow";
import AuthContext from "../../store/authContext";
import Spinner from "../UI/Spinner";
import useInput from "../../hooks/useInput";
const Login = (props) => {
  const ctx = useContext(AuthContext);
  console.log(ctx)
  const [enteredEmail, emailInputHandler, resetEmailState] = useInput();
  const [enteredPassword, passwordInputHandler, resetPasswordState] = useInput()
  const [show, setShow] = useState(false);
  const onSubmitHandler = (event) => {
    setShow(true);
    event.preventDefault();
    console.log(enteredEmail, enteredPassword);
    resetEmailState()
    resetPasswordState()
  };
  return (
    <Modal setShow={props.setShow}>
      <form onSubmit={onSubmitHandler}>
        <FormRow
          label="email"
          input={{
            id: "email",
            type: "email",
            name: "email",
            placeholder: "example@gmail.com",
            value: enteredEmail,
          }}
          onChange={emailInputHandler}
        />
        <FormRow
          label="password"
          input={{
            id: "password",
            type: "password",
            name: "password",
            value: enteredPassword,
          }}
          onChange={passwordInputHandler}
        />
        <button className="text-xl mb-4 mt-3 bg-cyan-900 text-white px-4 py-2 w-full rounded-md capitalize tracking-wide">
          {show ? <Spinner classes="w-8 h-8"/> : "login"}
        </button>
      </form>
    </Modal>
  );
};

export default Login;
