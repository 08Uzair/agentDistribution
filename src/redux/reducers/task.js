import {
  FETCH_TASKS,
  CREATE_TASK,
  FETCH_TASK_ID,
  UPDATE_TASK,
  DELETE_TASK,
} from "../constants/actionType";

const initialState = {
  task: [],
  singleTask: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        task: action.payload,
      };

    case CREATE_TASK:
      return {
        ...state,
        task: [...state.task, action.payload],
      };

    case FETCH_TASK_ID:
      return {
        ...state,
        singleTask: action.payload,
      };

    case DELETE_TASK:
      return {
        ...state,
        task: state.task.filter((task) => task._id !== action.payload._id),
      };

    case UPDATE_TASK:
      return {
        ...state,
        task: state.task.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };

    default:
      return state;
  }
};
