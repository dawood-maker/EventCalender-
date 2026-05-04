import React from "react";

function TimePicker({ startTime, endTime, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Start Time *</label>
        <input
          type="time"
          name="time"
          value={startTime}
          onChange={onChange}
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 outline-none
            focus:ring-2 focus:ring-purple-400 text-sm"
        />
      </div>
      <div>
        <label className="text-xs text-gray-500 mb-1 block">
          End Time (optional)
        </label>
        <input
          type="time"
          name="returnTime"
          value={endTime}
          onChange={onChange}
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 outline-none
            focus:ring-2 focus:ring-purple-400 text-sm"
        />
      </div>
    </div>
  );
}

export default TimePicker;
