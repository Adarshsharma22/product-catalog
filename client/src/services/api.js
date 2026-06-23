import axios from "axios";

const api = axios.create({
  baseURL:
    "https://product-catalog-api-wzqy.onrender.com/api",
});

export default api;