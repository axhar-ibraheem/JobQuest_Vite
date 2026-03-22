import { createContext } from "react";

interface AuthContextType {
  idToken: string;
  apiKey: string;
  email: string;
  login: (idToken: string, email: string) => void;
  logout: () => void;
}

const defaultValue: AuthContextType = {
  idToken: "",
  apiKey: "",
  email: "",
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export default AuthContext;
