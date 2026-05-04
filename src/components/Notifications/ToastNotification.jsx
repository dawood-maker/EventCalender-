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
      style={{
        position: "fixed",
        bottom: "28px",
        right: "24px",
        zIndex: 9999,
        animation: animateOut
          ? "slideOut 0.4s ease forwards"
          : "slideIn 0.4s ease forwards",
      }}
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
      `}</style>

      <div
        style={{
          width: "320px",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          overflow: "hidden",
          border: "1px solid #f0f0f0",
        }}
      >
        {/* Top color bar */}
        <div
          style={{
            height: "5px",
            background: toast.color,
            borderRadius: "16px 16px 0 0",
          }}
        />

        <div style={{ padding: "14px 16px 14px 16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            {/* Icon circle */}
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: toast.color + "20",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                flexShrink: 0,
              }}
            >
              {icon}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "3px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: toast.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {typeLabel} Bana Gaya!
                </span>

                {/* Close button */}
                <button
                  onClick={handleDismiss}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#aaa",
                    fontSize: "20px",
                    lineHeight: 1,
                    padding: "0 0 0 8px",
                  }}
                >
                  ×
                </button>
              </div>

              {/* Event title */}
              <p
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#1a1a2e",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {toast.title}
              </p>

              {/* User name */}
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                👤 <strong>{toast.userName}</strong> ne add kiya
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div
            style={{
              marginTop: "12px",
              height: "3px",
              background: "#f0f0f0",
              borderRadius: "99px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: toast.color,
                borderRadius: "99px",
                animation: "progress 4s linear forwards",
              }}
            />
          </div>
          <style>{`
            @keyframes progress {
              from { width: 100%; }
              to   { width: 0%; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
