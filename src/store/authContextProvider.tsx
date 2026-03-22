import { PropsWithChildren, useReducer } from "react";
import AuthContext from "./authContext";

interface AuthState {
  idToken: string | null;
  email: string | null;
  apikey: string;
}

type AuthAction =
  | { type: "LOGIN"; idToken: string; email: string }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  idToken: localStorage.getItem("idToken"),
  email: localStorage.getItem("email"),
  apikey: import.meta.env.VITE_APIKEY,
};

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("idToken", action.idToken);
      localStorage.setItem("email", action.email);
      return {
        ...state,
        idToken: action.idToken,
        email: action.email,
      };
    }
    case "LOGOUT": {
      localStorage.removeItem("idToken");
      localStorage.removeItem("email");
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

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
  };

  const context = {
    idToken: state.idToken ?? "",
    apiKey: state.apikey,
    email: state.email ?? "",
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
