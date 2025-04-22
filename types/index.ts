export interface User {
  id: number;
  nombre: string;
  documento: string;
  celular: string;
  email: string;
  rol: string;
}

export interface Entity {
  id: number;
  name: string;
  nit: string;
  type: string;
  address: string;
  city?: string;
  email: string;
  phone: string;
  website?: string;
}

export interface Message {
  id: number;
  entidad: string;
  aplicativo: string;
  remitente: string;
  destinatario: string;
  correo: string;
  asunto: string;
  fecha: string;
  estado: string;
  celular: string;
  contenido?: string;
  correoDestinatario?: string;
  historial?: Array<{
    estado: string;
    fecha: string;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
export interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export type StatusType = "Notificado" | "Enviado" | "Abierto" | "Rechazado";
