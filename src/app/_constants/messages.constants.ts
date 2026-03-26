import { ToastOptions, toast } from "react-toastify";

export const MESSAGES = {
  PROFILE_UPDATE_SUCCESS: "Profile updated successfully!",
  GENERIC_ERROR: "There was an error!",
  SIGNUP_SUCCESS: "Welcome! Login with your credentials",
  LOGIN_ERROR: "Invalid credentials, please try again!",
  EMAIL_VALIDATION_ERROR_MESSAGE: "Email must include @!",
  PASSWORD_VALIDATION_ERROR_MESSAGE:
    "Password must be more than seven characters long!",
  NAME_VALIDATION_ERROR_MESSAGE: "Please enter the full name",
  CONFIRM_PASSWORD_VALIDATION_MESSAGE: "Passwords don't match!",
} as const;

export const TOAST_CONFIG: ToastOptions = {
  position: toast.POSITION.TOP_CENTER,
};
