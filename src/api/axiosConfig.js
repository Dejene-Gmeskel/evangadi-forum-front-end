import axios from "axios";
const axiosBase = axios.create({
  // baseURL: "http://localhost:5006/api",
  baseURL: "https://evangadi-forum-backend-api.onrender.com/api",
});
export default axiosBase;
