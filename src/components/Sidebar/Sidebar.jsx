import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ isOpen, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/", icon: "📅", label: "Calendar" },
    { path: "/event", icon: "➕", label: "New Event" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm("Want to log in?")) {
      logout();
      navigate("/login");
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 bg-gradient-to-b from-indigo-900 via-indigo-800 to-purple-900
          flex flex-col shadow-2xl transition-all duration-300
          ${isOpen ? "w-64" : "w-0 lg:w-16"} overflow-hidden`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-indigo-700/50 min-w-[64px]">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
            📆
          </div>
          {isOpen && (
            <span className="text-white font-bold text-lg whitespace-nowrap">
              CalendarApp
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left
                ${
                  isActive(item.path)
                    ? "bg-white/20 text-white font-semibold shadow"
                    : "text-indigo-200 hover:bg-white/10 hover:text-white"
                }`}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {isOpen && (
                <span className="text-sm whitespace-nowrap">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User Info + Logout */}
        <div className="border-t border-indigo-700/50 p-3">
          {isOpen && user && (
            <div className="flex items-center gap-3 mb-3 px-2">
              <div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500
                flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              >
                {(user.name || user.email || "U").charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs font-semibold truncate">
                  {user.name || "User"}
                </p>
                <p className="text-indigo-300 text-xs truncate">{user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
              text-red-300 hover:bg-red-500/20 hover:text-red-200 transition text-left"
          >
            {isOpen && (
              <span className=" whitespace-nowrap text-xl flex-shrink-0 ml-[50px]">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
