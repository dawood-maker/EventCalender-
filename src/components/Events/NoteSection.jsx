import React from "react";
import { NOTE_COLORS } from "./constants";

function NoteSection({ textNote, textColor, onChange, onColorChange }) {
  return (
    <div className="bg-green-50 rounded-2xl p-4 border border-green-200 space-y-3">
      <p className="text-sm font-semibold text-green-700"> Note Details</p>

      <textarea
        name="textNote"
        placeholder="Write your note here..."
        value={textNote}
        onChange={onChange}
        className="w-full p-3 rounded-xl border border-green-200 bg-white outline-none
          focus:ring-2 focus:ring-green-400 resize-none text-sm"
        rows={4}
      />

      <div>
        <p className="text-xs text-gray-500 mb-1">Note Color</p>
        <div className="flex gap-2">
          {NOTE_COLORS.map((col) => (
            <button
              key={col}
              type="button"
              onClick={() => onColorChange(col)}
              className={`w-8 h-8 rounded-full border-2 transition
                ${textColor === col ? "border-gray-700 scale-110" : "border-transparent"}`}
              style={{ background: col }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NoteSection;
