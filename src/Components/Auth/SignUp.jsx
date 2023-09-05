import Modal from "../UI/Modal";
import FormRow from "./FormRow";
import Spinner from "../UI/Spinner";
import { useState } from "react";
import useInput from "../../hooks/useInput";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../store/authContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

const SignUp = (props) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const ctx = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

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

  const signUpHandler = async (event) => {
    try {
      event.preventDefault();

      if (
        nameHasError ||
        emailHasError ||
        passwordHasError ||
        confirmPasswordHasError
      ) {
        return;
      }
      setShowSpinner(true);

      const response = await axios.post(
        endPointURL,
        {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }
      );
      if (response.status === 200) {
        toast.success("Welcome! Login with your credentials", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      const { data } = error.response;
      toast.warn(data.error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setShowSpinner(false);
      resetNameState();
      resetEmailState();
      resetPasswordState();
      resetConfirmPasswordState();
    }
  };

  return (
    <>
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
          <button className="text-xl mb-4 mt-3 bg-cyan-900 text-white px-4 py-2 w-full rounded-md capitalize tracking-wide">
            {showSpinner ? <Spinner classes="w-8 h-8" /> : "register"}
          </button>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default SignUp;
