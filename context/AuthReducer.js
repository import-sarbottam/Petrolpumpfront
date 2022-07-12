const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          user: null,
          token: null,
          isFetching: true,
          error: false,
        };
      case "LOGIN_SUCCESS":
        return {
          user: action.payload.user,
          token: action.payload.token,
          isFetching: false,
          error: false,
        };
      case "LOGIN_FAILURE":
        return {
          user: null,
          token:null,
          isFetching: false,
          error: action.payload,
        };
      case "LOGOUT":
        return {
          ...state,
          user: null,
          token: null,
        };
      default:
        return state;
    }
  };
  
  export default AuthReducer;