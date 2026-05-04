import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ToastNotification from "../Notifications/ToastNotification";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300
          ${sidebarOpen ? "lg:ml-64" : "lg:ml-16"} ml-0`}
      >
        {/* Top Bar with hamburger */}
        <div className="sticky top-0 z-20 bg-white shadow-sm h-14 flex items-center px-4 gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-indigo-600 transition p-1 rounded-lg hover:bg-indigo-50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="font-bold text-indigo-700 text-lg ml-[20px]">
            CalendarApp
          </span>
        </div>

        {/* Page Content */}
        <main>{children}</main>
      </div>
      <div>
        {/*  Ye bottom-right toast hai — bas yahi add karna tha */}
        <ToastNotification />
      </div>
    </div>
  );
}
