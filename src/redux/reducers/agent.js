import {
  FETCH_AGENTS,
  CREATE_AGENT,
  FETCH_AGENT_ID,
  UPDATE_AGENT,
  DELETE_AGENT,
} from "../constants/actionType";

const initialState = {
  agent: [],
  singleAgent: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AGENTS:
      return {
        ...state,
        agent: action.payload,
      };

    case CREATE_AGENT:
      return {
        ...state,
        agent: [...state.agent, action.payload],
      };

    case FETCH_AGENT_ID:
      return {
        ...state,
        singlAgent: action.payload,
      };

    case DELETE_AGENT:
      return {
        ...state,
        agent: state.agent.filter((agent) => agent._id !== action.payload._id),
      };

    case UPDATE_AGENT:
      return {
        ...state,
        agent: state.agent.map((agent) =>
          agent._id === action.payload._id ? action.payload : agent
        ),
      };

    default:
      return state;
  }
};
