import { Spinner, Modal, FormRow } from "@jobquest/shared";
import { useState, useContext } from "react";
import { useHttp, useInput } from "@jobquest/hooks";
import { AuthContext } from "@jobquest/context";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { MIN_PASSWORD_LENGTH } from "./Login";
import { ModalView } from "@jobquest/models";
import {
  MESSAGES,
  TOAST_CONFIG,
  AUTH_SIGNUP_ENDPOINT,
} from "@jobquest/constants";

interface SignUpProps {
  setActiveModal: (view: ModalView) => void;
}

interface SignUpResponse {
  idToken: string;
  email: string;
}

const FULL_NAME_REGEX = /^\S+\s+\S+/;

const SignUp = ({ setActiveModal }: SignUpProps) => {
  const ctx = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signUpHandler, showSpinner] = useHttp();

  const [
    enteredFullName,
    nameInputHandler,
    nameBlurHandler,
    nameHasError,
    resetNameState,
  ] = useInput((name) => FULL_NAME_REGEX.test(name));

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
  ] = useInput((password) => password.length > MIN_PASSWORD_LENGTH);

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
      {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
    </div>
  );

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
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

    const onSucces = () => {
      toast.success(MESSAGES.SIGNUP_SUCCESS, TOAST_CONFIG);
      resetNameState();
      resetEmailState();
      resetPasswordState();
      resetConfirmPasswordState();
    };

    const onError = (errorResponse: string) => {
      toast.warn(errorResponse, TOAST_CONFIG);
    };

    signUpHandler<SignUpResponse>(
      AUTH_SIGNUP_ENDPOINT(ctx.apiKey),
      "POST",
      data,
      onSucces,
      onError,
    );
  };

  return (
    <>
      <Modal setActiveModal={setActiveModal}>
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
            message={MESSAGES.NAME_VALIDATION_ERROR_MESSAGE}
          ></FormRow>
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
            message={MESSAGES.EMAIL_VALIDATION_ERROR_MESSAGE}
          ></FormRow>
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
            message={MESSAGES.PASSWORD_VALIDATION_ERROR_MESSAGE}
            eyeIcon={enteredPassword.length > 0 && passwordVisiblityIcon}
          ></FormRow>
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
            message={MESSAGES.CONFIRM_PASSWORD_VALIDATION_MESSAGE}
            eyeIcon={enteredConfirmPassword.length > 0 && passwordVisiblityIcon}
          ></FormRow>
          <button className="text-lg lg:text-xl mb-4 mt-3 flex items-center justify-center gap-2 bg-cyan-900 text-white px-4 py-2 w-full rounded-md capitalize tracking-wide">
            <span>register</span>
            <span>
              {showSpinner ? (
                <Spinner classNames="w-5 h-5"></Spinner>
              ) : (
                <AiOutlinePlusCircle></AiOutlinePlusCircle>
              )}
            </span>
          </button>
        </form>
      </Modal>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default SignUp;
