import React from "react";
import CalendarComponent from "../components/Calender/CalendarComponent";

function Calender() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 ml-[30px]">
          My Calendar
        </h1>
        <CalendarComponent />
      </div>
    </div>
  );
}

export default Calender;
