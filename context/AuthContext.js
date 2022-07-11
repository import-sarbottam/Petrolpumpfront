import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

async function getUser(){
  try {
    const user = await axios.get('https://ptrlpump-backend.herokuapp.com/api/getuser/')
    if(user.data)
      return(user.data.user)
  } catch (error) {
      return null
  }
}

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};