"use client"; // Asegura que este componente se renderice del lado del cliente

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Cambiar a 'next/navigation'
import { getEvents, addAttendee } from "../service/apiService";

interface Event {
  id: number;
  name: string;
  description: string;
}

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter(); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error al obtener los eventos:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    const attendee = {
      name,
      email,
      present: false,
    };
  
    try {
      // Llamada al backend para crear el asistente y obtener el código QR en Base64
      const newAttendee = await addAttendee(selectedEvent, attendee);
  
      // Codificamos los parámetros para evitar errores en la URL
      const encodedName = encodeURIComponent(newAttendee.name);
      const encodedEmail = encodeURIComponent(newAttendee.email);
      const encodedEvent = encodeURIComponent(selectedEvent);
      const encodedQrCode = encodeURIComponent(newAttendee.qr_code); // QR generado en backend
  
      // Redirigimos con los parámetros codificados
      router.push(
        `/ticket?name=${encodedName}&email=${encodedEmail}&event=${encodedEvent}&qr_code=${encodedQrCode}`
      );
    } catch (error) {
      console.error("Error al registrar el asistente:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Regístrate
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
          Asegúrate de asistir a tu evento favorito
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full px-3 py-2 text-black border border-gray-300 rounded-md"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-3 py-2 text-black border border-gray-300 rounded-md"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="event" className="block text-sm font-medium leading-5 text-gray-700">
                Selecciona un Evento
              </label>
              <select
                id="event"
                name="event"
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                required
                className="block w-full px-3 py-2 text-black border border-gray-300 rounded-md"
              >
                <option value="" disabled>-- Selecciona un evento --</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md">
                Guardar Mi Registro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
