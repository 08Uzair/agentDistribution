import * as api from "../api";
import {
  FETCH_AGENTS,
  CREATE_AGENT,
  FETCH_AGENT_ID,
  UPDATE_AGENT,
  DELETE_AGENT,
} from "../constants/actionType";

export const getAgents = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAgent();
    dispatch({ type: FETCH_AGENTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getUserAgents = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchAgent();
    const filteredData = data?.agents?.filter((item) => item?.user?._id == id);
    dispatch({ type: FETCH_AGENTS, payload: filteredData });
  } catch (error) {
    console.log(error);
  }
};

export const createAgent = (agent) => async (dispatch) => {
  try {
    const { data } = await api.createAgent(agent);
    dispatch({ type: CREATE_AGENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getAgentById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchAgentByID(id);
    dispatch({ type: FETCH_AGENT_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateAgent = (id, updatedAgent) => async (dispatch) => {
  try {
    console.log(updatedAgent);
    const { data } = await api.updateAgent(id, updatedAgent);
    dispatch({ type: UPDATE_AGENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAgent = (id) => async (dispatch) => {
  try {
    await api.deleteAgent(id);
    dispatch({ type: DELETE_AGENT, payload: id });
  } catch (error) {
    console.log(error);
  }
};
