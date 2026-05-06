import React, { useEffect, useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import {
  getAllEvents,
  completeEvent,
  deleteEvent,
} from "../../api/calendarApi";
import { useNavigate } from "react-router-dom";

import { TYPE_COLORS } from "./constants";
import ViewTabs from "./ViewTabs";
import CalendarLegend from "./CalendarLegend";
import EventModal from "./EventModal";

export default function CalendarComponent() {
  const [dbEvents, setDbEvents] = useState([]);
  const [fcEvents, setFcEvents] = useState([]);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("dayGridMonth");
  const navigate = useNavigate();

  // ── Fetch all events ────────────────────────────────────────
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllEvents();
      const data = res.data || [];
      setDbEvents(data);

      const formatted = data.map((e) => {
        const col = TYPE_COLORS[e.eventType] || TYPE_COLORS.event;
        const startStr = (e.startDate || e.date)?.split("T")[0];

        let endStr;
        if (e.endDate) {
          const end = new Date(e.endDate);
          end.setDate(end.getDate() + 1);
          endStr = end.toISOString().split("T")[0];
        } else {
          endStr = startStr;
        }

        const displayTitle =
          e.eventType === "birthday"
            ? ` ${e.birthdayPerson || e.title}`
            : e.eventType === "text"
              ? ` ${e.title}`
              : e.title;

        const bgColor = e.textColor || col.bg;
        const borderColor = e.textColor || col.border;

        return {
          id: e._id,
          title: displayTitle,
          start: startStr,
          end: endStr,
          backgroundColor: bgColor,
          borderColor: borderColor,
          textColor: "#fff",
          extendedProps: e,
        };
      });

      setFcEvents(formatted);
    } catch (err) {
      console.error("Calendar fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // ── Har cell mount hone par color lagao ────────────────────
  const dayCellDidMount = useCallback(
    (info) => {
      const dateStr = info.date.toISOString().split("T")[0];

      // Is date par koi event hai?
      const matched = dbEvents.find((e) => {
        const start = (e.startDate || e.date)?.split("T")[0];
        const end = e.endDate?.split("T")[0] || start;
        return dateStr >= start && dateStr <= end;
      });

      if (matched) {
        const color = matched.textColor || "#3b82f6";
        // Poora cell box color ho — halki opacity ke saath
        info.el.style.backgroundColor = color + "40"; 
        info.el.style.borderLeft = `4px solid ${color}`;
      }
    },
    [dbEvents]
  );

  // ── Event handlers ──────────────────────────────────────────
  const handleDateClick = (info) => navigate(`/event?date=${info.dateStr}`);
  const handleEventClick = (info) => setModal(info.event.extendedProps);

  const handleComplete = async (id) => {
    if (!window.confirm("Mark this event complete?")) return;
    try {
      await completeEvent(id);
      await fetchEvents();
      setModal(null);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Want to delete?")) return;
    try {
      await deleteEvent(id);
      await fetchEvents();
      setModal(null);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="p-4">
      {/* View Tabs */}
      <ViewTabs activeView={activeView} onSelect={setActiveView} />

      {/* Legend */}
      <CalendarLegend />

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div
            className="w-10 h-10 border-4 border-indigo-500 border-t-transparent
            rounded-full animate-spin"
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <FullCalendar
            plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
            initialView={activeView}
            key={activeView}
            events={fcEvents}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            dayCellDidMount={dayCellDidMount}
            height="auto"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "",
            }}
            buttonText={{ today: "Today" }}
            dayCellClassNames="cursor-pointer hover:bg-indigo-50 transition"
            eventDisplay="block"
            noEventsContent="No events in this period"
            listDayFormat={{
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            }}
            listDaySideFormat={false}
          />
        </div>
      )}

      {/* Modal */}
      {modal && (
        <EventModal
          event={modal}
          onClose={() => setModal(null)}
          onComplete={handleComplete}
          onDelete={handleDelete}
          onEdit={() => {
            navigate(`/event?edit=${modal._id}`);
            setModal(null);
          }}
        />
      )}
    </div>
  );
}