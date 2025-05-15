import * as api from "../api";
import {
  AUTH,
  FETCH_USER_ID,
  FETCH_USER,
  // UPDATE_USER,
} from "../constants/actionType";

export const signin = (newUser) => async (dispatch) => {
  try {
    const { data } = await api.signIn(newUser);
    dispatch({ type: AUTH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const signup = (newUser) => async (dispatch) => {
  try {
    const { data } = await api.signUp(newUser);
    dispatch({ type: AUTH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();
    console.log(data , " This is action User Data")
    dispatch({ type: FETCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserByID = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUserById(id);
    dispatch({ type: FETCH_USER_ID, payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const updateUser = (id, updatedUser) => async (dispatch) => {
//   try {
//     const { data } = await api.updateUser(id, updatedUser);
//     dispatch({ type: UPDATE_USER, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

