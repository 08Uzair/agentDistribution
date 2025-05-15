import {
  LOGOUT,
  AUTH,
  FETCH_USER_ID,
  FETCH_USER,
  // UPDATE_USER,
} from "../constants/actionType";

const auth = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        authData: action.payload,
        loading: false,
        errors: null,
      };

    case LOGOUT:
      return { ...state, authData: null, loading: false, errors: null };

    case FETCH_USER:
      return {
        ...state,
        authData: action.payload,
      };

    // case UPDATE_USER:
    //   // localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
    //   return {
    //     ...state,
    //     authData: {
    //       ...state.authData,
    //       user: {
    //         ...state.authData.user,
    //         ...action.payload,
    //       },
    //     },
    //   };

    case FETCH_USER_ID:
      return [action.payload];

    default:
      return state;
  }
};

export default auth;
