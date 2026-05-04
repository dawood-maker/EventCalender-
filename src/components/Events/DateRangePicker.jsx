import React from "react";

function DateRangePicker({ startDate, endDate, onStartChange, onEndChange }) {
  const dayCount =
    startDate && endDate && startDate !== endDate
      ? Math.round(
          (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1,
        )
      : null;

  return (
    <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
      <p className="text-xs text-indigo-600 font-semibold mb-3">
        Date range – select from start to end
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">
            Start Date *
          </label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={onStartChange}
            className="w-full p-3 rounded-xl border border-gray-200 bg-white outline-none
              focus:ring-2 focus:ring-indigo-400 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">End Date *</label>
          <input
            type="date"
            name="endDate"
            value={endDate}
            min={startDate}
            onChange={onEndChange}
            className="w-full p-3 rounded-xl border border-gray-200 bg-white outline-none
              focus:ring-2 focus:ring-indigo-400 text-sm"
          />
        </div>
      </div>
      {dayCount && (
        <p className="text-xs text-indigo-500 mt-2">
          The event will last for{dayCount} days
        </p>
      )}
    </div>
  );
}

export default DateRangePicker;
