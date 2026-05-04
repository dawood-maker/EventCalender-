import React from "react";
import { BIRTHDAY_GIFT_IDEAS } from "./constants";

function BirthdaySection({
  birthdayPerson,
  birthdayAge,
  birthdayNote,
  selectedGifts,
  onChange,
  onToggleGift,
}) {
  return (
    <div className="bg-pink-50 rounded-2xl p-4 border border-pink-200 space-y-4">
      <p className="text-sm font-semibold text-pink-700 flex items-center gap-2">
        Birthday Details
      </p>

      {/* Person name */}
      <input
        type="text"
        name="birthdayPerson"
        placeholder=" Whose birthday is (name) *"
        value={birthdayPerson}
        onChange={onChange}
        className="w-full p-3 rounded-xl border border-pink-200 bg-white outline-none
          focus:ring-2 focus:ring-pink-400 text-sm"
      />

      {/* Age */}
      <input
        type="number"
        name="birthdayAge"
        placeholder="How old are you? (Ahead)"
        value={birthdayAge}
        onChange={onChange}
        min="1"
        max="150"
        className="w-full p-3 rounded-xl border border-pink-200 bg-white outline-none
          focus:ring-2 focus:ring-pink-400 text-sm"
      />

      {/* Gift Ideas */}
      <div>
        <p className="text-xs text-pink-600 font-medium mb-2">
          Gift Ideas (whatever you want to give)
        </p>
        <div className="flex flex-wrap gap-2">
          {BIRTHDAY_GIFT_IDEAS.map((gift) => (
            <button
              key={gift}
              type="button"
              onClick={() => onToggleGift(gift)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition
                ${
                  selectedGifts.includes(gift)
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-pink-300"
                }`}
            >
              {gift}
            </button>
          ))}
        </div>
        {selectedGifts.length > 0 && (
          <p className="text-xs text-pink-500 mt-2">
            Selected: {selectedGifts.join(", ")}
          </p>
        )}
      </div>

      {/* Custom note */}
      <input
        type="text"
        name="birthdayNote"
        placeholder="Any other notes or custom gift ideas..."
        value={birthdayNote}
        onChange={onChange}
        className="w-full p-3 rounded-xl border border-pink-200 bg-white outline-none
          focus:ring-2 focus:ring-pink-400 text-sm"
      />
    </div>
  );
}

export default BirthdaySection;
