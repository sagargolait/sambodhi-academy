import Cookies from "js-cookie";

export const payloadAPI = {
  login: async (data: { email: string; password: string }) => {
    const response = await fetch(`/api/students/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    return response.json();
  },
  register: async (data: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    const response = await fetch(`/api/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  forgotPassword: async (data: { email: string }) => {
    const response = await fetch(`/api/students/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  logout: async () => {
    const response = await fetch("/api/students/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    Cookies.remove("students-token");
    return response.json();
  },
};
