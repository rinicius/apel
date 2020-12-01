import axios from "axios";

// const dev = "http://localhost:3001/api";
const herokuapp = "https://apel-api.herokuapp.com/api";

const api = axios.create({
  baseURL: herokuapp,
});

export default api;
