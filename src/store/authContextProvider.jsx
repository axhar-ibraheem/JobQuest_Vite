import AuthContext from "./authContext";
import { useReducer } from "react";
const initialState = {
  idToken: localStorage.getItem("idToken"),
  email: localStorage.getItem("email"),
  apiKey: import.meta.env,
};
const authReducer = (state, action) => {
      
};

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loginHandler = () => {};
  const logoutHandler = () => {};

  const context = {
    idToken: state.idToken,
    apiKey: state.apiKey,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;