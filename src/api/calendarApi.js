import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ─── EVENTS ───────────────────────────────────────────────────
export const createEvent = (data) => API.post("/events/create", data);
export const getEvents = () => API.get("/events");
export const getAllEvents = () => API.get("/events/all"); // ← NEW
export const getEventHistory = () => API.get("/events/history");
export const getEventById = (id) => API.get(`/events/${id}`); // ← NEW
export const updateEvent = (id, data) => API.put(`/events/${id}`, data); // ← NEW
export const completeEvent = (id) => API.put(`/events/complete/${id}`);
export const deleteEvent = (id) => API.delete(`/events/${id}`);
export const sendInvites = (id) => API.post(`/events/send-invites/${id}`);
export const updateAttendeeStatus = (eventId, attId, status) =>
  API.put(`/events/attendee/${eventId}/${attId}`, { status });

// ─── AUTH ─────────────────────────────────────────────────────
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
