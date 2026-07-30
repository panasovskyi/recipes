import { store } from "@/store";
import axios from "axios";
import { setCredentials, logout } from "@/store/slices";

export const mainApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

mainApi.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let isRefreshing = false;
let refreshWaiters: Array<{
  resolve: () => void;
  reject: (error: unknown) => void;
}> = [];

mainApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._isRetry) {
      throw error;
    }

    originalRequest._isRetry = true;

    if (isRefreshing) {
      await new Promise<void>((resolve, reject) => {
        refreshWaiters.push({ resolve, reject });
      });
      return mainApi(originalRequest);
    }

    isRefreshing = true;

    try {
      const { data } = await axios.get(
        `${mainApi.defaults.baseURL}/auth/refresh`,
        { withCredentials: true },
      );

      store.dispatch(setCredentials(data));
      refreshWaiters.forEach(({ resolve }) => resolve());
      refreshWaiters = [];

      return mainApi(originalRequest);
    } catch (refreshError) {
      store.dispatch(logout());
      refreshWaiters.forEach(({ reject }) => reject(refreshError));
      refreshWaiters = [];
      throw refreshError;
    } finally {
      isRefreshing = false;
    }
  },
);
