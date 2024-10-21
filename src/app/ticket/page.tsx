"use client";

import { useSearchParams } from "next/navigation";

export default function Ticket() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const event = searchParams.get("event");

  // Decodificar el QR code recibido en Base64 desde la URL
  let qr_code = searchParams.get("qr_code") || "";
  qr_code = decodeURIComponent(qr_code); // Decodificación para caracteres especiales

  console.log("QR Code:", qr_code); // Verificar en consola

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[22rem] transform transition hover:scale-105 duration-300 ease-in-out">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900">
          🎟️ Ticket de Evento
        </h1>

        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-gray-700">
            <span className="text-gray-500">Nombre:</span> {name}
          </p>
          <p className="text-lg font-semibold text-gray-700">
            <span className="text-gray-500">Correo:</span> {email}
          </p>
          <p className="text-lg font-semibold text-gray-700">
            <span className="text-gray-500">Evento:</span> {event}
          </p>
        </div>

        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h2 className="text-lg font-semibold mb-2">QR Code para {name}</h2>
          {qr_code ? (
            <img
              src={`data:image/png;base64,${qr_code}`}
              alt="QR Code"
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          ) : (
            <p className="text-red-500">No se pudo cargar el QR Code.</p>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Presenta este ticket al ingresar.
          </p>
        </div>
      </div>
    </div>
  );
}
