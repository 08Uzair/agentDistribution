import axios from "axios";

const API = axios.create({
  baseURL: "https://admin-agent-server-iilm.onrender.com/api/v1",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// Tasks
export const fetchTask = () => API.get(`/task`);
export const fetchTaskByID = (id) => API.get(`/task/${id}`);
export const createTask = (newTask) => API.post("/task", newTask);
export const deleteTask = (id) => API.delete(`/task/${id}`);
export const updateTask = (id, updatedTask) =>
  API.put(`/task/${id}`, updatedTask);

// List
export const fetchList = () => API.get(`/list`);
export const fetchListByID = (id) => API.get(`/list/${id}`);
export const createList = (newList) => API.post("/list", newList);
export const deleteList = (id) => API.delete(`/list/${id}`);
export const updateList = (id, updatedList) =>
  API.put(`/list/${id}`, updatedList);

// Agents
export const fetchAgent = () => API.get(`/agent`);
export const fetchAgentByID = (id) => API.get(`/agent/${id}`);
export const createAgent = (newAgent) => API.post("/agent", newAgent);
export const deleteAgent = (id) => API.delete(`/agent/${id}`);
export const updateAgent = (id, updatedAgent) =>
  API.put(`/agent/${id}`, updatedAgent);

// User
export const getUsers = () => API.get("/user");
export const getUserById = (id) => API.get(`/user/${id}`);
export const signUp = (newUser) => API.post("/user/signUp", newUser);
export const signIn = (newUser) => API.post("/user/signIn", newUser);
export const updateUser = (id, updatedUser) =>
  API.put(`/user/${id}`, updatedUser);
