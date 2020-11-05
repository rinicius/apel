import axios from "axios";

const api = axios.create({
  baseURL: "https://apel-api.herokuapp.com/api",
});

export default api;
