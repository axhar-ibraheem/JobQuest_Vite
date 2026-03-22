import FormRow from "../Auth/FormRow";
import useInput from "../../hooks/useInput";
import { useContext, useEffect } from "react";
import AuthContext from "../../store/authContext";
import { ToastContainer, toast } from "react-toastify";
import extractFullName from "../../utils/extractFullName";
import useHttp from "../../hooks/useHttp";
import {
  API_LOOKUP_PROFILE_ENDPOINT,
  API_UPDATE_PROFILE_ENDPOINT,
} from "../../constants/api.constants";
import { MESSAGES, TOAST_CONFIG } from "../../constants/messages.constants";

interface FirebaseUser {
  displayName: string | null;
  photoUrl: string | null;
  email: string | null;
}

interface LookUpResponse {
  users: FirebaseUser[];
}

const isValidEntry = (value: string): boolean => value.trim().length > 0;

const Profile = () => {
  const [updateProfileHandler] = useHttp();
  const [getUserInfo] = useHttp();
  const ctx = useContext(AuthContext);

  const { apiKey, idToken } = ctx;
  const [
    enteredFirstName,
    firstNameInputChangeHandler,
    firstNameInputBlurHandler,
    firstNameHasError,
    resetFirstNameState,
  ] = useInput(isValidEntry);
  const [
    enteredLastName,
    lastNameInputChangeHandler,
    lastNameInputBlurHandler,
    lastNameHasError,
    resetLastNameState,
  ] = useInput(isValidEntry);
  const [
    enteredEmail,
    emailInputHandler,
    emailBlurHandler,
    emailHasError,
    resetEmailState,
  ] = useInput((email) => email.includes("@"));
  const [
    enteredLocation,
    locationInputHandler,
    locationBlurHandler,
    locationHasError,
    resetLocationState,
  ] = useInput(isValidEntry);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      firstNameHasError ||
      lastNameHasError ||
      emailHasError ||
      locationHasError
    )
      return;
    const data = {
      displayName: `${enteredFirstName} ${enteredLastName}`,
      photoUrl: enteredLocation,
      returnSecureToken: true,
      idToken: idToken,
    };
    const onSucces = () => {
      toast.success(MESSAGES.PROFILE_UPDATE_SUCCESS, TOAST_CONFIG);
    };
    const onError = () => {
      toast.error(MESSAGES.GENERIC_ERROR, TOAST_CONFIG);
    };

    updateProfileHandler(
      API_UPDATE_PROFILE_ENDPOINT(apiKey),
      "POST",
      data,
      onSucces,
      onError,
    );
  };

  useEffect(() => {
    const data = {
      idToken: idToken,
    };
    const onSuccess = (response: LookUpResponse) => {
      response.users.forEach((user) => {
        const { firstName, lastName } = extractFullName(user.displayName ?? "");
        resetFirstNameState(firstName);
        resetLastNameState(lastName);
        resetLocationState(user.photoUrl ?? "");
        resetEmailState(user.email ?? "");
      });
    };
    const onError = () => {
      toast.error("There was an error!", {
        position: toast.POSITION.TOP_CENTER,
      });
    };
    getUserInfo<LookUpResponse>(
      API_LOOKUP_PROFILE_ENDPOINT(apiKey),
      "POST",
      data,
      onSuccess,
      onError,
    );
  }, []);

  return (
    <>
      <div className="pt-28 max-w-6xl w-11/12 mx-auto">
        <div className="mb-2 text-center">
          <h1 className="text-3xl font-semibold tracking-wider text-blue-900 capitalize">
            profile
          </h1>
        </div>
        <form
          onSubmit={onSubmitHandler}
          className="bg-white p-4 grid md:grid-cols-2 gap-x-3 mx-auto rounded-md shadow-md"
        >
          <FormRow
            label="first Name"
            input={{
              type: "text",
              id: "firstname",
              name: "firstname",
              value: enteredFirstName,
            }}
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputBlurHandler}
            error={firstNameHasError}
            message="Please enter a valid first name"
          ></FormRow>
          <FormRow
            label="last name"
            input={{
              type: "text",
              id: "lastname",
              name: "lastname",
              value: enteredLastName,
            }}
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
            error={lastNameHasError}
            message="Please enter a valid last name"
          ></FormRow>
          <FormRow
            label="email"
            input={{
              type: "email",
              id: "email",
              placeholder: "example@gmail.com",
              name: "email",
              value: enteredEmail,
            }}
            onChange={emailInputHandler}
            onBlur={emailBlurHandler}
            error={emailHasError}
            message="Email must include `@`"
          ></FormRow>
          <FormRow
            label="location"
            input={{
              type: "text",
              id: "location",
              name: "location",
              value: enteredLocation,
            }}
            onChange={locationInputHandler}
            onBlur={locationBlurHandler}
            error={locationHasError}
            message="Please enter a location"
          ></FormRow>
          <button className="bg-blue-900 tracking-wider text-white px-4 py-2 my-3 rounded-md capitalize">
            Update profile
          </button>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Profile;
