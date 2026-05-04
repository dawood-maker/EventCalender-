import React from "react";
import { TYPE_COLORS } from "./constants";
import InfoRow from "./InfoRow";
import AttendeeItem from "./AttendeeItem";

function EventModal({ event, onClose, onComplete, onDelete, onEdit }) {
  const typeInfo = TYPE_COLORS[event.eventType] || TYPE_COLORS.event;
  const isPast = new Date(event.startDate || event.date) < new Date();
  const isCompleted = event.status === "completed";
  const isBirthday = event.eventType === "birthday";
  const isText = event.eventType === "text";

  // Format date range
  const startDate = new Date(event.startDate || event.date);
  const endDate = event.endDate ? new Date(event.endDate) : null;
  const isSameDay =
    !endDate || startDate.toDateString() === endDate.toDateString();

  const dateDisplay = isSameDay
    ? startDate.toDateString()
    : `${startDate.toDateString()} → ${endDate.toDateString()}`;

  const daysCount =
    endDate && !isSameDay
      ? Math.round((endDate - startDate) / (1000 * 60 * 60 * 24) + 1)
      : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* ── Header ─────────────────────────────────────── */}
        <div
          className="p-5 border-b flex items-start justify-between gap-3"
          style={{ borderTop: `4px solid ${typeInfo.bg}` }}
        >
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
              <span
                className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                style={{ background: typeInfo.bg }}
              >
                {typeInfo.text}
              </span>
              {isCompleted && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                  Completed
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-0.5">Event Details</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none flex-shrink-0"
          >
            ×
          </button>
        </div>

        {/* ── Body ──────────────────────────────────────── */}
        <div className="p-5 space-y-3">
          {/* Date Range */}
          <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
            <p className="text-xs text-indigo-500 font-medium mb-1">📅 Date</p>
            <p className="text-sm font-semibold text-indigo-800">
              {dateDisplay}
            </p>
            {!isSameDay && (
              <p className="text-xs text-indigo-500 mt-0.5">
                Calculate {daysCount} days per event
              </p>
            )}
          </div>

          <InfoRow icon="" label="Start Time" value={event.time} />
          {event.returnTime && (
            <InfoRow icon="" label="End Time" value={event.returnTime} />
          )}
          <InfoRow icon="" label="Location" value={event.location} />
          {event.description && (
            <InfoRow icon="" label="Description" value={event.description} />
          )}

          {/* ── Birthday Special Info ─────────────────────── */}
          {isBirthday && (
            <div className="bg-pink-50 rounded-xl p-4 border border-pink-200 space-y-2">
              <p className="text-sm font-semibold text-pink-700">
                Birthday Details
              </p>
              {event.birthdayPerson && (
                <InfoRow
                  icon="🎉"
                  label="Jis ka Birthday"
                  value={event.birthdayPerson}
                />
              )}
              {event.birthdayAge && (
                <InfoRow
                  icon="🎈"
                  label="Age"
                  value={`${event.birthdayAge} saal`}
                />
              )}
              {event.birthdayGift && (
                <div>
                  <p className="text-xs text-gray-400 mb-1"> Gift Ideas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {event.birthdayGift.split(", ").map((g, i) => (
                      <span
                        key={i}
                        className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {event.birthdayNote && (
                <InfoRow icon="💬" label="Note" value={event.birthdayNote} />
              )}
            </div>
          )}

          {/* ── Text/Note Special Info ────────────────────── */}
          {isText && event.textNote && (
            <div
              className="rounded-xl p-4 border"
              style={{
                background: (event.textColor || "#10b981") + "15",
                borderColor: event.textColor || "#10b981",
              }}
            >
              <p
                className="text-xs font-semibold mb-1"
                style={{ color: event.textColor || "#10b981" }}
              >
                Note
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {event.textNote}
              </p>
            </div>
          )}

          {/* ── Attendees ─────────────────────────────────── */}
          {event.attendees?.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Attendees ({event.attendees.length})
              </p>
              <div className="space-y-2 max-h-44 overflow-y-auto">
                {event.attendees.map((att) => (
                  <AttendeeItem key={att._id} attendee={att} />
                ))}
              </div>
            </div>
          )}

          {/* ── Action Buttons ────────────────────────────── */}
          <div className="flex flex-wrap gap-2 pt-2">
            {!isCompleted && (
              <button
                onClick={() => onComplete(event._id)}
                className="flex-1 px-4 py-2.5 bg-green-500 text-white rounded-xl text-sm
                  font-semibold hover:bg-green-600 transition"
              >
                Mark Complete
              </button>
            )}
            <button
              onClick={onEdit}
              className="px-4 py-2.5 bg-indigo-100 text-indigo-600 rounded-xl text-sm
                font-semibold hover:bg-indigo-200 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(event._id)}
              className="px-4 py-2.5 bg-red-100 text-red-600 rounded-xl text-sm
                font-semibold hover:bg-red-200 transition"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm
                font-semibold hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>

          {isPast && !isCompleted && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <p className="text-xs text-yellow-700">
                ⚠️ Yeh event past ho gaya hai. Complete mark karo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventModal;
