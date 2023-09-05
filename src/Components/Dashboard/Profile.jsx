import FormRow from "../Auth/FormRow";
import useInput from "../../hooks/useInput";
import axios from "axios";
import { useContext, useEffect } from "react";
import AuthContext from "../../store/authContext";
import { ToastContainer, toast } from "react-toastify";
import extractFullName from "../../utils/extractFullName";
const Profile = () => {
  const isValidEntry = (value) => value.trim().length > 0;

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

  const updateProfileHandler = async (event) => {
    try {
      event.preventDefault();
      if (
        firstNameHasError ||
        lastNameHasError ||
        emailHasError ||
        locationHasError
      )
        return;
      const response = await axios.post(endPointURLOne, {
        displayName: enteredFirstName + ` ${enteredLastName}`,
        photoUrl: enteredLocation,
        returnSecureToken: true,
        idToken: idToken,
      });
      if (response.status === 200) {
        toast.success("Profile updated successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error("There was an error!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.post(endPointURLTwo, {
          idToken: idToken,
        });
        if (response.status === 200) {
          const { users } = response.data;
          users.forEach((user) => {
            const names = extractFullName(
              user.displayName ? user.displayName : ""
            );
            const { firstName, lastName } = names;
            resetFirstNameState(firstName);
            resetLastNameState(lastName);
            resetLocationState(user.photoUrl ? user.photoUrl : "");
            resetEmailState(user.email ? user.email : "");
          });
        }
      } catch (error) {
        toast.error("There was an error!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getUserInfo();
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
          onSubmit={updateProfileHandler}
          className="bg-white p-4 grid md:grid-cols-2 gap-x-3 mx-auto rounded-md shadow-md"
        >
          <FormRow
            label="first Name"
            input={{
              type: "text",
              id: "firstname",
              name: "firstname",
              value : enteredFirstName
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
              value: enteredLastName
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
              value: enteredEmail
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
              value: enteredLocation
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
