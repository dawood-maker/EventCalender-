import { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [toast, setToast] = useState(null);

  const addNotification = useCallback((event, userName) => {
    const notif = {
      id: Date.now(),
      title: event.title,
      date: event.startDate || event.date,
      createdBy: userName,
      type: event.eventType || "event",
      color: event.textColor || "#3b82f6",
      createdAt: new Date(),
    };

    setNotifications((prev) => [notif, ...prev].slice(0, 20));

    setToast({
      id: Date.now(),
      title: event.title,
      type: event.eventType || "event",
      color: event.textColor || "#3b82f6",
      userName: userName,
    });

    setTimeout(() => setToast(null), 4000);
  }, []);

  const clearNotifications = () => setNotifications([]);
  const dismissToast = () => setToast(null);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        clearNotifications,
        toast,
        dismissToast,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
