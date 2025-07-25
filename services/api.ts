import axios from "axios";
import type { ApiResponse, User, Entity, Aplication, Departamento, Municipio, UserType, EnvioSMSDTO, Email } from "@/types";
import Cookies from "js-cookie";

const API_URL = "https://apienviaplusdev.creapptech.com";

// Configuración de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface PaginacionParams {
  page: number;
  size: number;
}

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use((config) => {
  const token = Cookies.get("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si recibimos un error 401 (No autorizado), eliminamos el token y redirigimos al login
    if (error.response && error.response.status === 401) {
      Cookies.remove("authToken");
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);
// Servicios de autenticación
export const authService = {
  login: async (
    email: string,
    password: string
  ): Promise<ApiResponse<{ Token: string; Id: string; Nombre: string; TipoUsuId: string }>> => {
    try {
      const response = await api.post("/Usuario/Login", {
        Email: email,
        Password: password,
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: { Token: "", Id: "", Nombre: "", TipoUsuId: "" },
        error: error.response?.data?.message || "Error al iniciar sesión",
      };
    }
  },

  forgotPassword: async (email: string): Promise<ApiResponse<null>> => {
    try {
      await api.post("/Usuario/ForgotPassword", { Email: email });
      return { success: true, data: null };
    } catch (error: any) {
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
    try {
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

  getById: async (id: string): Promise<ApiResponse<User>> => {
    try {
      const response = await api.get(`/Usuario/Get/${id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as User,
        error:
          error.response?.data?.message || "Error al obtener usuario por ID",
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

  createProfile: async (
    userData: Partial<User>
  ): Promise<ApiResponse<User>> => {
    try {
      const response = await api.post("/Usuario/Create", userData);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as User,
        error: error.response?.data?.message || "Error al crear usuario",
      };
    }
  },

  changePassword: async (payload: {
    Id: string;
    PasswordAntigua: string;
    PasswordNueva: string;
    PasswordConfirmacion: string;
  }): Promise<ApiResponse<null>> => {
    try {
      const response = await api.put("/Usuario/UpdatePassword", payload);
      return { success: true, data: response.data };
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

export const userTypeService = {
  getAll: async (): Promise<ApiResponse<UserType[]>> => {
    try {
      const response = await api.get("/tipousuario/ObtenerAllTipoUsuario");
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error("Error al traer tipos de usuarios", error.response)
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al obtener tipos de usuarios",
      }
    }
  }
};

export const aplicationService = {
  getAll: async (): Promise<ApiResponse<Aplication[]>> => {
    try {
      const response = await api.get("/Aplicativo/Get");
      return { success: true, data: response.data }
    } catch (error: any) {
      console.error("Respuesta del error en getAll Aplicativos:", error.response);
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al obtener Aplicativos",
      };
    }
  }
};


export const regionService = {
  getDepartamento: async () => {
    try {
      const response = await api.get("/Departamento/Get");
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error en getDepartamento:", error.response?.data || error.message);
      return { success: false, error: "Error al obtener los departamentos" };
    }
  },

  getMunicipio: async (id: number): Promise<ApiResponse<Municipio[]>> => {
    try {
      const response = await api.get(`/Municipio/Get/${id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al obtener los municipios"
      }
    }
  }
};

// Servicios de entidades
export const entityService = {
  getAll: async (): Promise<ApiResponse<Entity[]>> => {
    try {
      const response = await api.get("/Entidad/Get");
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

  create: async (entity: Partial<Entity>, logoFile?: File, escudoFile?: File): Promise<ApiResponse<Entity>> => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(entity)) {
        if (value !== undefined && value !== null) {
          formData.append(`Entidad.${key}`, value.toString());
        }
      }

      if (logoFile) {
        formData.append("Logo", logoFile);
      }

      if (escudoFile) {
        formData.append("Escudo", escudoFile);
      }

      const response = await api.post(`Entidad/Create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      return {
        success: true,
        data: response.data
      }
    } catch (error: any) {
      return {
        success: false,
        data: {} as Entity,
        error: error.response?.data?.message || "Error al crear la entidad",
      };
    }
  },

  update: async (id: number, entity: Partial<Entity>, logoFile?: File, escudoFile?: File): Promise<ApiResponse<Entity>> => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(entity)) {
        if (value !== undefined && value !== null) {
          formData.append(`Entidad.${key}`, value.toString());
        }
      }

      if (logoFile) {
        formData.append("Logo", logoFile);
      }

      if (escudoFile) {
        formData.append("Escudo", escudoFile);
      }

      const response = await api.put(`/Entidad/Update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      return {
        success: true,
        data: response.data,
      };
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
  getEmailAll: async ({ page, size }: PaginacionParams): Promise<ApiResponse<Email[]>> => {
    try {
      const response = await api.get<Email[]>(`/EnvioEmail/GetAllEnvioEmail/${page}/${size}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al obtener Emails"
      };
    }
  },
  getEmailById: async (id: number): Promise<ApiResponse<Email>> => {
    try {
      // Crear una instancia de axios sin interceptores para esta llamada específica
      const publicApi = axios.create({
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await publicApi.get(`/EnvioEmail/Get/${id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as Email,
        error: error.response?.data?.message || "Error al obtener el mensaje",
      };
    }
  },
  getSmsAll: async ({ page, size }: PaginacionParams): Promise<ApiResponse<EnvioSMSDTO[]>> => {
    try {
      const response = await api.get<EnvioSMSDTO[]>(`/EnvioUnitario/ObtenerAllEnvio/${page}/${size}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error al obtener mensajes"
      };
    }
  },

  getMessageById: async (id: number): Promise<ApiResponse<EnvioSMSDTO>> => {
    try {
      const response = await api.get(`/EnvioUnitario/ObtenerItemEnvio/${id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        data: {} as EnvioSMSDTO,
        error: error.response?.data?.message || "Error al obtener el mensaje",
      };
    }
  },

  downloadCertificade: async (id: string): Promise<ApiResponse<void>> => {
    try {
      const response = await api.get(`/HtmlToPdf/descargar/${id}`,
        {
          responseType: "blob",
        }
      );

      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `Certificado Electronico ${id}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      return { success: true, data: undefined };
    } catch (error: any) {
      return {
        success: false,
        data: undefined,
        error: error.message || "Error al descargar el archivo",
      };
    }
  }
};

export default api;

