import * as api from "../api";
import {
  FETCH_TASKS,
  CREATE_TASK,
  FETCH_TASK_ID,
  UPDATE_TASK,
  DELETE_TASK,
} from "../constants/actionType";

export const getTasks = (query) => async (dispatch) => {
  try {
    const { data } = await api.fetchTask(query);
    dispatch({ type: FETCH_TASKS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getUserTasks = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchTask();
    const filteredData = data?.tasks?.filter((item) => item?.user?._id == id);
    dispatch({ type: FETCH_TASKS, payload: filteredData });
  } catch (error) {
    console.log(error);
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    const { data } = await api.createTask(task);
    dispatch({ type: CREATE_TASK, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getTaskById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchTaskByID(id);
    dispatch({ type: FETCH_TASK_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = (id, updatedTask) => async (dispatch) => {
  try {
    console.log(updatedTask);
    const { data } = await api.updateTask(id, updatedTask);
    dispatch({ type: UPDATE_TASK, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await api.deleteTask(id);
    dispatch({ type: DELETE_TASK, payload: id });
  } catch (error) {
    console.log(error);
  }
};
