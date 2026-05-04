import React from "react";

export default function EventList({ events }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Events List</h2>

      <ul className="space-y-2">
        {events.map((event) => (
          <li
            key={event.id}
            className="flex justify-between p-2 border rounded"
          >
            <span>{event.title}</span>

            <span
              className={
                event.status === "done" ? "text-green-600" : "text-blue-500"
              }
            >
              {event.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
