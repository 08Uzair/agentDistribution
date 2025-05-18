import * as api from "../api";
import {
  FETCH_LISTS,
  CREATE_LIST,
  FETCH_LIST_ID,
  UPDATE_LIST,
  DELETE_LIST,
} from "../constants/actionType";

export const getLists = () => async (dispatch) => {
  try {
    const { data } = await api.fetchList();
    dispatch({ type: FETCH_LISTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getUserLists = (id) => async (dispatch) => {
  //   console.log(id, "This is the id");
  try {
    const { data } = await api.fetchList();
    const filteredData = data?.lists?.filter(
      (item) => item?.assignedTo?._id == id
    );
    // console.log(filteredData, "This is the filtered data");
    return filteredData;
  } catch (error) {
    console.log(error);
  }
};

export const createList = (list) => async (dispatch) => {
  try {
    const { data } = await api.createList(list);
    dispatch({ type: CREATE_LIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getListById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchListByID(id);
    dispatch({ type: FETCH_LIST_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateList = (id, updatedList) => async (dispatch) => {
  try {
    console.log(updatedList);
    const { data } = await api.updateList(id, updatedList);
    dispatch({ type: UPDATE_LIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteList = (id) => async (dispatch) => {
  try {
    await api.deleteList(id);
    dispatch({ type: DELETE_LIST, payload: id });
  } catch (error) {
    console.log(error);
  }
};
