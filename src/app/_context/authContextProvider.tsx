import { PropsWithChildren, useReducer } from "react";
import AuthContext, { AuthContextType } from "./authContext";

interface AuthState {
  idToken: string | null;
  email: string | null;
  apikey: string;
  isGuest: boolean;
}

type AuthAction =
  | { type: "LOGIN"; idToken: string; email: string }
  | { type: "LOGIN_AS_GUEST" }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  idToken: sessionStorage.getItem("idToken"),
  email: sessionStorage.getItem("email"),
  apikey: import.meta.env.VITE_APIKEY,
  isGuest: false,
};

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN": {
      sessionStorage.setItem("idToken", action.idToken);
      sessionStorage.setItem("email", action.email);
      return {
        ...state,
        idToken: action.idToken,
        email: action.email,
      };
    }
    case "LOGIN_AS_GUEST": {
      return { ...state, idToken: "guest", email: "guest", isGuest: true };
    }
    case "LOGOUT": {
      sessionStorage.removeItem("idToken");
      sessionStorage.removeItem("email");
      return {
        ...state,
        idToken: "",
        email: "",
      };
    }
  }
};

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer<React.Reducer<AuthState, AuthAction>>(
    authReducer,
    initialState,
  );

  const loginHandler = (idToken: string, email: string) => {
    dispatch({ type: "LOGIN", idToken: idToken, email: email });
  };

  const loginGuestHandler = () => {
    dispatch({ type: "LOGIN_AS_GUEST" });
  };

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
  };

  const context: AuthContextType = {
    idToken: state.idToken ?? "",
    apiKey: state.apikey,
    email: state.email ?? "",
    isGuest: state.isGuest,
    login: loginHandler,
    loginAsGuest: loginGuestHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
