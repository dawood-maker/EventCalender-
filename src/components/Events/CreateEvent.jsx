import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  createEvent,
  sendInvites,
  getEventById,
  updateEvent,
} from "../../api/calendarApi";

import EventTypeSelector from "./EventTypeSelector";
import DateRangePicker from "./DateRangePicker";
import TimePicker from "./TimePicker";
import BirthdaySection from "./BirthdaySection";
import NoteSection from "./NoteSection";
import AttendeesList from "./AttendeesList";
import { useNotifications } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";

const EVENT_COLORS = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#f97316",
  "#14b8a6",
  "#6366f1",
];

function CreateEvent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  const prefillDate = searchParams.get("date") || "";
  const editId = searchParams.get("edit") || null;

  const [form, setForm] = useState({
    title: "",
    location: "",
    startDate: prefillDate,
    endDate: prefillDate,
    time: "",
    returnTime: "",
    description: "",
    eventType: "event",
    birthdayPerson: "",
    birthdayAge: "",
    birthdayGift: "",
    birthdayNote: "",
    textNote: "",
    textColor: "#3b82f6",
  });

  const [attendees, setAttendees] = useState([{ name: "", email: "" }]);
  const [selectedGifts, setSelectedGifts] = useState([]);

  useEffect(() => {
    if (!editId) return;
    getEventById(editId)
      .then(({ data: e }) => {
        setForm({
          title: e.title,
          location: e.location,
          startDate: e.startDate?.split("T")[0] || e.date?.split("T")[0] || "",
          endDate: e.endDate?.split("T")[0] || e.date?.split("T")[0] || "",
          time: e.time,
          returnTime: e.returnTime || "",
          description: e.description || "",
          eventType: e.eventType || "event",
          birthdayPerson: e.birthdayPerson || "",
          birthdayAge: e.birthdayAge || "",
          birthdayGift: e.birthdayGift || "",
          birthdayNote: e.birthdayNote || "",
          textNote: e.textNote || "",
          textColor: e.textColor || "#3b82f6",
        });
        setAttendees(
          e.attendees?.length ? e.attendees : [{ name: "", email: "" }],
        );
        if (e.birthdayGift) setSelectedGifts(e.birthdayGift.split(", "));
      })
      .catch(console.error);
  }, [editId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleStartDate = (e) => {
    const val = e.target.value;
    setForm((prev) => ({
      ...prev,
      startDate: val,
      endDate: prev.endDate < val ? val : prev.endDate,
    }));
  };

  const toggleGift = (gift) => {
    const updated = selectedGifts.includes(gift)
      ? selectedGifts.filter((g) => g !== gift)
      : [...selectedGifts, gift];
    setSelectedGifts(updated);
    setForm((prev) => ({ ...prev, birthdayGift: updated.join(", ") }));
  };

  const handleAttendeeChange = (index, field, value) => {
    const updated = [...attendees];
    updated[index][field] = value;
    setAttendees(updated);
  };

  const addAttendee = () =>
    setAttendees([...attendees, { name: "", email: "" }]);

  const removeAttendee = (i) =>
    setAttendees(attendees.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.location || !form.startDate || !form.time) {
      alert(" Title, Location, Date aur Time zaroori hain!");
      return;
    }
    if (form.startDate > form.endDate) {
      alert(" End date, start date se pehle nahi ho sakti!");
      return;
    }
    setLoading(true);
    try {
      const validAttendees = attendees.filter((a) => a.name && a.email);
      const payload = { ...form, attendees: validAttendees };

      let eventId;
      if (editId) {
        const res = await updateEvent(editId, payload);
        eventId = res.data.event._id;
        alert(" Event update ho gaya!");
      } else {
        const res = await createEvent(payload);
        eventId = res.data.event._id;
        if (validAttendees.length > 0) {
          await sendInvites(eventId);
          alert("Event create hua & invites bhej diye!");
        } else {
          alert(" Event create ho gaya!");
        }
      }

      //  Toast notification trigger karo
      addNotification(form, user?.name || user?.email || "User");

      navigate("/");
    } catch (err) {
      alert(
        "❌ Error: " + (err.response?.data?.message || "Kuch gadbad ho gayi"),
      );
    } finally {
      setLoading(false);
    }
  };

  const isBirthday = form.eventType === "birthday";
  const isText = form.eventType === "text";

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 lg:px-16 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {editId ? "✏️ Edit Event" : "Create New Event"}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Fill in the details of your event.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
        <input
          type="text"
          name="title"
          placeholder="Event Title *"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 outline-none
            focus:ring-2 focus:ring-purple-400 text-sm"
        />

        <EventTypeSelector value={form.eventType} onChange={handleChange} />

        <input
          type="text"
          name="location"
          placeholder={isBirthday ? "Venue / Ghar ka Address *" : "Location *"}
          value={form.location}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 outline-none
            focus:ring-2 focus:ring-purple-400 text-sm"
        />

        <DateRangePicker
          startDate={form.startDate}
          endDate={form.endDate}
          onStartChange={handleStartDate}
          onEndChange={handleChange}
        />

        <TimePicker
          startTime={form.time}
          endTime={form.returnTime}
          onChange={handleChange}
        />

        {/* Color Picker */}
        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            🎨 Event Color — Calendar mein is color ka box dikhega
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            {EVENT_COLORS.map((col) => (
              <button
                key={col}
                type="button"
                onClick={() => setForm((p) => ({ ...p, textColor: col }))}
                style={{ backgroundColor: col }}
                className={`w-8 h-8 rounded-full transition-transform hover:scale-110
                  ${
                    form.textColor === col
                      ? "ring-4 ring-offset-2 ring-gray-400 scale-110"
                      : ""
                  }`}
              />
            ))}
            <div className="flex items-center gap-2 ml-1">
              <input
                type="color"
                value={form.textColor}
                onChange={(e) =>
                  setForm((p) => ({ ...p, textColor: e.target.value }))
                }
                className="w-8 h-8 rounded-full cursor-pointer border-0 p-0"
                title="Custom color chunein"
              />
              <span className="text-xs text-gray-400">Custom</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div
              style={{ backgroundColor: form.textColor }}
              className="px-4 py-1 rounded text-white text-xs font-semibold"
            >
              {form.title || "Event Preview"}
            </div>
            <span className="text-xs text-gray-400">
              Calendar mein aisa dikhega
            </span>
          </div>
        </div>

        {isBirthday && (
          <BirthdaySection
            birthdayPerson={form.birthdayPerson}
            birthdayAge={form.birthdayAge}
            birthdayNote={form.birthdayNote}
            selectedGifts={selectedGifts}
            onChange={handleChange}
            onToggleGift={toggleGift}
          />
        )}

        {isText && (
          <NoteSection
            textNote={form.textNote}
            textColor={form.textColor}
            onChange={handleChange}
            onColorChange={(col) => setForm((p) => ({ ...p, textColor: col }))}
          />
        )}

        {!isText && (
          <textarea
            name="description"
            placeholder="Event Description (optional)"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 outline-none
              focus:ring-2 focus:ring-purple-400 resize-none text-sm"
            rows={3}
          />
        )}

        <AttendeesList
          attendees={attendees}
          onChange={handleAttendeeChange}
          onAdd={addAttendee}
          onRemove={removeAttendee}
        />

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3
              rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 text-sm sm:text-base"
          >
            {loading
              ? "⏳ Saving..."
              : editId
                ? "Update Event"
                : "Create Event"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500
              hover:bg-gray-50 text-sm transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
