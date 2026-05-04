import React from "react";
import { LEGEND_ITEMS } from "./constants";

function CalendarLegend() {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {LEGEND_ITEMS.map((l) => (
        <span
          key={l.label}
          className="flex items-center gap-1.5 text-sm text-gray-600"
        >
          <span
            className="w-3 h-3 rounded-full inline-block"
            style={{ background: l.color }}
          />
          {l.label}
        </span>
      ))}
    </div>
  );
}

export default CalendarLegend;
