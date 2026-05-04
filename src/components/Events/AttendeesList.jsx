import React from "react";

function AttendeesList({ attendees, onChange, onAdd, onRemove }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-700 text-sm">Attendees</h3>
        <button
          type="button"
          onClick={onAdd}
          className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg
            hover:bg-indigo-200 transition font-medium"
        >
          + Add Person
        </button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {attendees.map((att, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center
              bg-gray-50 p-2 rounded-xl border border-gray-100"
          >
            <input
              type="text"
              placeholder="Name"
              value={att.name}
              onChange={(e) => onChange(i, "name", e.target.value)}
              className="flex-1 p-2 rounded-lg border border-gray-200 outline-none text-sm
                focus:ring-1 focus:ring-purple-300"
            />
            <input
              type="email"
              placeholder="Email"
              value={att.email}
              onChange={(e) => onChange(i, "email", e.target.value)}
              className="flex-1 p-2 rounded-lg border border-gray-200 outline-none text-sm
                focus:ring-1 focus:ring-purple-300"
            />
            {attendees.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="text-red-400 hover:text-red-600 font-bold px-2 py-1 rounded-lg
                  hover:bg-red-50 transition"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-1">
        Invite email will be automatically sent to all attendees.
      </p>
    </div>
  );
}

export default AttendeesList;
