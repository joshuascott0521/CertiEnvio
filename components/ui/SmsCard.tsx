import { Download } from "lucide-react";
import { Button } from "@/components/ui/button"; // asegúrate de que esté separado si es necesario
import type { EnvioSMSDTO } from "@/types";

interface SmsCardProps {
    message: EnvioSMSDTO;
    onClick: (id: number) => void;
}

function getStatusBgColor(status: string): string {
    switch (status) {
        case "Notificado":
            return "bg-green-500"
        case "Enviado":
            return "bg-gray-500"
        case "Spam":
            return "bg-red-800"
        case "Rechazado":
            return "bg-red-500"
        case "Sin notificar":
            return "bg-sky-500"
        default:
            return "bg-gray-500"
    }
}

const SmsCard: React.FC<SmsCardProps> = ({ message, onClick }) => {
    const ultimoDetalle = message.Detalles?.[message.Detalles.length - 1];
    return (
        <div
            key={message.Id}
            className="border rounded-lg p-4 flex justify-row gap-2 items-center cursor-pointer hover:bg-gray-50"
            onClick={() => onClick(message.Id)}
        >
            <div className="flex">
                <div className="mr-4">
                    <img src="/3.svg" alt="Logo-sms" className="w-10 h-10" />
                </div>
                <div>
                    <p className="mb-1 text-gray-900 text-xs font-normal w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className="font-semibold text-base">Entidad: </span>
                        <span
                            className="font-normal text-base "
                            title={message.NombreEntidad}
                        >
                            {message.NombreEntidad}
                        </span>
                    </p>
                    <p className="mb-1 text-gray-900 text-xs font-normal w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className="font-semibold text-base">Aplicativo: </span>
                        <span
                            className="font-normal text-base "
                            title={message.NombreAplicativo}
                        >
                            {message.NombreAplicativo}
                        </span>
                    </p>
                    <p className="mb-1 text-gray-900 text-xs font-normal w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className="font-semibold text-base">Remitente: </span>
                        <span
                            className="font-normal text-base "
                            title={message.Remitente}
                        >
                            {message.Remitente}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex-1 mx-8 min-w-0">
                <p className="mb-1 text-gray-900 text-xs font-normal w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="font-semibold text-base">Destinatario: </span>
                    <span
                        className="font-normal text-base "
                        title={message.Destinatario}
                    >
                        {message.Destinatario}
                    </span>
                </p>
                <p className="mb-1 text-gray-900 text-xs font-normal w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="font-semibold text-base">Correo: </span>
                    <span
                        className="font-normal text-base "
                        title={message.EmailEntidad}
                    >
                        {message.EmailEntidad}
                    </span>
                </p>
                <p className="mb-1 text-gray-900 text-xs font-normal w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="font-semibold text-base">Asunto: </span>
                    <span
                        className="font-normal text-base "
                        title={message.Asunto}
                    >
                        {message.Asunto}
                    </span>
                </p>
            </div>

            <div className="mr-4">
                <div>
                    <span className="font-medium">Fecha Último Estado:</span>{" "}
                    {ultimoDetalle ? new Date(ultimoDetalle.Fecha).toLocaleString() : "N/A"}
                </div>
                <div className="flex items-center">
                    <span className="font-medium mr-2">Estado:</span>
                    <span
                        className={`text-white text-sm px-3 py-0.5 rounded-full ${getStatusBgColor(ultimoDetalle?.Estado || "")
                            }`}
                    >
                        {ultimoDetalle?.Estado || "Desconocido"}
                    </span>
                </div>
            </div>


            <div onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" className="text-gray-400 hover:text-gray-600">
                    <Download className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
};

export default SmsCard;
