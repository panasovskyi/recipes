import type { User } from '@/types/auth/User';

export type LoginRequest = {
  login: string;
  password: string;
}

export type LoginResponse = {
  accessToken: string;
  user: User;
};
