export interface User {
  Id: string;
  Documento: string;
  Nombre: string;
  TipoUsuId: string;
  TipoUsuarioNombre: string;
  Role: string;
  Email: string;
  Celular: string;
  Estado: string;
}

export interface UserType {
  Id: string;
  Nombre: string;
  Role: string;
  Estado: number;
}

export interface Aplication{
  Id: number;
  Nombre: string;
}

export interface Departamento{
  Cod: number;
  Nombre: string
}

export interface Municipio{
  Cod: number;
  Nombre: string
}

export interface Entity {
  Id: number;
  Nombre: string;
  NIT: string;
  AplicativoId: number;
  NombreAplicativo: string;
  Direccion: string;
  Email: string;
  Celular: string;
  PaginaWeb: string;
  DepartamentoCod: number;
  NombreDepartamento: string;
  MunicipioCod: number;
  NombreMunicipio: string;
  Estado: number;
  Imagenes?: Array<{
    TipoImg: string;
    Nombre: string;
    Extension: string;
    ImagenBase64: string;
  }>;
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
