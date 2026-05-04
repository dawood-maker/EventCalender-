import { useState } from "react";
import { useNotifications } from "../../context/NotificationContext";

function timeAgo(date) {
  const diff = Math.floor((new Date() - new Date(date)) / 1000);
  if (diff < 60) return "abhi abhi";
  if (diff < 3600) return `${Math.floor(diff / 60)} min pehle`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ghante pehle`;
  return new Date(date).toLocaleDateString("en-PK");
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const TYPE_CONFIG = {
  birthday: {
    icon: "🎂",
    label: "Birthday",
    bg: "bg-pink-50",
    badge: "bg-pink-50 text-pink-500",
    dot: "text-pink-500",
  },
  text: {
    icon: "📝",
    label: "Note",
    bg: "bg-green-50",
    badge: "bg-green-50 text-green-500",
    dot: "text-green-500",
  },
  note: {
    icon: "📝",
    label: "Note",
    bg: "bg-green-50",
    badge: "bg-green-50 text-green-500",
    dot: "text-green-500",
  },
  event: {
    icon: "📅",
    label: "Event",
    bg: "bg-indigo-50",
    badge: "bg-indigo-50 text-indigo-500",
    dot: "text-indigo-500",
  },
};

export default function NotificationPanel() {
  const { notifications, clearNotifications } = useNotifications();
  const [removingId, setRemovingId] = useState(null);
  const [cleared, setCleared] = useState(false);

  const handleClear = () => {
    setCleared(true);
    setTimeout(() => {
      clearNotifications();
      setCleared(false);
    }, 400);
  };

  const handleRemoveSingle = (id) => {
    setRemovingId(id);
  };

  return (
    <div className="w-[300px] bg-[#fafbff] border-l border-indigo-100 min-h-screen flex flex-col sticky top-0 font-sans">
      {/* ── Header ── */}
      <div className="relative overflow-hidden px-[18px] pt-5 pb-4 bg-gradient-to-br from-indigo-500 to-purple-500">
        {/* Background blobs */}
        <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-2 w-20 h-20 rounded-full bg-white/10" />

        {/* Top row */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Bell */}
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
              🔔
            </div>
            <div>
              <p className="text-white font-bold text-[15px] m-0 leading-tight">
                Notifications
              </p>
              <p className="text-white/70 text-[11px] m-0 leading-tight mt-0.5">
                {notifications.length === 0
                  ? "Sab theek hai!"
                  : `${notifications.length} naya event`}
              </p>
            </div>
          </div>

          {/* Count badge */}
          {notifications.length > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-md shadow-red-400/40">
              {notifications.length}
            </span>
          )}
        </div>

        {/* Clear all */}
        {notifications.length > 0 && (
          <button
            onClick={handleClear}
            className="relative mt-3 w-full py-1.5 rounded-xl text-white text-xs font-semibold
              bg-white/15 border border-white/30 backdrop-blur-sm
              hover:bg-white/25 transition-all duration-200 cursor-pointer"
          >
            🗑️ Remove all
          </button>
        )}
      </div>

      {/* ── List ── */}
      <div className="flex-1 overflow-y-auto py-2.5">
        {notifications.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-72 gap-3">
            <div
              className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-indigo-100 to-purple-100
              flex items-center justify-center text-3xl"
            >
              🔕
            </div>
            <p className="text-sm font-semibold text-gray-400 m-0">
              No notification
            </p>
            <p className="text-xs text-gray-300 text-center px-6 m-0">
              Create a new event — will be viewed here!
            </p>
          </div>
        ) : (
          <div
            className="transition-all duration-400"
            style={{
              opacity: cleared ? 0 : 1,
              transform: cleared ? "translateY(-10px)" : "translateY(0)",
            }}
          >
            <style>{`
              @keyframes fadeSlideIn {
                from { opacity: 0; transform: translateY(12px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {notifications.map((notif, index) => {
              const config = TYPE_CONFIG[notif.type] || TYPE_CONFIG.event;
              const isRemoving = removingId === notif.id;

              return (
                <div
                  key={notif.id}
                  className="mx-2.5 my-1.5 rounded-2xl bg-white shadow-sm border border-indigo-50 overflow-hidden"
                  style={{
                    opacity: isRemoving ? 0 : 1,
                    transform: isRemoving
                      ? "translateX(60px)"
                      : "translateX(0)",
                    transition: "all 0.35s ease",
                    animation: `fadeSlideIn 0.4s ease ${index * 0.05}s both`,
                  }}
                >
                  {/* Color top bar */}
                  <div
                    className="h-1 w-full"
                    style={{
                      background: `linear-gradient(90deg, ${notif.color}, ${notif.color}99)`,
                    }}
                  />

                  <div className="p-3">
                    <div className="flex items-start gap-2.5">
                      {/* Icon box */}
                      <div
                        className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center text-xl flex-shrink-0`}
                      >
                        {config.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Badge + X button */}
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${config.badge}`}
                          >
                            {config.icon} {config.label}
                          </span>
                          <button
                            onClick={() => handleRemoveSingle(notif.id)}
                            className="text-gray-300 hover:text-red-400 transition-colors text-base leading-none pl-1 bg-transparent border-none cursor-pointer"
                          >
                            ×
                          </button>
                        </div>

                        {/* Title */}
                        <p className="text-[13px] font-bold text-indigo-950 truncate m-0 mb-1">
                          {notif.title}
                        </p>

                        {/* Date */}
                        <p className="text-[11px] text-gray-500 m-0 mb-0.5">
                          📅 {formatDate(notif.date)}
                        </p>

                        {/* Creator */}
                        <p className="text-[11px] text-gray-400 m-0 mb-1">
                          👤{" "}
                          <strong className="text-indigo-500">
                            {notif.createdBy}
                          </strong>{" "}
                          did the number
                        </p>

                        {/* Time ago */}
                        <p className="text-[10px] text-violet-300 font-medium m-0">
                          🕐 {timeAgo(notif.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="px-4 py-3 border-t border-indigo-100 bg-white">
        <p className="text-[11px] text-violet-300 text-center m-0">
          ✨ Notifications will remain on the tab until cleared
        </p>
      </div>
    </div>
  );
}
