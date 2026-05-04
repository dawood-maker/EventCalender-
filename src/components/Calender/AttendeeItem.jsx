import React from "react";
import { STATUS_BADGE, STATUS_LABEL } from "./constants";

function AttendeeItem({ attendee }) {
  return (
    <div
      className="flex items-center justify-between bg-gray-50
        rounded-xl px-3 py-2"
    >
      <div className="flex items-center gap-2 min-w-0">
        <div
          className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400
          to-purple-500 flex items-center justify-center text-white text-xs
          font-bold flex-shrink-0"
        >
          {attendee.name?.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">
            {attendee.name}
          </p>
          <p className="text-xs text-gray-400 truncate">{attendee.email}</p>
        </div>
      </div>
      <span
        className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium
          ${STATUS_BADGE[attendee.status] || "bg-gray-100 text-gray-600"}`}
      >
        {STATUS_LABEL[attendee.status] || " Pending"}
      </span>
    </div>
  );
}

export default AttendeeItem;
