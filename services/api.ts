import axios from "axios";
import type { ApiResponse, User, Entity, Message } from "@/types";

const API_URL = "https://apienviaplusdev.creapptech.com";

// Configuración de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      console.log("👿👿👿👿", token);
      if (token) {
        console.log("👿👿👿👿");

        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.log("👿👿👿👿");
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {
  login: async (
    email: string,
    password: string
  ): Promise<ApiResponse<{ Token: string }>> => {
    try {
      console.log("👿👿👿👿");
      const response = await api.post("/Usuario/Login", {
        Email: email,
        Password: password,
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.log("👿👿👿👿");
      return {
        success: false,
        data: { Token: "" },
        error: error.response?.data?.message || "Error al iniciar sesión",
      };
    }
  },

  forgotPassword: async (email: string): Promise<ApiResponse<null>> => {
    try {
      console.log("👿👿👿👿");
      await api.post("/Usuario/ForgotPassword", { Email: email });
      return { success: true, data: null };
    } catch (error: any) {
      console.log("👿👿👿👿");
      return {
        success: false,
        data: null,
        error:
          error.response?.data?.message ||
          "Error al solicitar recuperación de contraseña",
      };
    }
  },
};

// Servicios de usuario
export const userService = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    console.log("👿👿👿👿");
    try {
      console.log("👿👿👿👿");
      const response = await api.get("/Usuario/Get");
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as User,
        error:
          error.response?.data?.message || "Error al obtener datos del usuario",
      };
    }
  },

  updateProfile: async (
    userData: Partial<User>
  ): Promise<ApiResponse<User>> => {
    try {
      const response = await api.put("/Usuario/Update", userData);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as User,
        error:
          error.response?.data?.message ||
          "Error al actualizar datos del usuario",
      };
    }
  },

  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<null>> => {
    try {
      await api.post("/Usuario/ChangePassword", {
        CurrentPassword: currentPassword,
        NewPassword: newPassword,
      });
      return { success: true, data: null };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error:
          error.response?.data?.message || "Error al cambiar la contraseña",
      };
    }
  },
};

// Servicios de entidades
export const entityService = {
  getAll: async (): Promise<ApiResponse<Entity[]>> => {
    try {
      const response = await api.get("/Entidad/GetAll");
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al obtener entidades",
      };
    }
  },

  getById: async (id: number): Promise<ApiResponse<Entity>> => {
    try {
      const response = await api.get(`/Entidad/Get/${id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Entity,
        error: error.response?.data?.message || "Error al obtener la entidad",
      };
    }
  },

  create: async (entity: Partial<Entity>): Promise<ApiResponse<Entity>> => {
    try {
      const response = await api.post("/Entidad/Create", entity);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Entity,
        error: error.response?.data?.message || "Error al crear la entidad",
      };
    }
  },

  update: async (
    id: number,
    entity: Partial<Entity>
  ): Promise<ApiResponse<Entity>> => {
    try {
      const response = await api.put(`/Entidad/Update/${id}`, entity);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Entity,
        error:
          error.response?.data?.message || "Error al actualizar la entidad",
      };
    }
  },
};

// Servicios de mensajes
export const messageService = {
  getEmails: async (): Promise<ApiResponse<Message[]>> => {
    try {
      const response = await api.get("/Mensaje/GetEmails");
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al obtener emails",
      };
    }
  },

  getSMS: async (): Promise<ApiResponse<Message[]>> => {
    try {
      console.log("👿👿👿👿");
      const response = await api.get("/Mensaje/GetSMS");
      return { success: true, data: response.data };
    } catch (error: any) {
      console.log("👿👿👿👿");
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al obtener SMS",
      };
    }
  },

  getMessageById: async (id: number): Promise<ApiResponse<Message>> => {
    console.log("👿👿👿👿");
    try {
      console.log("👿👿👿👿");
      const response = await api.get(`/Mensaje/Get/${id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Message,
        error: error.response?.data?.message || "Error al obtener el mensaje",
      };
    }
  },
};

export default api;
