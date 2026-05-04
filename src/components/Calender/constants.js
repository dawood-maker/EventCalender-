export const TYPE_COLORS = {
  event: { bg: "#3b82f6", border: "#2563eb", text: "🔵 Event" },
  text: { bg: "#10b981", border: "#059669", text: "🟢 Note" },
  birthday: { bg: "#ec4899", border: "#db2777", text: "🎂 Birthday" },
  outside: { bg: "#3b82f6", border: "#2563eb", text: "🔵 Event" },
  home: { bg: "#10b981", border: "#059669", text: "🟢 Home" },
};

export const VIEW_TABS = [
  { key: "dayGridMonth", label: " Month" },
  { key: "dayGridWeek", label: " Week" },
  { key: "listMonth", label: " List (Month)" },
  { key: "listWeek", label: " List (Week)" },
];

export const LEGEND_ITEMS = [
  { color: "#3b82f6", label: "Event" },
  { color: "#10b981", label: "Note" },
  { color: "#ec4899", label: "Birthday" },
];

export const STATUS_BADGE = {
  coming: "bg-green-100 text-green-700",
  late: "bg-yellow-100 text-yellow-700",
  not_coming: "bg-red-100 text-red-700",
};

export const STATUS_LABEL = {
  coming: " Coming",
  late: " Late",
  not_coming: " Not Coming",
};
