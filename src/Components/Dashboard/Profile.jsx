import FormRow from "../Auth/FormRow";
import useInput from "../../hooks/useInput";
import { useContext, useEffect } from "react";
import AuthContext from "../../store/authContext";
import { ToastContainer, toast } from "react-toastify";
import extractFullName from "../../utils/extractFullName";
import useHttp from "../../hooks/useHttp";
const Profile = () => {
  const isValidEntry = (value) => value.trim().length > 0;
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

  const endPointURLOne = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`;
  const endPointURLTwo = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (
      firstNameHasError ||
      lastNameHasError ||
      emailHasError ||
      locationHasError
    )
      return;
    const data = {
      displayName: enteredFirstName + ` ${enteredLastName}`,
      photoUrl: enteredLocation,
      returnSecureToken: true,
      idToken: idToken,
    };
    const onSucces = () => {
      toast.success("Profile updated successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    };
    const onError = () => {
      toast.error("There was an error!", {
        position: toast.POSITION.TOP_CENTER,
      });
    };

    updateProfileHandler(endPointURLOne, "POST", data, onSucces, onError);
  };

  useEffect(() => {
    const data = {
      idToken : idToken
    }
    const onSucces = (data) => {
      const { users } = data;
      users.forEach((user) => {
        const names = extractFullName(user.displayName ? user.displayName : "");
        const { firstName, lastName } = names;
        resetFirstNameState(firstName);
        resetLastNameState(lastName);
        resetLocationState(user.photoUrl ? user.photoUrl : "");
        resetEmailState(user.email ? user.email : "");
      });
    };
    const onError = () => {
      toast.error("There was an error!", {
        position: toast.POSITION.TOP_CENTER,
      });
    };
    getUserInfo(endPointURLTwo, "POST",data, onSucces, onError );
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
          />
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
          />
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
          />
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
          />
          <button className="bg-blue-900 tracking-wider text-white px-4 py-2 my-3 rounded-md capitalize">
            update profile
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;
