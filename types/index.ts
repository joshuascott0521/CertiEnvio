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
  Password: string;
  VerifyPassword: string;
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

export interface EnvioDetalle {
  Item: number;
  Fecha: string; 
  Estado: string;
  Ip: string;
  Observacion: string;
  JsonResponse: string; 
}

export interface EnvioSMSDTO {
  Id: string;
  EntidadId: number;
  NombreEntidad: string;
  CelularEntidad: string;
  EmailEntidad: string;
  AplicativoId: number;
  NombreAplicativo: string;
  TipoEnvioId: number;
  NombreTipoEnvio: string;
  NombreApi: string;
  TerceroId: string;
  NombreTercero: string;
  Destinatario: string;
  Asunto: string;
  Mensaje: string;
  Certificado: number;
  Flash: string;
  SmsUnitTipo: string;
  Precio: number;
  Firma: string;
  Remitente: string;
  Detalles: EnvioDetalle[];
}


export interface Entity {
  Id: number;
  Nombre: string;
  NIT: string;
  AplicativoId?: number;
  Password?: string;
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

export interface Email{
  Id: string,
  EntidadId: number,
  NombreEntidad: string,
  Remitente: string
  TipoEnvioId: number,
  NombreTipoEnvio: string,
  NombreApi: string,
  NombreAplicativo: string,
  TerceroId: string,
  NombreTercero: string,
  CorreoDestinatario: string,
  Asunto: string,
  Cuerpo: string,
  Detalles: EnvioDetalle[];
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
