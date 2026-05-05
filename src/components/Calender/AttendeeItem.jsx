import React from "react";

const STATUS_BADGE = {
  coming: "bg-green-100 text-green-700",
  not_coming: "bg-red-100 text-red-600",
  late: "bg-yellow-100 text-yellow-700",
  pending: "bg-gray-300 text-gray-500",
};

const STATUS_LABEL = {
  coming: " Coming",
  not_coming: " Not Coming",
  late: " Late",
  pending: " Pending",
};

function AttendeeItem({ attendee }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
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
          ${STATUS_BADGE[attendee.status] || STATUS_BADGE.pending}`}
      >
        {STATUS_LABEL[attendee.status] || "⏳ Pending"}
      </span>
    </div>
  );
}

export default AttendeeItem;
