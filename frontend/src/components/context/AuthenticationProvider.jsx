import React, { createContext, useState } from "react";

export const authContext = createContext(false);

const AuthenticationProvider = (props) => {
  const [id, setId] = useState("");
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");

  return (
    <authContext.Provider
      value={{
        id,
        setId,
        auth,
        setAuth,
        name,
        setName,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthenticationProvider;
