import React from "react";
import { VIEW_TABS } from "./constants";

function ViewTabs({ activeView, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {VIEW_TABS.map((v) => (
        <button
          key={v.key}
          onClick={() => onSelect(v.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${
              activeView === v.key
                ? "bg-indigo-600 text-white shadow"
                : "bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200"
            }`}
        >
          {v.label}
        </button>
      ))}
      <span className="ml-auto text-xs text-gray-400 italic self-center">
        Click on any date – create new event
      </span>
    </div>
  );
}

export default ViewTabs;
