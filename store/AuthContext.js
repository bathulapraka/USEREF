import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onlogin: (email, password) => {},
});
export const AuthContextProvider = (props) => {
  const [isLoggedin, setloggedin] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setloggedin(true);
    }
  }, []);

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setloggedin(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setloggedin(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedin: isLoggedin,
        onLogout: logoutHandler,
        onlogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
