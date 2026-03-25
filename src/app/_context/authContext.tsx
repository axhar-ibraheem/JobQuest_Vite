import { createContext } from "react";

export interface AuthContextType {
  idToken: string;
  apiKey: string;
  email: string;
  isGuest: boolean;
  login: (idToken: string, email: string) => void;
  loginAsGuest: () => void;
  logout: () => void;
}

const defaultValue: AuthContextType = {
  idToken: "",
  apiKey: "",
  email: "",
  isGuest: false,
  login: () => {},
  loginAsGuest: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export default AuthContext;
