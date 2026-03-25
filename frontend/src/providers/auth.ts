import type { AuthProvider } from "@refinedev/core";
import { TOKEN_KEY, USER_KEY } from "./constants";
import api from "@/lib/api";
import type { AxiosError } from "axios";

export const authProvider: AuthProvider = {
  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      try {
        const { data } = await api.post("/user/login", {
          username: username || email,
          password,
        });

        window.localStorage.setItem(TOKEN_KEY, data.authToken);
        window.localStorage.setItem(USER_KEY, data._id);

        return {
          success: true,
          redirectTo: "/",
        };
      } catch (error) {
        const axiosError = error as AxiosError;
        return {
          success: false,
          error: {
            name: "LoginError",
            message:
              axiosError.response?.data?.message ||
              "Invalid username or password",
          },
        };
      }
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userId = localStorage.getItem(USER_KEY);
    if (token) {
      try {
        const { data } = await api.get(`user/${userId}`);

        return {
          id: data._id,
          name: data.name,
          avatar: "https://i.pravatar.cc/300",
        };
      } catch (error) {
        const axiosError = error as AxiosError;
        return {
          success: false,
          error: {
            name: "UserGetError",
            message:
              axiosError.response?.data?.message ||
              "Invalid token or user not found",
          },
        };
      }
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
