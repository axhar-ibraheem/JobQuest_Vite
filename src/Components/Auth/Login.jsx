import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import FormRow from "./FormRow";
import AuthContext from "../../store/authContext";
import Spinner from "../UI/Spinner";
import useInput from "../../hooks/useInput";
import useHttp from "../../hooks/useHttp";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoMdLogIn } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Login = (props) => {
  const ctx = useContext(AuthContext);
  const history = useHistory();
  const [loginHandler, show] = useHttp();
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

  const passwordVisibilityHandler = () => {
    setShowPassword((preVal) => !preVal);
  };

  const endPointUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ctx.apiKey}`;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (emailHasError || passwordHasError) return;
    const data = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };
    const onSucces = (data) => {
      const { idToken, email } = data;
      ctx.login(idToken, email);
      resetEmailState();
      resetPasswordState();
      history.replace("/dashboard");
    };
    const onError = (errorResponse) => {
      toast.error(errorResponse, {
        position: toast.POSITION.TOP_CENTER,
      });
    };
    loginHandler(endPointUrl, "POST", data, onSucces, onError);
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
            error={emailHasError}
            message="Email must include @"
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
            error={passwordHasError}
            message="Password must be more than seven characters long!"
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
          <button className="text-lg lg:text-xl mb-4 mt-3 gap-2 flex items-center justify-center  bg-cyan-900 text-white px-4 py-2 w-full rounded-md capitalize tracking-wide">
            <span className="">login</span>
            <span className="inline-block">
              {show ? <Spinner classes="w-5 h-5" /> : <IoMdLogIn />}
            </span>
          </button>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Login;
