import AuthContext from "./authContext";
import { useReducer } from "react";
const initialState = {
  idToken: localStorage.getItem("idToken"),
  email: localStorage.getItem("email"),
  apiKey: import.meta.env.VITE_APIKEY,
};
const authReducer = (state, action) => {
      switch(action.type){
        case "LOGIN" :{
          localStorage.setItem('idToken', action.idToken)
          localStorage.setItem('email', action.email)
          return {
            ...state,
            idToken : action.idToken,
            email: action.email
          }
        }
        case "LOGOUT": {
          localStorage.removeItem('idToken');
          localStorage.removeItem("email")
          return {
            ...state,
            idToken: "",
            email: ""
          }
        }
      }
};

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loginHandler = (idToken, email) => {
    dispatch({type: "LOGIN", idToken: idToken, email: email})
  };
  const logoutHandler = () => {
    dispatch({type: "LOGOUT"})
  };

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