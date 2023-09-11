import Modal from "../UI/Modal";
import FormRow from "./FormRow";
import Spinner from "../UI/Spinner";
import { useState, useContext } from "react";
import useInput from "../../hooks/useInput";
import AuthContext from "../../store/authContext";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import useHttp from "../../hooks/useHttp";
const SignUp = (props) => {
  const ctx = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpHandler, showSpinner] = useHttp();
  const regex = /^\S+\s+\S+/;
  const [
    enteredFullName,
    nameInputHandler,
    nameBlurHandler,
    nameHasError,
    resetNameState,
  ] = useInput((name) => regex.test(name));

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

  const [
    enteredConfirmPassword,
    confirmPasswordInputHandler,
    confirmPasswordBlurHandler,
    confirmPasswordHasError,
    resetConfirmPasswordState,
  ] = useInput((confirmPassword) => confirmPassword === enteredPassword);

  const passwordVisibilityHandler = () => {
    setShowPassword((preVal) => !preVal);
  };

  const passwordVisiblityIcon = (
    <div
      onClick={passwordVisibilityHandler}
      className="absolute bottom-3 right-4 lg:text-xl text-cyan-900"
    >
      {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
    </div>
  );

  const endPointURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ctx.apiKey}`;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (
      nameHasError ||
      emailHasError ||
      passwordHasError ||
      confirmPasswordHasError
    ) {
      return;
    }
    const data = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };
    const onSucces = (data) => {
      console.log(data);
      toast.success("Welcome! Login with your credentials", {
        position: toast.POSITION.TOP_CENTER,
      });
      resetNameState();
      resetEmailState();
      resetPasswordState();
      resetConfirmPasswordState();
    };
    const onError = (errorResponse) => {
      toast.warn(errorResponse, {
        position: toast.POSITION.TOP_CENTER,
      });
    };
    signUpHandler(endPointURL, "POST", data, onSucces, onError);
  };

  return (
    <>
      <Modal setShow={props.setShow}>
        <form onSubmit={onSubmitHandler}>
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
            onBlur={nameBlurHandler}
            error={nameHasError}
            message="Please enter the full name"
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
            onBlur={emailBlurHandler}
            error={emailHasError}
            message="Email must include `@`"
          />
          <FormRow
            label="password"
            input={{
              type: showPassword ? "text" : "password",
              name: "password",
              id: "password",
              value: enteredPassword,
            }}
            onChange={passwordInputHandler}
            onBlur={passwordBlurHandler}
            error={passwordHasError}
            message="Password must be more than seven characters long!"
            eyeIcon={enteredPassword.length > 0 && passwordVisiblityIcon}
          />
          <FormRow
            label="confirm password"
            input={{
              type: showPassword ? "text" : "password",
              name: "confirm password",
              id: "confirmpassword",
              value: enteredConfirmPassword,
            }}
            onChange={confirmPasswordInputHandler}
            onBlur={confirmPasswordBlurHandler}
            error={confirmPasswordHasError}
            message="Passwords don't match!"
            eyeIcon={enteredConfirmPassword.length > 0 && passwordVisiblityIcon}
          />
          <button className="text-lg lg:text-xl mb-4 mt-3 flex items-center justify-center gap-2 bg-cyan-900 text-white px-4 py-2 w-full rounded-md capitalize tracking-wide">
            <span>register</span>
            <span>
              {showSpinner ? (
                <Spinner classes="w-5 h-5" />
              ) : (
                <AiOutlinePlusCircle />
              )}
            </span>
          </button>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default SignUp;
