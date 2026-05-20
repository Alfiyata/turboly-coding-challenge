// import { api } from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  async login(payload: LoginPayload) {
    // REAL API
    // const response = await api.post("/login", payload);
    // return response.data;

    // MOCK LOGIN
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: "TOKEN_LOGIN_SUCCESS",
          user: {
            name: "Alfiyata",
            email: payload.email,
          },
        });
      }, 1000);
    });
  },
};