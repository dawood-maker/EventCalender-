import { useEffect, useState } from "react";
import { useNotifications } from "../../context/NotificationContext";

const TYPE_ICONS = {
  event: "📅",
  birthday: "🎂",
  text: "📝",
  note: "📝",
};

export default function ToastNotification() {
  const { toast, dismissToast } = useNotifications();
  const [visible, setVisible] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    if (toast) {
      setAnimateOut(false);
      setVisible(true);
    } else {
      setAnimateOut(true);
      const t = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleDismiss = () => {
    setAnimateOut(true);
    setTimeout(() => {
      dismissToast();
      setVisible(false);
    }, 400);
  };

  if (!visible || !toast) return null;

  const icon = TYPE_ICONS[toast.type] || "📅";
  const typeLabel = toast.type.charAt(0).toUpperCase() + toast.type.slice(1);

  return (
    <div
      className={`fixed bottom-7 right-6 z-[9999] ${
        animateOut ? "animate-slide-out" : "animate-slide-in"
      }`}
    >
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0);    opacity: 1; }
          to   { transform: translateX(120%); opacity: 0; }
        }
        @keyframes progress {
          from { width: 100%; }
          to   { width: 0%; }
        }
        .animate-slide-in { animation: slideIn 0.4s ease forwards; }
        .animate-slide-out { animation: slideOut 0.4s ease forwards; }
        .animate-progress { animation: progress 4s linear forwards; }
      `}</style>

      <div className="w-80 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.18)] overflow-hidden border border-gray-100">
        {/* Top color bar */}
        <div
          className="h-[5px] rounded-t-2xl"
          style={{ background: toast.color }}
        />

        <div className="px-4 py-3.5">
          <div className="flex items-start gap-3">
            {/* Icon circle */}
            <div
              className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-xl shrink-0"
              style={{ backgroundColor: toast.color + "20" }}
            >
              {icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-[3px]">
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.5px]"
                  style={{ color: toast.color }}
                >
                  {typeLabel} was made!
                </span>

                {/* Close button */}
                <button
                  onClick={handleDismiss}
                  className="bg-transparent border-none cursor-pointer text-gray-400 text-xl leading-none pl-2"
                >
                  ×
                </button>
              </div>

              {/* Event title */}
              <p className="m-0 mb-1 text-sm font-bold text-[#1a1a2e] truncate">
                {toast.title}
              </p>

              {/* User name */}
              <p className="m-0 text-xs text-gray-500">
                👤 <strong>{toast.userName}</strong> did the number
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-[3px] bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full animate-progress"
              style={{ background: toast.color }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
