import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import FormRow from "./FormRow";
import AuthContext from "../../store/authContext";
import Spinner from "../UI/Spinner";
import useInput from "../../hooks/useInput";
import Message from "../UI/Notification/Message";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Login = (props) => {
  const ctx = useContext(AuthContext);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const [
    enteredEmail,
    emailInputHandler,
    emailBlurHandler,
    emailHasError,
    resetEmailState,
  ] = useInput((email) => email.includes("@"));

  const [
    enteredPassword,
    passwordInputHandler,
    passwordBlurHandler,
    passwordHasError,
    resetPasswordState,
  ] = useInput((password) => password.length > 7);

  const [show, setShow] = useState(false);
  const passwordVisibilityHandler = () => {
    setShowPassword((preVal) => !preVal);
  };

  const endPointUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ctx.apiKey}`;
  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      if (emailHasError || passwordHasError) return;
      setShow(true);
      const response = await axios.post(endPointUrl, {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      });
      if (response.status === 200) {
        const { idToken, email } = response.data;
        ctx.login(idToken, email);
        resetEmailState();
        resetPasswordState();
        history.replace("/dashboard");
      }
    } catch (error) {
      const { data } = error.response;
      toast.error(data.error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setShow(false);
    }
  };
  return (
    <>
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
            onBlur={emailBlurHandler}
            error = {emailHasError}
            message = "Email must include @"
          />
          <FormRow
            label="password"
            input={{
              id: "password",
              type: showPassword ? "text" : "password",
              name: "password",
              value: enteredPassword,
            }}
            onChange={passwordInputHandler}
            onBlur={passwordBlurHandler}
            error = {passwordHasError}
            message = "Password must be more than seven characters long!"
            eyeIcon={
              enteredPassword.length > 0 && (
                <div
                  onClick={passwordVisibilityHandler}
                  className="absolute bottom-3 right-4 lg:text-xl text-cyan-900"
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              )
            }
          />
          <button className="text-xl mb-4 mt-3 bg-cyan-900 text-white px-4 py-2 w-full rounded-md capitalize tracking-wide">
            {show ? <Spinner classes="w-8 h-8" /> : "login"}
          </button>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Login;
