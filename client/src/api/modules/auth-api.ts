import { mainApi } from "@/api/instances";
import type {
  LoginRequest,
  LoginResponse,
  RegisterFormValues,
  RegisterResponse,
} from "@/types/auth";

export const authApi = {
  async register(data: RegisterFormValues): Promise<RegisterResponse> {
    const res = await mainApi.post<RegisterResponse>("/auth/register", data);

    return res.data;
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    const res = await mainApi.post<LoginResponse>("/auth/login", data);

    return res.data;
  },

  async logout() {
    const res = await mainApi.post("/auth/logout");

    return res.data;
  },

  async refresh(): Promise<LoginResponse> {
    const res = await mainApi.get<LoginResponse>("/auth/refresh");

    return res.data;
  },
};
