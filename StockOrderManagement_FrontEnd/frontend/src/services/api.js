import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44363/api", 
});

export default api;
