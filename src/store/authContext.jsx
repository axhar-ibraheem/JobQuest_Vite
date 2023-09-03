import React from "react"

const AuthContext = React.createContext({
    idToken: "", 
    apiKey: "",
    email: "",
    login: () => {},
    logout: () => {},
})

export default AuthContext;