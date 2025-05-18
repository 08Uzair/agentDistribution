import {
  FETCH_LISTS,
  CREATE_LIST,
  FETCH_LIST_ID,
  UPDATE_LIST,
  DELETE_LIST,
} from "../constants/actionType";

const initialState = {
  list: [],
  singleList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LISTS:
      return {
        ...state,
        list: action.payload,
      };

    case CREATE_LIST:
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    case FETCH_LIST_ID:
      return {
        ...state,
        singleList: action.payload,
      };

    case DELETE_LIST:
      return {
        ...state,
        list: state.list.filter((list) => list._id !== action.payload._id),
      };

    case UPDATE_LIST:
      return {
        ...state,
        list: state.list.map((list) =>
          list._id === action.payload._id ? action.payload : list
        ),
      };

    default:
      return state;
  }
};
