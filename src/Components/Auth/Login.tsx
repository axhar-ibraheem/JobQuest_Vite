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
import { useNavigate } from "react-router-dom";
import { AUTH_ENDPOINT } from "../../constants/api.constants";
import { ROUTES } from "../../constants/routes.constants";
import { ModelView } from "../Landing";
import { TOAST_CONFIG } from "../../constants/messages.constants";

interface LoginResponse {
  idToken: string;
  email: string;
}

interface LoginProps {
  setShow: (show: ModelView) => void;
}

export const MIN_PASSWORD_LENGTH = 7;

const Login = ({ setShow }: LoginProps) => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginHandler, show] = useHttp();
  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  const passwordVisibilityHandler = () => {
    setShowPassword((preVal) => !preVal);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailHasError || passwordHasError) return;

    const data = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };

    const onSucces = (data: LoginResponse) => {
      const { idToken, email } = data;
      ctx.login(idToken, email);
      resetEmailState();
      resetPasswordState();
      navigate(ROUTES.DASHBOARD, { replace: true });
    };

    const onError = (errorResponse: string) => {
      toast.error(errorResponse, TOAST_CONFIG);
    };
    loginHandler(AUTH_ENDPOINT(ctx.apiKey), "POST", data, onSucces, onError);
  };

  return (
    <>
      <Modal setShow={setShow}>
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
          ></FormRow>
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
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              )
            }
          ></FormRow>
          <button className="text-lg lg:text-xl mb-4 mt-3 gap-2 flex items-center justify-center  bg-cyan-900 text-white px-4 py-2 w-full rounded-md capitalize tracking-wide">
            <span className="">login</span>
            <span className="inline-block">
              {show ? (
                <Spinner classNames="w-5 h-5"></Spinner>
              ) : (
                <IoMdLogIn></IoMdLogIn>
              )}
            </span>
          </button>
        </form>
      </Modal>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Login;
