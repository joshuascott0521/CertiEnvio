import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Email } from "@/types";

interface EmailCardProps {
    message: Email;
    onClick: (id: string) => void;
}

function getStatusBgColor(status: string): string {
    switch (status) {
        case "Notificado":
            return "bg-green-500";
        case "Enviado":
            return "bg-gray-500";
        case "Spam":
            return "bg-red-800";
        case "Rechazado":
            return "bg-red-500";
        case "Sin notificar":
            return "bg-sky-500";
        default:
            return "bg-gray-500";
    }
}

const EmailCard: React.FC<EmailCardProps> = ({ message, onClick }) => {
    const ultimoDetalle = message.Detalles?.[message.Detalles.length - 1];

    return (
        <div
            key={message.Id}
            className="border rounded-xl p-4 flex justify-between items-center gap-4 cursor-pointer hover:bg-gray-50 w-full"
            onClick={() => onClick(message.Id)}
        >
            {/* Columna 1: Icono + Entidad */}
            <div className="flex flex-row w-[280px] overflow-hidden">
                <div className="mr-4 flex items-center">
                    <Mail className="h-10 w-10 text-gray-400" />
                </div>
                <div className="space-y-1 truncate">
                    <div className="truncate">
                        <span className="font-medium">Entidad: </span>
                        {message.NombreEntidad}
                    </div>
                    <div className="truncate">
                        <span className="font-medium">Aplicativo: </span>
                        {message.NombreAplicativo}
                    </div>
                    <div className="truncate">
                        <span className="font-medium">Remitente: </span>
                        <span title={message.Remitente}>{message.Remitente}</span>
                    </div>
                </div>
            </div>

            {/* Columna 2: Destinatario */}
            <div className="flex-1 min-w-[280px] max-w-[400px] space-y-1 overflow-hidden">
                <div className="truncate">
                    <span className="font-medium">Destinatario: </span>
                    {message.NombreTercero}
                </div>
                <div className="truncate">
                    <span className="font-medium">Correo: </span>
                    <span title={message.CorreoDestinatario}>{message.CorreoDestinatario}</span>
                </div>
                <div className="truncate">
                    <span className="font-medium">Asunto: </span>
                    <span title={message.Asunto}>{message.Asunto}</span>
                </div>
            </div>

            {/* Columna 3: Fecha y Estado */}
            <div className="w-[220px] space-y-1 overflow-hidden">
                <div className="truncate">
                    <span className="font-medium">Fecha Último Estado: </span>
                    <span title={ultimoDetalle ? new Date(ultimoDetalle.Fecha).toLocaleString() : "N/A"}>{ultimoDetalle ? new Date(ultimoDetalle.Fecha).toLocaleString() : "N/A"}</span>
                </div>
                <div className="flex items-center">
                    <span className="font-medium mr-2">Estado:</span>
                    <span
                        className={`text-white text-sm px-3 py-0.5 rounded-full ${getStatusBgColor(
                            ultimoDetalle?.Estado || ""
                        )}`}
                    >
                        {ultimoDetalle?.Estado || "Desconocido"}
                    </span>
                </div>
            </div>

            {/* Botón descarga */}
            <div onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" className="text-gray-400 hover:text-gray-600">
                    <Download className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
};

export default EmailCard;
