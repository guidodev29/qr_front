// services/attendeesService.js

const API_URL = "http://127.0.0.1:8000"; 

export const addAttendee = async (eventId, attendee) => {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}/attendees/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendee),
    });

    if (!response.ok) {
      throw new Error("Error al agregar el asistente");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/events/`);
    if (!response.ok) {
      throw new Error("Error al obtener los eventos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};
