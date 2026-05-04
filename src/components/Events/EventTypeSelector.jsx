import React from "react";
import { TYPE_OPTIONS, COLOR_MAP } from "./constants";

function EventTypeSelector({ value, onChange }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-2">Event Type *</p>
      <div className="grid grid-cols-3 gap-3">
        {TYPE_OPTIONS.map((opt) => {
          const active = value === opt.value;
          const c = COLOR_MAP[opt.color];
          return (
            <label
              key={opt.value}
              className={`p-3 rounded-xl border-2 cursor-pointer text-center transition
                text-sm font-medium flex flex-col items-center gap-1
                ${
                  active
                    ? `${c.border} ${c.bg} ${c.text}`
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
            >
              <input
                type="radio"
                name="eventType"
                value={opt.value}
                checked={active}
                onChange={onChange}
                className="hidden"
              />
              <span className="text-xl">{opt.icon}</span>
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default EventTypeSelector;
