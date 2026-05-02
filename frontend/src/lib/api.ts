import axios from "axios";
import { TOKEN_KEY, API_URL } from "@/providers/constants";

axios.interceptors.request.use((config) => {
  try {
    const token = window.localStorage.getItem(TOKEN_KEY);
    config.headers.Authorization = `Bearer ${token}`;
    config.baseURL = API_URL;

    return config;
  } catch {
    throw new Error("Error On Fetch Value");
  }
});

export default axios;
