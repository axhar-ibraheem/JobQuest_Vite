import { ToastOptions, toast } from "react-toastify";

export const MESSAGES = {
  PROFILE_UPDATE_SUCCESS: "Profile updated successfully!",
  GENERIC_ERROR: "There was an error!",
  SIGNUP_SUCCESS: "Welcome! Login with your credentials",
  LOGIN_ERROR: "Invalid credentials, please try again!",
} as const;

export const TOAST_CONFIG: ToastOptions = {
  position: toast.POSITION.TOP_CENTER,
};
